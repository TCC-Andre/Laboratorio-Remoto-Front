import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getUserLocalStorage,
  LoginRequest,
  setUserLocalStorage,
} from "../services/utils";

interface Props {
  children?: ReactNode;
}

interface IUser {
  matricula?: string;
  token?: string;
}

interface IAuthContext extends IUser {
  user: IUser;
  authenticate: (matricula: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userLocalStorage = getUserLocalStorage();

    console.log(isAuthenticated);

    if (userLocalStorage) {
      const payload = {
        token: userLocalStorage?.token,
        matricula: userLocalStorage?.matricula,
      };

      setUser(payload);
    }
  }, []);

  async function authenticate(matricula: string, senha: string) {
    const response = await LoginRequest(matricula, senha);

    const payload = { token: response?.token, matricula: response?.matricula };

    setUser(payload);
    setUserLocalStorage(payload);
    setIsAuthenticated(true);
  }

  function logout() {
    setUser({});
    setUserLocalStorage(null);
    setIsAuthenticated(false);
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider
      value={{ user, isAuthenticated, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
