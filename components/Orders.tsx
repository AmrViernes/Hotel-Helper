import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";
import { ImageBackground } from "expo-image";

type OrderProps = {
  orderId?: number,
  orderName: string;
  guestName?: string;
  orderType?: string;
  orderTime?: string;
};

const Orders = ({
  orderId,
  orderName,
  guestName,
  orderType,
  orderTime,
}: OrderProps) => {
  return (
    <ImageBackground source={require('../assets/images/orders.png')} style={styles.box} imageStyle={{borderRadius: 10, opacity: 0.25}} contentFit="cover">
      <Text>{orderId}</Text>
      <Text style={{fontSize: 18, color: tintColorPrimary ,fontFamily: 'PoppinsR'}}>{orderName}</Text>
      <Text>{guestName}</Text>
      <Text>{orderType}</Text>
      <Text>{orderTime}</Text>
    </ImageBackground>
  );
};

export default Orders;

const styles = StyleSheet.create({
  box: {
    flex: 1,
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
