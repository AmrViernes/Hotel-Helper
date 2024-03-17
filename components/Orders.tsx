import { Dimensions, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.box}>
      <Text>{orderName}</Text>
      <Text>{roomNumber}</Text>
      <Text>{guestName}</Text>
      <Text>{orderType}</Text>
      <Text>{orderTime}</Text>
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 5,
    width: 200,
    marginHorizontal: 10,
    borderColor: "#eed7c5",
    backgroundColor: "#f5ebe0",
    shadowColor: tintColorPrimary,
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
