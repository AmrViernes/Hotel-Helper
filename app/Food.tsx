import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { router } from "expo-router";
import {
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
  tintColorWarmBackground,
} from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import FoodCard from "../components/Cards/FoodCard";
import { FoodT, OrderT, OrderInfoT, LocationT } from "../types/types";
import LocationCard from "../components/Cards/LocationCard";
import { useData } from "./context/DataContext";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY } from "./context/AuthContext";
import StackScreen from "../components/StackScreen";

const Food = () => {
  const { setLoadingToTrue } = useData();
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationT>([]);
  const [orderIsDone, setOrderIsDone] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("food");
  const [orderInfo, setOrderInfo] = useState<OrderInfoT>({
    totalPrice: 0,
    items: [],
  });
  const [foodData, setFoodData] = useState<FoodT>([]);
  const [order, setOrder] = useState<OrderT>({
    LOCATIONTYPE_CODE: 0,
    LOCATION_CODE: 0,
    REQ_DESC: "",
    ITEMS: [],
  });

  const foodSelectedTextColor =
    selected === "food" ? tintColorSecondary : tintColorPrimary;
  const foodSelectedButtonColor =
    selected === "food" ? tintColorPrimary : tintColorWarmBackground;
  const beverageSelectedTextColor =
    selected === "beverage" ? tintColorSecondary : tintColorPrimary;
  const beverageSelectedButtonColor =
    selected === "beverage" ? tintColorPrimary : tintColorWarmBackground;

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/bar/item",
          {
            params: {
              P_APPID: 1,
              P_LANGCODE: "E",
            },
          }
        );
        setFoodData(response.data.RESPONSE[0].CATEGORY);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort();
  }, []);

  const handleIncrement = useCallback(
    (price: number, itemId: number, itemName: string) => {
      setOrderInfo((prev) => {
        const existingItem = prev.items.find(
          (item) => item.itemName === itemName
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          prev.items.push({
            itemName,
            quantity: 1,
          });
        }

        return {
          totalPrice: prev.totalPrice >= 0 ? prev.totalPrice + price : 0,
          items: [...prev.items],
        };
      });

      setOrder((prevOrder) => {
        const existingItemOrder = prevOrder.ITEMS.find(
          (item) => item.ITEM_ID === itemId
        );

        if (existingItemOrder) {
          existingItemOrder.ITEM_QTY += 1;
        } else {
          prevOrder.ITEMS.push({
            ITEM_ID: itemId,
            ITEM_QTY: 1,
          });
        }

        return {
          ...prevOrder,
          ITEMS: [...prevOrder.ITEMS],
        } as OrderT;
      });
    },
    [orderInfo, setOrderInfo, order, setOrder]
  );

  const handleDecrement = useCallback(
    (price: number, itemId: number, itemName: string) => {
      setOrderInfo((prev) => {
        const existingItem = prev.items.find(
          (item) => item.itemName === itemName
        );

        if (existingItem) {
          existingItem.quantity = Math.max(0, existingItem.quantity - 1);

          if (existingItem.quantity === 0) {
            prev.items = prev.items.filter(
              (item) => item.itemName !== itemName
            );
          }
        }

        return {
          totalPrice: Math.max(0, prev.totalPrice - price),
          items: [...prev.items],
        };
      });

      setOrder((prevOrder) => {
        const existingItemOrder = prevOrder.ITEMS.find(
          (item) => item.ITEM_ID === itemId
        );

        if (existingItemOrder) {
          existingItemOrder.ITEM_QTY = Math.max(
            0,
            existingItemOrder.ITEM_QTY - 1
          );
        } else {
          prevOrder.ITEMS.push({
            ITEM_ID: itemId,
            ITEM_QTY: 0,
          });
        }

        return {
          ...prevOrder,
          ITEMS: [...prevOrder.ITEMS],
        } as OrderT;
      });
    },
    [orderInfo, setOrderInfo, order, setOrder]
  );

  const handleFetchOrderLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/loc",
        {
          params: {
            P_APPID: 1,
            P_LANGCODE: "E",
          },
        }
      );
      setLocations(response.data.RESPONSE[0].LOCATION_TYPE);
      setOrderIsDone(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
    const authData = JSON.parse(gettingAuth as string);
    try {
      // Add logic to send the order data to the backend
      await axios.post(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/bar/req",
        order,
        {
          params: {
            P_APPID: 1,
            P_RCID: authData.RC_ID,
          },
        }
      );
      setLoadingToTrue();
      // Clear the order info and navigate to a success screen or perform other actions
      setOrderInfo({ totalPrice: 0, items: [] });
      setOrder({
        LOCATIONTYPE_CODE: 0,
        LOCATION_CODE: 0,
        REQ_DESC: "",
        ITEMS: [],
      });

      // Reset selected location
      setSelectedLocation(null);

      // Optionally, navigate to a success screen or perform other actions
      // navigation.navigate("OrderSuccessScreen");
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const getQuantityForItem = useMemo(
    () => (itemName: string) => {
      const itemInfo = orderInfo.items.find(
        (item) => item.itemName === itemName
      );
      return itemInfo ? itemInfo.quantity : 0;
    },
    [orderInfo.items]
  );

  const checkIfOrderIsNotEmpty = orderInfo.items.length === 0;
  const checkIfLocationIsNotEmpty = order.LOCATION_CODE === 0;

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <StackScreen />

        {loading ? (
          <Loader />
        ) : (
          <>
            {locations.length === 0 && (
              <View style={styles.mainIconsContainer}>
                <Pressable
                  style={[
                    styles.foodIcon,
                    {
                      backgroundColor: foodSelectedButtonColor,
                      borderBottomLeftRadius: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.foodIconTitle,
                      { color: foodSelectedTextColor },
                    ]}
                    onPress={() => setSelected("food")}
                  >
                    Food
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.foodIcon,
                    ,
                    {
                      backgroundColor: beverageSelectedButtonColor,
                      borderBottomRightRadius: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.foodIconTitle,
                      { color: beverageSelectedTextColor },
                    ]}
                    onPress={() => setSelected("beverage")}
                  >
                    Beverage
                  </Text>
                </Pressable>
              </View>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.foodItemsContainer}>
                {locations.length === 0 ? (
                  <>
                    {selected === "food" &&
                      foodData[0]?.ITEM.map((item) => (
                        <FoodCard
                          key={item.ITEM_ID}
                          name={item.ITEM_NAME}
                          price={item.ITEM_PRICE}
                          currency={item.CURRENCY}
                          counter={getQuantityForItem(item.ITEM_NAME)}
                          disabled={
                            orderInfo.items.find(
                              (ite) => ite.itemName === item.ITEM_NAME
                            )
                              ? false
                              : true
                          }
                          disabledColor={
                            orderInfo.items.find(
                              (ite) => ite.itemName === item.ITEM_NAME
                            )
                              ? tintColorPrimary
                              : "#ccc"
                          }
                          onDecrement={() =>
                            handleDecrement(
                              item.ITEM_PRICE,
                              item.ITEM_ID,
                              item.ITEM_NAME
                            )
                          }
                          onIncrement={() =>
                            handleIncrement(
                              item.ITEM_PRICE,
                              item.ITEM_ID,
                              item.ITEM_NAME
                            )
                          }
                        />
                      ))}

                    {selected === "beverage" &&
                      foodData[1]?.ITEM?.map((item: any) => (
                        <FoodCard
                          key={item.ITEM_ID}
                          name={item.ITEM_NAME}
                          price={item.ITEM_PRICE}
                          currency={item.CURRENCY}
                          counter={getQuantityForItem(item.ITEM_NAME)}
                          disabled={
                            orderInfo.items.find(
                              (ite) => ite.itemName === item.ITEM_NAME
                            )
                              ? false
                              : true
                          }
                          disabledColor={
                            orderInfo.items.find(
                              (ite) => ite.itemName === item.ITEM_NAME
                            )
                              ? tintColorPrimary
                              : "#ccc"
                          }
                          onDecrement={() =>
                            handleDecrement(
                              item.ITEM_PRICE,
                              item.ITEM_ID,
                              item.ITEM_NAME
                            )
                          }
                          onIncrement={() =>
                            handleIncrement(
                              item.ITEM_PRICE,
                              item.ITEM_ID,
                              item.ITEM_NAME
                            )
                          }
                        />
                      ))}
                  </>
                ) : (
                  <View style={styles.locationContainer}>
                    {locations?.map((location, index) => (
                      <View key={index}>
                        <Pressable
                          onPress={() => {
                            // Toggle selected location on press
                            setSelectedLocation(location.LOCATIONTYPE_NAME);
                            setOrder((prev) => {
                              return {
                                ...prev,
                                LOCATIONTYPE_CODE: location.LOCATIONTYPE_CODE,
                                LOCATION_CODE:
                                  location.LOCATIONTYPE_NAME === "room"
                                    ? null
                                    : 0,
                              };
                            });
                          }}
                        >
                          <LocationCard
                            name={location.LOCATIONTYPE_NAME}
                            backgroundColor={
                              selectedLocation === location.LOCATIONTYPE_NAME
                                ? tintColorPrimary
                                : tintColorSecondary
                            }
                          />
                        </Pressable>

                        {/* Show items if the location is selected */}
                        {selectedLocation === location.LOCATIONTYPE_NAME && (
                          <View
                            style={[
                              styles.subLocations,
                              {
                                display:
                                  selectedLocation === "room" ? "none" : "flex",
                              },
                            ]}
                          >
                            {location.LOCATION.map((item: any, index) => (
                              <Pressable
                                key={index}
                                onPress={() => {
                                  setOrder((prev) => {
                                    return {
                                      ...prev,
                                      LOCATION_CODE:
                                        location.LOCATIONTYPE_CODE === 1
                                          ? null
                                          : item.LOCATION_CODE,
                                    };
                                  });
                                }}
                              >
                                <Text
                                  style={[
                                    styles.subTitle,
                                    {
                                      color:
                                        order.LOCATION_CODE ===
                                        item.LOCATION_CODE
                                          ? tintColorSecondary
                                          : tintColorPrimary,
                                      backgroundColor:
                                        order.LOCATION_CODE ===
                                        item.LOCATION_CODE
                                          ? tintColorPrimary
                                          : tintColorSecondary,
                                    },
                                  ]}
                                >
                                  {item.LOCATION_NAME}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </>
        )}

        <View style={styles.addOrderContainer}>
          <View>
            <Text style={styles.totalTitle}>
              Total: {orderInfo.totalPrice} {foodData[0]?.ITEM[0]?.CURRENCY}
            </Text>
          </View>
          {!orderIsDone && (
            <Pressable
              disabled={checkIfOrderIsNotEmpty}
              onPress={() => handleFetchOrderLocations()}
            >
              <Text
                style={[
                  styles.orderButton,
                  {
                    backgroundColor: checkIfOrderIsNotEmpty
                      ? "#ccc"
                      : tintColorPrimary,
                    color: checkIfOrderIsNotEmpty ? tintColorPrimary : "white",
                  },
                ]}
              >
                Deliver To
              </Text>
            </Pressable>
          )}
          {orderIsDone && (
            <Pressable
              disabled={checkIfLocationIsNotEmpty}
              onPress={() => handlePlaceOrder()}
            >
              <Text
                style={[
                  styles.orderButton,
                  {
                    backgroundColor: checkIfLocationIsNotEmpty
                      ? "#ccc"
                      : tintColorPrimary,
                    color: checkIfLocationIsNotEmpty
                      ? tintColorPrimary
                      : "white",
                  },
                ]}
              >
                Confirm Your Order
              </Text>
            </Pressable>
          )}
        </View>
      </SafeAreaProvider>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  mainIconsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  foodIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    padding: 10,
  },
  foodIconTitle: {
    fontFamily: "Poppins",
    fontSize: 26,
  },
  foodItemsContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
  },
  addOrderContainer: {
    backgroundColor: tintColorSecondary,
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  orderButton: {
    fontFamily: "Poppins",
    fontSize: 26,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
  },
  totalTitle: {
    fontFamily: "PoppinsR",
    fontSize: 22,
    padding: 5,
    backgroundColor: tintColorSecondary,
  },
  locationContainer: {
    padding: 20,
  },
  subLocations: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tintColorDisabled,
    width: "60%",
    alignSelf: "center",
    paddingVertical: 10,
    marginTop: -5,
    marginBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: -5,
  },
  subTitle: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: tintColorSecondary,
    backgroundColor: tintColorPrimary,
    padding: 8,
    margin: 2,
    borderRadius: 500,
    minWidth: 40,
    width: "auto",
    height: 40,
    textAlign: "center",
  },
});
