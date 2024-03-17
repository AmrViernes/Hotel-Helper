import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import {
  tintColorPrimary,
  tintColorSecondary,
  tintColorWarmBackground,
} from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import FoodCard from "../components/FoodCard";
import { FoodT, OrderT, OrderInfoT } from "../types/types";



const Food = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>("food");
  const [orderInfo, setOrderInfo] = useState<OrderInfoT>({
    totalPrice: 0,
    items: [],
  });
  const [foodData, setFoodData] = useState<FoodT>([
    {
      CAT_CODE: 0,
      CAT_NAME: "food",
      ITEM: [],
    },
  ]);
  const [order, setOrder] = useState<OrderT>({
    LOCATIONTYPE_CODE: 2,
    LOCATION_CODE: 4,
    REQ_DESC: "Test",
    ITEMS: [],
  });

  const foodSelectedColor =
    selected === "food" ? tintColorSecondary : tintColorPrimary;
  const beverageSelectedColor =
    selected === "beverage" ? tintColorSecondary : tintColorPrimary;
  const foodSelectedBGColor =
    selected === "food" ? tintColorPrimary : tintColorWarmBackground;
  const beverageSelectedBGColor =
    selected === "beverage" ? tintColorPrimary : tintColorWarmBackground;

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/bar/item",
          {
            signal: abort.signal,
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
  }, [loading]);

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

  const isItemDisabled = useCallback(
    (itemName: string) =>
      !orderInfo.items.map((ite) => ite.itemName).includes(itemName),
    [orderInfo.items]
  );

  const getQuantityForItem = useCallback(
    (itemName: string) => {
      const itemInfo = orderInfo.items.find(
        (item) => item.itemName === itemName
      );
      return itemInfo ? itemInfo.quantity : 0;
    },
    [orderInfo.items]
  );

  const buttonIsDisabled = orderInfo.items.length === 0;
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <View style={styles.mainIconsContainer}>
          <Pressable
            style={[
              styles.foodIcon,
              {
                backgroundColor: foodSelectedBGColor,
                borderBottomLeftRadius: 10,
              },
            ]}
          >
            <Text
              style={[styles.foodIconTitle, { color: foodSelectedColor }]}
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
                backgroundColor: beverageSelectedBGColor,
                borderBottomRightRadius: 10,
              },
            ]}
          >
            <Text
              style={[styles.foodIconTitle, { color: beverageSelectedColor }]}
              onPress={() => setSelected("beverage")}
            >
              Beverage
            </Text>
          </Pressable>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.foodItemsContainer}>
              {selected === "food" &&
                foodData[0].ITEM.map((item) => (
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
            </View>
          </ScrollView>
        )}

        <View style={styles.addOrderContainer}>
          <View>
            <Text style={styles.totalTitle}>
              Total: {orderInfo.totalPrice} {foodData[0]?.ITEM[0]?.CURRENCY}
            </Text>
          </View>
          <Pressable disabled={buttonIsDisabled}>
            <Text
              style={[
                styles.orderButton,
                {
                  backgroundColor: buttonIsDisabled ? "#ccc" : tintColorPrimary,
                },
              ]}
            >
              {buttonIsDisabled ? 'Empty Basket' : 'Place Your Order'}
            </Text>
          </Pressable>
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
    paddingVertical: 5,
    borderRadius: 50,
  },
  totalTitle: {
    fontFamily: "PoppinsR",
    fontSize: 22,
    margin: 5,
  },
});
