import z from "zod";

export const signUpSchema = z.object({
  email: z.email("Enter a valid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpForm = z.infer<typeof signUpSchema>;

export type SignInForm = z.infer<typeof signInSchema>;

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface AuthContextType {
  loading: boolean;
  user: User | null;
  isLoggedIn: boolean;
  signOut: () => void;
  accessToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}
