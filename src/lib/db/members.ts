import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { MEMBERS_PER_PAGE } from '@/lib/constants/pagination';
import type { Member, PaginatedMembers } from '@/types/member';

interface MemberRow {
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  current_role: string | null;
  industry: string | null;
  country_of_residence: string | null;
  linkedin_url: string | null;
}

const toMember = (row: MemberRow): Member => ({
  userId: row.user_id,
  email: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  avatar: row.avatar,
  currentRole: row.current_role,
  industry: row.industry,
  countryOfResidence: row.country_of_residence,
  linkedinUrl: row.linkedin_url,
});

export interface ListMembersParams {
  page: number;
  search?: string;
  currentRole?: string;
  industry?: string;
}

export const listMembers = async ({
  page,
  search = '',
  currentRole = '',
  industry = '',
}: ListMembersParams): Promise<PaginatedMembers> => {
  const from = (page - 1) * MEMBERS_PER_PAGE;
  const to = from + MEMBERS_PER_PAGE - 1;

  let query = getSupabaseAdmin().from('member_directory').select('*', { count: 'exact' });

  // Strip characters that would break PostgREST's `or` filter syntax.
  const term = search.replace(/[,%()]/g, ' ').trim();
  if (term) {
    query = query.or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,email.ilike.%${term}%`);
  }
  if (currentRole) query = query.eq('current_role', currentRole);
  if (industry) query = query.eq('industry', industry);

  const { data, count, error } = await query
    .order('first_name', { ascending: true, nullsFirst: false })
    .range(from, to);

  if (error) throw error;

  const total = count ?? 0;
  return {
    items: (data as MemberRow[] | null)?.map(toMember) ?? [],
    page,
    limit: MEMBERS_PER_PAGE,
    total,
    totalPages: Math.max(1, Math.ceil(total / MEMBERS_PER_PAGE)),
  };
};
