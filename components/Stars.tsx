import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tintColorSecondary } from "../constants/Colors";

type Props = {
  value: number;
  maxValue: number;
  onClick(): void;
};

const Stars = ({ value, maxValue, onClick }: Props) => {
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
