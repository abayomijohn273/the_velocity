import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { OtpRow } from '@/lib/supabase/types';
import { hashOtp, otpExpiry } from '@/lib/auth/otp';
import type { OtpPurpose } from '@/types/user';

const TABLE = 'otp_codes';

/** Removes any outstanding codes for a user+purpose before issuing a new one. */
export const replaceOtp = async (
  userId: string,
  purpose: OtpPurpose,
  code: string
): Promise<void> => {
  const supabase = getSupabaseAdmin();
  await supabase.from(TABLE).delete().eq('user_id', userId).eq('purpose', purpose);
  const { error } = await supabase.from(TABLE).insert({
    user_id: userId,
    purpose,
    code_hash: hashOtp(code),
    expires_at: otpExpiry(),
  });
  if (error) throw error;
};

export const findActiveOtp = async (
  userId: string,
  purpose: OtpPurpose
): Promise<OtpRow | null> => {
  const { data } = await getSupabaseAdmin()
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .eq('purpose', purpose)
    .is('consumed_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as OtpRow) ?? null;
};

export const incrementOtpAttempts = async (id: string, attempts: number): Promise<void> => {
  await getSupabaseAdmin()
    .from(TABLE)
    .update({ attempts: attempts + 1 })
    .eq('id', id);
};

export const consumeOtp = async (id: string): Promise<void> => {
  await getSupabaseAdmin()
    .from(TABLE)
    .update({ consumed_at: new Date().toISOString() })
    .eq('id', id);
};
