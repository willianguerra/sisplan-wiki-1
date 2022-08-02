import { createContext, useState } from "react";
import { UserProps } from "../@types/UserProps";
import { setCookie, destroyCookie } from "nookies";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ usuario, senha }: UserProps) => Promise<Boolean>;
  logOut: () => Promise<any>;
  user: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<string | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ usuario, senha }: UserProps) {
    try {
      const senhaEncrypt = btoa(`sISPKJSDLK${senha}@klSIp1q34534sS`);
      const response = await axios.get(
        `/api/Login?EMAIL=${usuario.toUpperCase()}&SENHA=${senhaEncrypt}`
      );

      if (!response || response.status != 200) {
        return false;
      }

      const validado = response.data == "TRUE";

      if (validado) {
        setCookie(undefined, "logado", response.data, {
          maxAge: 60 * 60 * 24, // 24 horas
        });
        setCookie(undefined, "usuario", usuario, {
          maxAge: 60 * 60 * 24, // 24 horas
        });

        setUser(usuario);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function logOut() {
    setCookie(undefined, "logado", "FALSE", {
      maxAge: 60 * 60 * 24, // 24 horas
    });
    setCookie(undefined, "usuario", "", {
      maxAge: 60 * 60 * 24, // 24 horas
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
