import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useColorScheme,
} from "react-native";
import React from "react";
import { useData } from "./context/DataContext";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";
import OrderCard from "../components/Cards/OrderCard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackScreen from "../components/StackScreen";

type Props = {};

const Orders = (props: Props) => {
  const { loading, homeData, setLoadingToTrue } = useData();
  const [refreshing, setRefreshing] = React.useState(false);
  const colorSchema = useColorScheme();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoadingToTrue();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaProvider
      style={[
        styles.listContainer,
        {
          backgroundColor:
            colorSchema === "light" ? tintColorWarmBackground : "black",
        },
      ]}
    >
      <StackScreen />
      {loading && <Loader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionsTitle}>Your Orders</Text>
        {!loading &&
          homeData?.REQUEST.sort((a: any, b: any) => b.REQ_ID - a.REQ_ID).map(
            (req: any) => (
              <Pressable key={req.REQ_ID}>
                <View style={styles.card}>
                  <OrderCard
                    orderName={req.DEPT_NAME}
                    orderStatus={req.REQ_STATUS}
                    orderQuantity={req.ITEM_COUNT}
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
  },
  sectionsTitle: {
    fontFamily: "Poppins",
    fontSize: 26,
    color: tintColorPrimary,
    textTransform: "uppercase",
    textAlign: "center",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
    maxHeight: 200,
    height: 150,
    padding: 10,
    width: Dimensions.get("screen").width,
  },
});
