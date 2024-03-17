import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import { Alert } from "react-native";
import { router } from "expo-router";

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

const TOKEN_KEY = "Auth_token";

export const API_URL =
  "https://actidesk.oracleapexservices.com/apexdbl/r/boatmob/boatto/login";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await secureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  // Register Function
  const register = async (email: string, password: string) => {
    try {
      return axios.post(`${API_URL}/users`, { email, password });
    } catch (error) {
      return Alert.alert("Error",error as any);
    }
  };

  // Login Function
  const login = async (username: string, password: string) => {
    try {
      const result = await axios.get(`${API_URL}`, {
        headers: {
          P_USERNAME: username,
          P_PASSWORD: password,
        },
      });

      if (result.data.RESPONSE[0].ACCESS_TOKEN) {
        setAuthState({
          token: result.data.RESPONSE[0].ACCESS_TOKEN,
          authenticated: true,
        });

        axios.defaults.headers.common["Authorization"] =
          result.data.RESPONSE[0].ACCESS_TOKEN;

        await secureStore.setItemAsync(
          TOKEN_KEY,
          result.data.RESPONSE[0].ACCESS_TOKEN
        );

        router.push("/home");
      } else {
        Alert.alert("Error", "Invalid Username or Password!!");
      }
    } catch (error) {
      return {
        error: true,
        msg: (error as any).response.data.RESPONSE[0].ERROR,
      };
    }
  };

  // Logout Function
  const logout = async () => {
    await secureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
