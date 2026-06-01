import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { ProfileRow } from '@/lib/supabase/types';
import type { UserProfile } from '@/types/user';

const TABLE = 'profiles';

export const toUserProfile = (row: ProfileRow, email: string): UserProfile => ({
  firstName: row.first_name,
  lastName: row.last_name,
  email,
  phoneNumber: row.phone_number,
  whatsappNumber: row.whatsapp_number,
  linkedinUrl: row.linkedin_url,
  currentRole: row.current_role,
  countryOfResidence: row.country_of_residence,
  industry: row.industry,
  dob: row.dob,
  referredBy: row.referred_by,
  avatar: row.avatar,
});

export const getProfile = async (userId: string): Promise<ProfileRow | null> => {
  const { data } = await getSupabaseAdmin()
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  return (data as ProfileRow) ?? null;
};

export interface UpsertProfileInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  whatsappNumber: string;
  linkedinUrl: string;
  currentRole: string;
  countryOfResidence: string;
  industry: string;
  dob: string;
  referredBy?: string | null;
  avatar?: string | null;
}

export const upsertProfile = async (
  userId: string,
  input: UpsertProfileInput
): Promise<ProfileRow> => {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .upsert({
      user_id: userId,
      first_name: input.firstName,
      last_name: input.lastName,
      phone_number: input.phoneNumber,
      whatsapp_number: input.whatsappNumber,
      linkedin_url: input.linkedinUrl,
      current_role: input.currentRole,
      country_of_residence: input.countryOfResidence,
      industry: input.industry,
      dob: input.dob,
      referred_by: input.referredBy ?? null,
      avatar: input.avatar ?? null,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data as ProfileRow;
};
