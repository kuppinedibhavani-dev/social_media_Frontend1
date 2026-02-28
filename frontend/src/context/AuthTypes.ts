export interface User {
  id: string;
  name?: string;
  email: string;
  avatar_url?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  updateUser: (user: User) => void; // REQUIRED
}