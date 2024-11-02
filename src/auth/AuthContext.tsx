import { createContext, useState, useEffect, useContext, FC } from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, expiresIn: number) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => { }
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        const expiration = localStorage.getItem("tokenExpiration")

        if (token && expiration && Date.now() < parseInt(expiration)) setIsAuthenticated(true);
        else {
            logout();
            window.location.href = "/login";
        }

    }, []);

    function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiration');
        setIsAuthenticated(false);
    }

    function login(token: string, expiresIn: number) {
        const expiration = Date.now() + expiresIn * 1000;
        localStorage.setItem("Authorization", token);
        localStorage.setItem("tokenExpiration", `${expiration}`);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;