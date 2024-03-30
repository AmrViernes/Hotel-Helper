// DataContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  DataContextPropsT,
  DataContextValueT,
  HomeDataT,
} from "../../types/types";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY, useAuth } from "./AuthContext";
import Toast from "react-native-toast-message";

const DataContext = createContext<DataContextValueT | undefined>(undefined);

export const DataProvider: React.FC<DataContextPropsT> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeDataT>();
  const { authState } = useAuth();
  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      try {
        const response = await axios.get(
          "http://10.0.10.150:8085/ords/boatmob/guest/home/gtData",
          {
            params: {
              P_APPID: 1,
              P_RCID: authData?.RC_ID || authState?.RC_ID,
              P_LANGCODE: "E",
            },
          }
        );
        setHomeData(response.data.RESPONSE[0]);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something Went Wrong Try again.",
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort();
  }, [loading, authState]);

  const updateHomeData = (newData: HomeDataT) => {
    setHomeData(newData);
  };

  const setLoadingToFalse = () => {
    if (loading) setLoading(false);
  };

  const setLoadingToTrue = () => {
    if (!loading) setLoading(true);
  };

  const value: DataContextValueT = {
    loading,
    setLoadingToFalse,
    setLoadingToTrue,
    homeData,
    updateHomeData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValueT => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
