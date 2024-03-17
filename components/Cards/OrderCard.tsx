import { Dimensions, StyleSheet, Text } from "react-native";
import React from "react";
import {
  tintColorColdBackground,
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import { ImageBackground } from "expo-image";
import { View } from "../Themed";
import Loader from "../Loader";

type OrderProps = {
  orderName: string;
  orderStatus?: string;
  orderQuantity?: string;
  imageUrl: number;
  loading: boolean;
};

const ordersImage = (num: number) => {
  if (num == 3) {
    return require("../../assets/images/svg/fix.svg");
  } else if (num == 6) {
    return require("../../assets/images/svg/food.svg");
  } else if (num == 10) {
    return require("../../assets/images/svg/clean.svg");
  } else {
    return require("../../assets/images/svg/other.svg");
  }
};
const orderColor = (num: number) => {
  if (num == 3) {
    return "#9DBC98";
  } else if (num == 6) {
    return "#E6BAA3";
  } else if (num == 10) {
    return "#F0B86E";
  } else {
    return tintColorColdBackground;
  }
};

const OrderCard = ({
  orderName,
  orderStatus,
  orderQuantity,
  imageUrl,
  loading,
}: OrderProps) => {
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <View style={styles.cardContainer}>
          <View
            style={[styles.overlay, { backgroundColor: orderColor(imageUrl) }]}
          ></View>
        <ImageBackground
          source={ordersImage(imageUrl)}
          style={styles.imageContainer}
          imageStyle={{ borderRadius: 10, opacity: 0.25 }}
          contentFit="contain"
        >

          <Text style={styles.orderTitle}>{orderName}</Text>
          {orderStatus && <Text style={styles.orderStatus}>{orderStatus}</Text>}
          {orderQuantity ? (
            <Text style={styles.orderItemsCount}>
              Items Count {orderQuantity}
            </Text>
          ) : null}
        </ImageBackground>
        </View>
      )}
    </>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 5,
    marginHorizontal: 10,
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    width: '90%'
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  overlay: {
    position: "absolute",
    borderRadius: 10,
    opacity: 0.5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  orderTitle: {
    fontSize: 18,
    color: tintColorPrimary,
    fontFamily: "Poppins",
  },
  orderStatus: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: tintColorColdBackground,
    backgroundColor: tintColorPrimary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 5,
    borderRadius: 10,
    opacity: 0.9,
  },
  orderItemsCount: {
    fontSize: 14,
    color: tintColorPrimary,
    fontFamily: "Poppins",
    backgroundColor: tintColorColdBackground,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
