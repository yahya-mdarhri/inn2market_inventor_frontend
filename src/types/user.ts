// Global type definition for User
export type User = {
  id: string;
  email: string;
  inverntor?: Inventor;
}

// Inventor data type
export type Inventor = {
  id: string;
  email: string;
  image?: string;
  phone?: string;
  orcid?: string;
  affiliation: string;
  name_variant: string[];
  preferred_name: string;
}

// Login Credentials type
export type LoginCredentials = {
  email: string;
  password: string;
}