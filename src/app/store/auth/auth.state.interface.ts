import { User } from '../../models/user.interface';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}
