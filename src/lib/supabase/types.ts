import type { OtpPurpose, UserRole } from '@/types/user';

export interface UserRow {
  id: string;
  email: string;
  password_hash: string | null;
  role: UserRole;
  is_email_verified: boolean;
  is_registration_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  whatsapp_number: string;
  linkedin_url: string;
  current_role: string;
  country_of_residence: string;
  industry: string;
  dob: string;
  referred_by: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface OtpRow {
  id: string;
  user_id: string;
  code_hash: string;
  purpose: OtpPurpose;
  expires_at: string;
  consumed_at: string | null;
  attempts: number;
  created_at: string;
}
