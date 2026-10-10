export type UserRole = 'user' | 'admin';

export type AccountStatus = 'pending' | 'approved' | 'rejected';

export type OtpPurpose = 'email_verification' | 'member_activation' | 'password_reset';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  accountStatus: AccountStatus;
  isMonetized: boolean;
  isEmailVerified: boolean;
  isRegistrationComplete: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  linkedinUrl: string;
  currentRole: string;
  countryOfResidence: string;
  industry: string;
  dob: string;
  referredBy: string | null;
  avatar: string | null;
}
