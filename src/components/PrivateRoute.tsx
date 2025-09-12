import { createContext, PropsWithChildren, useContext, useState } from "react";
interface User {
  id: number;
}

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn: boolean;
};



export default function PrivateRoute(
  {
    children,
    isSignedIn,
  }: AuthProviderProps) {
    const [user] = useState<User | null>(isSignedIn ? {id:1} : null);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
  }

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}