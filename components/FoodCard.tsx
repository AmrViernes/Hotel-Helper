import { Dimensions, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React from "react";
import {
  tintColorPrimary,
  tintColorSecondary,
  tintColorWarmBackground,
} from "../constants/Colors";

type FoodCard = {
  id?: number;
  name: string;
  price: number;
  currency: string;
  counter: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean,
  disabledColor: string
};

const FoodCard = ({
  id,
  name,
  price,
  currency,
  counter,
  disabledColor,
  onIncrement,
  onDecrement,
  disabled
}: FoodCard) => {
  return (
    <View style={styles.container}>
      <View style={styles.foodInfoContainer}>
        <Text style={styles.text}>{id}</Text>
        <Text style={[styles.text, { fontSize: 16, color: tintColorPrimary }]}>
          {name.toLocaleUpperCase()}
        </Text>
        <Text style={styles.text}>
          {price} {currency.toLocaleUpperCase()}
        </Text>
        <Text style={styles.text}></Text>
      </View>
      <View style={styles.counterContainer}>
        <Pressable onPress={onDecrement} disabled={disabled}>
          <Text style={[styles.decreaseButton, {color: disabledColor}]}>-</Text>
        </Pressable>
        <Text style={styles.counterNumber}>{counter}</Text>
        <Pressable onPress={onIncrement}>
          <Text style={styles.increaseButton}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 8,
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
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: 'center'
  },
  foodInfoContainer: {
    display: "flex",
    textAlign: "left",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "#f5ebe0",
  },
  text: {
    color: tintColorSecondary,
    fontFamily: "Poppins",
    paddingHorizontal: 3,
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: tintColorSecondary,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    width: "30%",
  },
  counterNumber: {
    fontFamily: "PoppinsR",
    fontSize: 20,
    textAlign: "center",
    color: tintColorWarmBackground
  },
  increaseButton: {
    fontFamily: "PoppinsR",
    fontSize: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
    textAlign: "center",
    paddingHorizontal: 8,
    color: tintColorPrimary
  },
  decreaseButton: {
    fontFamily: "PoppinsR",
    fontSize: 30,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
    width: '100%',
    paddingHorizontal: 8,
  },
});
