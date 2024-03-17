import { Dimensions, StyleSheet, Text } from "react-native";
import React from "react";
import { tintColorDisabled, tintColorPrimary, tintColorSecondary } from "../../constants/Colors";
import { ImageBackground } from "expo-image";
import { View } from "../Themed";
import Loader from "../Loader";

type OrderProps = {
  orderId?: number;
  orderName: string;
  guestName?: string;
  orderType?: string;
  orderTime?: string;
  imageUrl: number;
  loading: boolean;
};

const ordersImage = (num: number) => {
  if (num == 3) {
    return require("../../assets/images/fix.jpeg");
  } else if (num == 6) {
    return require("../../assets/images/orders.png");
  }
  return require("../../assets/images/hk.jpeg");
};

const OrderCard = ({
  orderId,
  orderName,
  guestName,
  orderType,
  orderTime,
  imageUrl,
  loading,
}: OrderProps) => {
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <ImageBackground
          source={ordersImage(imageUrl)}
          style={styles.cardContainer}
          imageStyle={{ borderRadius: 10, opacity: 0.25}}
          contentFit="cover"
        >
          <Text>{}</Text>
          <Text>{orderId}</Text>
          <Text
            style={{
              fontSize: 18,
              color: tintColorPrimary,
              fontFamily: "PoppinsR",
            }}
          >
            {orderName}
          </Text>
          <Text>{guestName}</Text>
          <Text>{orderType}</Text>
          <Text>{orderTime}</Text>
        </ImageBackground>
      )}
    </>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 5,
    marginHorizontal: 10,
    borderColor: "#eed7c5",
    backgroundColor: tintColorDisabled,
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
    justifyContent: "center",
    alignItems: "center",
    width: '90%'
  },
});
