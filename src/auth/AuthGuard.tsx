import { FC, ReactNode } from "react";
import { useAuth } from "./AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) <Navigate to="/login" />
    return <>{children}</>
}

export default ProtectedRoute;