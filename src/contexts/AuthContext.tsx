import { createContext, useContext, useState } from "react";
import { authService } from "@/services";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialToken = authService.getToken() || null;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const login = (token: string) => {
    authService.login(token);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("theme");
  };

  return (
    <AuthContext.Provider
      value={{
        token: initialToken,
        login,
        logout,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
