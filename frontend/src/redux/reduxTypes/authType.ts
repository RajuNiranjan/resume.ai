export interface User {
  _id: string;
  username: string;
  email: string;
  profile_pic: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  authError: string | null;
}

export const authInitialState: AuthState = {
  user: null,
  isLoading: false,
  authError: null,
};
