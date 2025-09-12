import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./PrivateRoute";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);
  return <> {children} </>;
}