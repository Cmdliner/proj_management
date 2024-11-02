import { useAuth } from "./AuthContext"

const Protected = () => {
    const { isAuthenticated } = useAuth();
}