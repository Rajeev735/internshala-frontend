import {
  createContext,
  useContext,
  useState,
} from "react";

export interface User {
  id: string;

  name: string;

  email: string;

  role: "admin" | "sales";
}

interface AuthContextType {
  token: string | null;

  user: User | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TOKEN
  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem("token")
    );

  // USER
  const [user, setUser] =
    useState<User | null>(() => {
      const storedUser =
        localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  // LOGIN
  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);

    setUser(user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be inside AuthProvider"
    );
  }

  return context;
};