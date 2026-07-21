export interface Member {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  currentRole: string | null;
  industry: string | null;
  countryOfResidence: string | null;
  linkedinUrl: string | null;
}

export interface PaginatedMembers {
  items: Member[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
