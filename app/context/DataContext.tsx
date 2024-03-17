// DataContext.js
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DataContextPropsT, DataContextValueT, HomeDataT } from "../../types/types";

const DataContext = createContext<DataContextValueT | undefined>(undefined);

export const DataProvider: React.FC<DataContextPropsT> = ({ children }) => {
  const [homeData, setHomeData] = useState<HomeDataT>({
    ROOM_NO: "",
    NEXT_EVENT: "",
    FINANCE: [],
    PROGRAM: [],
    REQUEST: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abort = new AbortController()

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/home/gtData",
          {
            signal: abort.signal,
            params: {
              P_APPID: 1,
              P_RCID: 7977,
              P_LANGCODE: "E",
            },
          }
        );
        setHomeData(response.data.RESPONSE[0]);
        console.log(homeData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort(); 
  }, [loading]);

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
