import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tintColorSecondary } from "../constants/Colors";

type Props = {
  name: string;
};

const Stars = ({
  value,
  maxValue,
  onClick,
}: {
  value: number;
  maxValue: number;
  onClick(): void;
}) => {
  /*   const [currentValue, setCurrentValue] = useState(0);
  const [form, setForm] = useState({
    Reception: "",
    Cabin: "",
    HouseKeeping: "",
    DinningTable: "",
    FoodQuailty: "",
    FoodVariety: "",
    ResturantServices: "",
    BarServices: "",
    BarProductsVariety: "",
  });

  const rates: string[] = ["Bad", "Normal", "Good", "Very Good", "Excellent"]; */

  /*   const handleClick = (value: number) => {
    setCurrentValue(value + 1);

    // Here We Gonna send post request with each rate or the full rate
    setForm((prev) => ({
      ...prev,
      [props.name]: rates[value],
    }));
  }; */

  return (
      <Pressable onPress={onClick}>
        <Ionicons
          name="ios-star"
          size={40}
          color={value < maxValue ? tintColorSecondary : "#cccc"}
          style={styles.star}
        />
      </Pressable>
  );
};

export default Stars;

const styles = StyleSheet.create({
  starsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  star: {
    padding: 3,
  },
});
