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

const DataContext = createContext<DataContextValueT | undefined>(undefined);

export const DataProvider: React.FC<DataContextPropsT> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeDataT>();
  const {authState} = useAuth()
  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      console.log(authState?.RC_ID)
        try {
          const response = await axios.get(
            "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/home/gtData",
            {
              params: {
                P_APPID: 1,
                P_RCID: authData?.RC_ID || authState?.RC_ID,
                P_LANGCODE: "E",
              },
            }
          );
          setHomeData(response.data.RESPONSE[0]);
          console.log("Home Data Context Triggered");
        } catch (error) {
          console.error("Error fetching data:", error);
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
