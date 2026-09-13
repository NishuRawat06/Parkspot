export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
  roleId: number | null;
  permissions: string[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (...roles: string[]) => boolean;
}
