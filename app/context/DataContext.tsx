// DataContext.js
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type HomeData = {
  ROOM_NO: string;
  NEXT_EVENT: string;
  FINANCE: Array<any>;
  PROGRAM: Array<{
    PROG_ID: number;
    PROG_DATE: string;
    PROG_TIME: string;
    PROG_TITLE: string;
    PROG_DESCRIPTION: string;
  }>;
  REQUEST: Array<{
    REQ_ID: number;
    DEPT_NAME: string;
    DEPT_NUMBER: number;
    REQ_DESC: string;
    REQ_STATUS?: string;
    ITEM_COUNT?: number;
  }>;
};

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  homeData: HomeData;
  updateHomeData: (newData: HomeData) => void;
  setLoadingToFalse: () => void;
  setLoadingToTrue: () => void;
  loading: boolean;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [homeData, setHomeData] = useState<HomeData>({
    ROOM_NO: "",
    NEXT_EVENT: "",
    FINANCE: [],
    PROGRAM: [
      {
        PROG_ID: 0,
        PROG_TITLE: "",
        PROG_DATE: "",
        PROG_DESCRIPTION: "",
        PROG_TIME: "",
      },
    ],
    REQUEST: [
      {
        DEPT_NAME: "",
        DEPT_NUMBER: 0,
        REQ_ID: 0,
        REQ_DESC: "",
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/home/gtData",
          {
            params: {
              P_APPID: 1,
              P_RCID: 7977,
              P_LANGCODE: "E",
            },
          }
        );
        setHomeData(response.data.RESPONSE[0]);
        console.log(response.data.RESPONSE[0]);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  const updateHomeData = (newData: HomeData) => {
    setHomeData(newData);
  };

  const setLoadingToFalse = () => {
    if (loading) setLoading(false);
  };

  const setLoadingToTrue = () => {
    if (!loading) setLoading(true);
  };

  const value: DataContextValue = {
    loading,
    setLoadingToFalse,
    setLoadingToTrue,
    homeData,
    updateHomeData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
