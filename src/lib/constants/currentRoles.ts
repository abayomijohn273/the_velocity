export interface SelectOption {
  label: string;
  value: string;
}

/** Options for the "current role" field on the complete-profile form. */
export const currentRoles: SelectOption[] = [
  { label: 'Founder, CEO or Entrepreneur', value: 'founder_ceo_entrepreneur' },
  { label: 'Intrapreneur - Leading in a company', value: 'intrapreneur' },
  { label: 'Working Professional', value: 'working_professional' },
  { label: 'I run a Non-Profit', value: 'non_profit' },
  { label: 'I am a freelancer', value: 'freelancer' },
  { label: 'Civil Servant', value: 'civil_servant' },
  { label: 'I am a Public Figure', value: 'public_figure' },
  { label: 'Others', value: 'others' },
];
