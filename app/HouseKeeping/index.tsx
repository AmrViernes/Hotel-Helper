import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { router } from "expo-router";
import {
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import MaintenanceCard from "../../components/Cards/ServicesCard";
import { ServicesT } from "../../types/types";
import { useData } from "../context/DataContext";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY } from "../context/AuthContext";
import StackScreen from "../../components/StackScreen";

const HouseKeeping = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [houseKeepingData, setHouseKeepingData] = useState<ServicesT[]>();
  const [houseKeepingOrder, setHouseKeepingOrder] = useState<ServicesT>({
    ITEM_ID: 0,
  });
  const { setLoadingToTrue } = useData();

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.10.150:8085/ords/boatmob/guest/hk/item",
          {
            params: {
              P_APPID: 1,
              P_LANGCODE: "E",
            },
          }
        );
        setHouseKeepingData(response.data.RESPONSE[0].HOUSEKEEPING);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort();
  }, []);

  const handlePlaceHouseKeepingRequest = async () => {
    const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
    const authData = JSON.parse(gettingAuth as string);
    setLoading(true);
    try {
      // Add logic to send the order data to the backend
      await axios.post(
        "http://10.0.10.150:8085/ords/boatmob/guest/hk/req",
        houseKeepingOrder,
        {
          params: {
            P_APPID: 1,
            P_RCID: authData.RC_ID,
          },
        }
      );
      setLoadingToTrue();
      // Clear the order info and navigate to a success screen or perform other actions
      setHouseKeepingOrder({ ITEM_ID: 0 });
      // Optionally, navigate to a success screen or perform other actions
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const checkIfUserSelectItem = houseKeepingOrder.ITEM_ID === 0 ? true : false;

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <StackScreen />
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.title}>Select Services</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.maintenanceContainer}>
                {loading ? (
                  <Loader />
                ) : (
                  houseKeepingData?.map((item, index) => (
                    <Pressable
                      onPress={() =>
                        setHouseKeepingOrder({
                          ITEM_ID: item.ITEM_CODE as number,
                        })
                      }
                      key={index + 1}
                    >
                      <MaintenanceCard
                        name={item.ITEM_NAME}
                        checked={
                          item.ITEM_CODE === houseKeepingOrder.ITEM_ID
                            ? tintColorPrimary
                            : tintColorDisabled
                        }
                      />
                    </Pressable>
                  ))
                )}
              </View>
            </ScrollView>
          </>
        )}
        <View style={styles.addOrderContainer}>
          <Pressable
            disabled={checkIfUserSelectItem}
            onPress={() => handlePlaceHouseKeepingRequest()}
          >
            <Text
              style={[
                styles.orderButton,
                {
                  backgroundColor: checkIfUserSelectItem
                    ? "#ccc"
                    : tintColorPrimary,
                  color: checkIfUserSelectItem ? tintColorPrimary : "white",
                },
              ]}
            >
              {checkIfUserSelectItem ? "Empty" : "Send Request"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaProvider>
    </View>
  );
};

export default HouseKeeping;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  maintenanceContainer: {},
  title: {
    fontFamily: "Poppins",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 8,
    textDecorationLine: "underline",
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
    margin: 5,
  },
});
