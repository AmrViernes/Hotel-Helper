import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";

type OrderProps = {
  orderName: string;
  roomNumber: string;
  guestName: string;
  orderType: string;
  orderTime: string;
};

const Orders = ({
  orderName,
  roomNumber,
  guestName,
  orderType,
  orderTime,
}: OrderProps) => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text>{orderName}</Text>
          <Text>{roomNumber}</Text>
          <Text>{guestName}</Text>
          <Text>{orderType}</Text>
          <Text>{orderTime}</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderColor: "#cccc",
    backgroundColor: "#e9e9e9",
    borderWidth: 2,
    borderRadius: 10,
    height: 70,
    width: 60,
    margin: 5,
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxDay: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 14,
    color: tintColorSecondary,
    marginTop: -8,
  },
  boxDayNum: {
    textAlign: "center",
    fontFamily: "PoppinsR",
    fontSize: 28,
  },
});
