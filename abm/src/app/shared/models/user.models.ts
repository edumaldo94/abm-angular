export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string; 
  birthDate?: string;
  dni: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
