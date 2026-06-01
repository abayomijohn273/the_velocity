import { z } from 'zod';
import { currentRoles } from '@/lib/constants/currentRoles';
import { industries } from '@/lib/constants/industries';

const roleValues = currentRoles.map((option) => option.value);
const industryValues = industries.map((option) => option.value);

export const completeProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  phoneNumber: z.string().trim().min(6, 'Enter a valid phone number'),
  whatsappNumber: z.string().trim().min(6, 'Enter a valid WhatsApp number'),
  linkedinUrl: z
    .string()
    .trim()
    .url('Enter a valid URL')
    .refine((value) => value.includes('linkedin.com'), 'Enter a valid LinkedIn URL'),
  currentRole: z
    .string()
    .min(1, 'Select your current role')
    .refine((value) => roleValues.includes(value), 'Select your current role'),
  countryOfResidence: z.string().trim().min(1, 'Select your country of residence'),
  industry: z
    .string()
    .min(1, 'Select your industry')
    .refine((value) => industryValues.includes(value), 'Select your industry'),
  dob: z.string().min(1, 'Date of birth is required'),
  referredBy: z.string().trim().optional().or(z.literal('')),
});

export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;
