// DataContext.js
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Home_Data = {
  ROOM_NO: string;
  NEXT_EVENT: string;
  FINANCE: [];
  PROGRAM: [];
  REQUEST: [];
};

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  homeData: Home_Data;
  updateData: (newData: Home_Data) => void;
  loading: boolean
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [homeData, setHomeData] = useState<Home_Data>({
    ROOM_NO: "",
    NEXT_EVENT: "",
    FINANCE: [],
    PROGRAM: [],
    REQUEST: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/home/gtData",
        {
          params: {
            P_APPID: 1,
            P_RCID: 7977,
            P_LANGCODE: "E",
          },
        }
      )
      .then((res) => setHomeData(res.data.RESPONSE[0]))
      .finally(() => setLoading(false));
  }, []);

  const updateData = (newData: Home_Data) => {
    setHomeData(newData);
  };

  const value: DataContextValue = {
    loading,
    homeData,
    updateData,
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
