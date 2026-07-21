import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { UserRow } from '@/lib/supabase/types';
import { ADMIN_USERS_PER_PAGE } from '@/lib/constants/pagination';
import type { AccountStatus, AuthUser } from '@/types/user';

const TABLE = 'users';

export const toAuthUser = (row: UserRow): AuthUser => ({
  id: row.id,
  email: row.email,
  role: row.role,
  accountStatus: row.account_status,
  isMonetized: row.is_monetized,
  isEmailVerified: row.is_email_verified,
  isRegistrationComplete: row.is_registration_complete,
});

export const findUserByEmail = async (email: string): Promise<UserRow | null> => {
  const { data } = await getSupabaseAdmin()
    .from(TABLE)
    .select('*')
    .ilike('email', email)
    .maybeSingle();
  return (data as UserRow) ?? null;
};

export const findUserById = async (id: string): Promise<UserRow | null> => {
  const { data } = await getSupabaseAdmin().from(TABLE).select('*').eq('id', id).maybeSingle();
  return (data as UserRow) ?? null;
};

export const createUser = async (input: {
  email: string;
  passwordHash?: string | null;
  isEmailVerified?: boolean;
}): Promise<UserRow> => {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .insert({
      email: input.email.toLowerCase(),
      password_hash: input.passwordHash ?? null,
      is_email_verified: input.isEmailVerified ?? false,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data as UserRow;
};

export const updateUser = async (
  id: string,
  patch: Partial<Pick<UserRow, 'password_hash' | 'is_email_verified' | 'is_registration_complete'>>
): Promise<UserRow> => {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as UserRow;
};

export const updateUserStatus = async (id: string, status: AccountStatus): Promise<UserRow> => {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update({ account_status: status })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as UserRow;
};

export const updateUserMonetized = async (id: string, isMonetized: boolean): Promise<UserRow> => {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update({ is_monetized: isMonetized })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as UserRow;
};

interface AdminUserRow {
  id: string;
  email: string;
  role: UserRow['role'];
  account_status: AccountStatus;
  is_monetized: boolean;
  is_email_verified: boolean;
  is_registration_complete: boolean;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
}

export interface AdminUser {
  id: string;
  email: string;
  role: UserRow['role'];
  accountStatus: AccountStatus;
  isMonetized: boolean;
  isEmailVerified: boolean;
  isRegistrationComplete: boolean;
  createdAt: string;
  firstName: string | null;
  lastName: string | null;
}

export interface PaginatedAdminUsers {
  items: AdminUser[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const toAdminUser = (row: AdminUserRow): AdminUser => ({
  id: row.id,
  email: row.email,
  role: row.role,
  accountStatus: row.account_status,
  isMonetized: row.is_monetized,
  isEmailVerified: row.is_email_verified,
  isRegistrationComplete: row.is_registration_complete,
  createdAt: row.created_at,
  firstName: row.first_name,
  lastName: row.last_name,
});

export interface ListUsersForAdminParams {
  page: number;
  search?: string;
  status?: AccountStatus | '';
}

export const listUsersForAdmin = async ({
  page,
  search = '',
  status = '',
}: ListUsersForAdminParams): Promise<PaginatedAdminUsers> => {
  const from = (page - 1) * ADMIN_USERS_PER_PAGE;
  const to = from + ADMIN_USERS_PER_PAGE - 1;

  let query = getSupabaseAdmin().from('admin_user_directory').select('*', { count: 'exact' });

  const term = search.replace(/[,%()]/g, ' ').trim();
  if (term) {
    query = query.or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,email.ilike.%${term}%`);
  }
  if (status) query = query.eq('account_status', status);

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const total = count ?? 0;
  return {
    items: (data as AdminUserRow[] | null)?.map(toAdminUser) ?? [],
    page,
    limit: ADMIN_USERS_PER_PAGE,
    total,
    totalPages: Math.max(1, Math.ceil(total / ADMIN_USERS_PER_PAGE)),
  };
};
