import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { tintColorPrimary } from "../constants/Colors";

const Button = ({
  title,
  color,
  disabled,
  onClick,
}: {
  title: string;
  color: string;
  disabled?: boolean;
  onClick: Function;
}) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => onClick()}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 50,
    width: "100%" ,
    margin: 8,
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
