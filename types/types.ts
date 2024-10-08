export type CompanyT = {
  companyId: number;
  companyName: string
}
export type RegisterT = {
  loading: boolean
  formIsCompleted: boolean
  guestsNumber: number
  firstGuestName: string;
  firstGuestPassport: string;
  secondGuestName?: string | null;
  secondGuestPassport?: string | null;
  thirdGuestName?: string | null;
  thirdGuestPassport?: string | null;
  localCompanyId: number;
  foreignCompanyId: number;
  arrivalDate?: Date
  leavingDate?: Date
  companies: {
    localCompanies: CompanyT[]
    foreignCompanies: CompanyT[]
  }
};


export type LoginT = {
  username: string;
  password: string;
  showPassword: boolean,
  loading: boolean;
};

export type ChangePasswordT = {
  password: string;
  confirmPassword: string;
  showPassword: boolean,
  showConfirmPassword: boolean,
  loading: boolean;
};

export type HomeDataT = {
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
    REQUEST_ITEMS: []
  }>;
} | undefined

export interface DataContextPropsT {
  children: React.ReactNode;
}

export type DataContextValueT = {
  homeData: HomeDataT;
  updateHomeData: (newData: HomeDataT) => void;
  setLoadingToFalse: () => void;
  setLoadingToTrue: () => void;
  loading: boolean;
};

export type EvaluationT = {
  id: number
  name: string;
  rate: number;
  rateMaxValue: number;
};

export type FoodItemT = {
  CURRENCY: string;
  ITEM_ID: number;
  ITEM_NAME: string;
  ITEM_PRICE: number;
};

export type FoodT = {
  CAT_CODE: number;
  CAT_NAME: string;
  ITEM: FoodItemT[];
}[];

export type OrderItemT = {
  ITEM_ID: number;
  ITEM_QTY: number;
};

export type OrderT = {
  LOCATIONTYPE_CODE: number | null;
  LOCATION_CODE: number | null;
  REQ_DESC: string;
  ITEMS: OrderItemT[];
};

export type OrderInfoItemT = {
  itemName: string;
  quantity: number;
};

export type OrderInfoT = {
  totalPrice: number;
  items: OrderInfoItemT[];
};

export type LocationItemT = {
  LOCATIONTYPE_CODE: number;
  LOCATIONTYPE_NAME: string;
  LOCATION: []
};

export type LocationT = LocationItemT[];

export type ServicesT = {
  ITEM_ID: number;
  ITEM_CODE?: number;
  ITEM_NAME?: string;
};

export type ServicesCardT = {
  id?: number;
  name: string | undefined;
  checked: string;
};
