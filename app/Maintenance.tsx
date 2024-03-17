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
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import MaintenanceCard from "../components/ServicesCard";
import { ServicesT } from "../types/types";

const Maintenance = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [maintenanceData, setMaintenanceData] = useState<ServicesT[]>();
  const [maintenanceOrder, setMaintenanceOrder] = useState<ServicesT[]>();

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
    setMaintenanceOrder((prev) => {
      const itemExistInMaintenance = prev?.some(
        (item) => item.ITEM_CODE === itemId
      );

      if (itemExistInMaintenance) {
        // If the item exists, remove it from the list
        const updatedMaintenanceOrder = prev?.filter(
          (item) => item.ITEM_CODE !== itemId
        );
        return updatedMaintenanceOrder || [];
      } else {
        // If the item doesn't exist, add it to the list
        return prev
          ? [...prev, { ITEM_CODE: itemId }]
          : [{ ITEM_CODE: itemId }];
      }
    });
  };

  const checkItemIsInOrder = (id: number) =>
    maintenanceOrder?.find((item) => item.ITEM_CODE === id);

  const buttonIsDisabled = maintenanceOrder?.length === 0 ? true : false;

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
                      onPress={() => handleMaintenanceList(item.ITEM_CODE)}
                      key={index + 1}
                    >
                      <MaintenanceCard
                        name={item.ITEM_NAME}
                        checked={
                          checkItemIsInOrder(item.ITEM_CODE)
                            ? tintColorPrimary
                            : "#f5ebe0"
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
          <View>
            <Text style={styles.totalTitle}>
              Total: {maintenanceOrder?.length === 0 ? 0 : maintenanceOrder?.length}
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
              {buttonIsDisabled ? "Empty" : "Send Request"}
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
