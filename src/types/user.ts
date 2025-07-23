// Global type definition for User
export type User = {
  id: string;
  email: string;
  inventor?: Inventor;
}

// Inventor data type
export type Inventor = {
  id: string;
  email: string;
  image?: string;
  phone?: string;
  orcid?: string;
  patents_count: number;
  tickets_count: number;
  co_inventors_count: number;
  affiliation: string;
  name_variant: string[];
  preferred_name: string;
}

// Login Credentials type
export type LoginCredentials = {
  email: string;
  password: string;
}