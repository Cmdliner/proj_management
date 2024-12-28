import { createContext, useState, useEffect, useContext, FC } from "react";
import { useNavigate } from "react-router-dom";


interface AuthContextType {
    token: string | null;
    expiry: string | null;
    isAuthenticated: boolean;
    login: (token: string, expiresIn: number) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [expiry, setExpiry] = useState<string | null>(localStorage.getItem('expiryToken'))
    const navigate = useNavigate();

    function login(token: string, expiresIn: number) {
        const expiration = Date.now() + expiresIn * 1000;
        setToken(token);
        setExpiry(expiry);
        localStorage.setItem("authToken", token);
        localStorage.setItem("expiryToken", `${expiration}`);
    }

    function logout() {
        setToken(null);
        setExpiry(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('expiryToken');
        navigate('/login');
    }

    const isAuthenticated = token && parseInt(expiry  || "0") > Date.now()   ? true : false

    useEffect(() => {
        const excludedUrl = "/register"
        if(!token && !location.pathname.includes(excludedUrl)) {
            navigate("/login");
        }
    }, [token, expiry, navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, expiry, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthProvider;