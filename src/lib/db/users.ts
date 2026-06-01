import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { UserRow } from '@/lib/supabase/types';
import type { AuthUser } from '@/types/user';

const TABLE = 'users';

export const toAuthUser = (row: UserRow): AuthUser => ({
  id: row.id,
  email: row.email,
  role: row.role,
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
