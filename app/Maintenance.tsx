import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Stack, router } from "expo-router";
import {
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
  tintColorWarmBackground,
} from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import MaintenanceCard from "../components/ServicesCard";
import { ServicesT } from "../types/types";
import { useData } from './context/DataContext'

const Maintenance = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [maintenanceData, setMaintenanceData] = useState<ServicesT[]>();
  const [maintenanceOrder, setMaintenanceOrder] = useState<ServicesT>({ITEM_ID: 0});
const { setLoadingToTrue } = useData()
  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/fix/item",
          {
            signal: abort.signal,
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
    setMaintenanceOrder({ITEM_ID: itemId});
  };

  const handlePlaceFixRequest = async () => {
    setLoading(true)
    try {
      // Add logic to send the order data to the backend
      await axios.post(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/fix/req",
        maintenanceOrder,
        {
          params: {
            P_APPID: 1,
            P_RCID: 7977
          }
        }
      );
      setLoadingToTrue()
      // Clear the order info and navigate to a success screen or perform other actions
      setMaintenanceOrder({ITEM_ID: 0});
      // Optionally, navigate to a success screen or perform other actions
      router.replace('/(tabs)/home')
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  const checkIfUserSelectItem = maintenanceOrder.ITEM_ID === 0 ? true : false

  console.log(maintenanceOrder)

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.title}>Select Damaged Items</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.maintenanceContainer}>
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
          <Pressable disabled={checkIfUserSelectItem} onPress={() => handlePlaceFixRequest()}>
            <Text
              style={[
                styles.orderButton,
                {
                  backgroundColor: checkIfUserSelectItem ? "#ccc" : tintColorPrimary,
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

export default Maintenance;

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
    paddingVertical: 5,
    borderRadius: 50,
  },
  totalTitle: {
    fontFamily: "PoppinsR",
    fontSize: 22,
    margin: 5,
  },
});
