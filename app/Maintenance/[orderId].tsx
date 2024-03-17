import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { router, useLocalSearchParams } from "expo-router";
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

const EditMaintenance = () => {
  const { orderId } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [maintenanceData, setMaintenanceData] = useState<ServicesT[]>();
  const [maintenanceOrder, setMaintenanceOrder] = useState<ServicesT>({
    ITEM_ID: 0,
  });
  const { setLoadingToTrue } = useData();

  console.log(orderId);
  
  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/fix/item",
          {
            params: {
              P_APPID: 1,
              P_LANGCODE: "E",
            },
          }
        );
        setMaintenanceData(response.data.RESPONSE[0].MAINTENANCE);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort();
  }, []);

  const handleMaintenanceList = (itemId: number) => {
    setMaintenanceOrder({ ITEM_ID: itemId });
  };

  const handlePlaceFixRequest = async () => {
    const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
    const authData = JSON.parse(gettingAuth as string);
    setLoading(true);
    try {
      // Add logic to send the order data to the backend
      await axios.post(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/fix/req",
        maintenanceOrder,
        {
          params: {
            P_APPID: 1,
            P_RCID: authData.RC_ID,
          },
        }
      );
      setLoadingToTrue();
      // Clear the order info and navigate to a success screen or perform other actions
      setMaintenanceOrder({ ITEM_ID: 0 });
      // Optionally, navigate to a success screen or perform other actions
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const checkIfUserSelectItem = maintenanceOrder.ITEM_ID === 0 ? true : false;

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <StackScreen />
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.title}>Select Damaged Items</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {loading ? (
                  <Loader />
                ) : (
                  maintenanceData?.map((item, index) => (
                    <Pressable
                      onPress={() => handleMaintenanceList(item.ITEM_ID)}
                      key={index + 1}
                    >
                      <MaintenanceCard
                        name={item.ITEM_NAME}
                        checked={
                          item.ITEM_ID === maintenanceOrder.ITEM_ID
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
            onPress={() => handlePlaceFixRequest()}
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

export default EditMaintenance;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
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
