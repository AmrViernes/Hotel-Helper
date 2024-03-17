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
  PROGRAM: [{
    PROG_ID: number,
    PROG_DATE: string,
    PROG_TIME: string,
    PROG_TITLE: string,
    PROG_DESCRIPTION: string
  }];
  REQUEST: [{
    REQ_ID: number,
    DEPT_NAME: string,
    DEPT_NUMBER: number,
    REQ_DESC: string,
    REQ_STATUS?: string,
    ITEM_COUNT?: number
  }];
};

interface DataContextProps {
  children: ReactNode;
}

interface DataContextValue {
  homeData: Home_Data;
  updateHomeData: (newData: Home_Data) => void;
  setLoadingToFalse: () => void;
  loading: boolean
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children }) => {
  const [homeData, setHomeData] = useState<Home_Data>({
    ROOM_NO: "",
    NEXT_EVENT: "",
    FINANCE: [],
    PROGRAM: [{
      PROG_ID: 0,
      PROG_TITLE: '',
      PROG_DATE: '',
      PROG_DESCRIPTION: '',
      PROG_TIME: ''
    }],
    REQUEST: [{
      DEPT_NAME: '',
      DEPT_NUMBER: 0,
      REQ_ID: 0,
      REQ_DESC: ''
    }]
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
      console.log(homeData);
      
  }, [loading]);

  const updateHomeData = (newData: Home_Data) => {
    setHomeData(newData);
  };

  const setLoadingToFalse = () => {
    setLoading(true)
  }

  const value: DataContextValue = {
    loading,
    setLoadingToFalse,
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
