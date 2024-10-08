import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import { Alert } from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message"

type AuthProps = {
  authState?: {
    ACCESS_TOKEN: string | null;
    RC_ID?: number | null;
    PW_CHANGED?: number | null;
    RC_STATUS?: number | null;
    authenticated: boolean;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
};

export const AUTH_KEY = "AUTH_DATA";

export const API_URL = "http://10.0.10.150:8085/ords/boatmob/user/login";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    ACCESS_TOKEN: string | null;
    RC_ID?: number | null;
    PW_CHANGED?: number | null;
    RC_STATUS?: number | null;
    authenticated: boolean;
  }>({
    ACCESS_TOKEN: null,
    RC_ID: 0,
    PW_CHANGED: 0,
    RC_STATUS: 0,
    authenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);

      if (authData === null && authState.authenticated === false) {
        router.replace("/");
      }
    };
    loadToken();
  }, []);

  // Register Function
  const register = async (email: string, password: string) => {
    try {
      return axios.post(`${API_URL}/users`, { email, password });
    } catch (error) {
      return Alert.alert("Error", error as any);
    }
  };

  // Login Function
  const login = async (username: string, password: string) => {
    try {
      const result = await axios.get(`${API_URL}`, {
        headers: {
          P_USERNAME: username,
          P_PASSWORD: password,
          P_APPID: 1,
        },
      });

      if (result?.data?.RESPONSE[0]?.ACCESS_TOKEN) {
        setAuthState({
          ACCESS_TOKEN: result.data.RESPONSE[0].ACCESS_TOKEN,
          RC_ID: result.data.RESPONSE[0].RC_ID,
          RC_STATUS: result.data.RESPONSE[0].RC_STATUS,
          PW_CHANGED: result.data.RESPONSE[0].PW_CHANGED,
          authenticated: true,
        });

        axios.defaults.headers.common["Authorization"] =
          result?.data?.RESPONSE[0]?.ACCESS_TOKEN;

        await secureStore.setItemAsync(
          AUTH_KEY,
          JSON.stringify(result?.data?.RESPONSE[0])
        );

        // Redirect where PW number for New Password or Fill data
        if (
          result?.data?.RESPONSE[0].PW_CHANGED === 1 &&
          result?.data?.RESPONSE[0].RC_STATUS === 1
        )
          router.replace("/home");
        if (
          result?.data?.RESPONSE[0].PW_CHANGED === 1 &&
          result?.data?.RESPONSE[0].RC_STATUS === 2
        )
          router.replace("/Register");
        if (result?.data?.RESPONSE[0].PW_CHANGED === 2)
          router.replace("/ChangePassword");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid Username or Password.",
          topOffset: 100,
          text1Style: {
            fontFamily: "Poppins",
            fontSize: 18,
          },
          text2Style: {
            fontFamily: "PoppinsR",
            fontSize: 14,
          },
        });
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
    await secureStore.deleteItemAsync(AUTH_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      ACCESS_TOKEN: null,
      RC_ID: null,
      PW_CHANGED: null,
      RC_STATUS: null,
      authenticated: false,
    });

    router.replace("/");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
