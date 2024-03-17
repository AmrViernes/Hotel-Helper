import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useData } from "./context/DataContext";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";
import OrderCard from "../components/Cards/OrderCard";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {};

const Orders = (props: Props) => {
  const { loading, homeData } = useData();
  return (
    <SafeAreaProvider style={styles.listContainer}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Text style={styles.sectionsTitle}>Your Orders</Text>
      {loading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        {!loading &&
          homeData?.REQUEST.sort((a: any, b: any) => b.REQ_ID - a.REQ_ID).map(
            (req: any) => (
              <Pressable key={req.REQ_ID}>
                <View style={styles.card}>
                  <OrderCard
                    orderName={req.DEPT_NAME}
                    imageUrl={req.DEPT_NUMBER}
                    loading={loading}
                  />
                </View>
              </Pressable>
            )
          )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Orders;

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  sectionsTitle: {
    fontFamily: "Poppins",
    fontSize: 26,
    color: "white",
    textTransform: "uppercase",
  },
  card: {
    minHeight: 100,
    maxHeight: 200,
    height: 150,
    padding: 10,
    width: Dimensions.get("screen").width,
  },
});
