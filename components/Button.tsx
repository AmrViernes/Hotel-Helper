import { StyleSheet, Pressable } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { useRouter } from "expo-router";
import { tintColorPrimary } from "../constants/Colors";

const Button = ({
  title,
  color,
  page,
  disabled
}: {
  title: string;
  color: string;
  page: string;
  disabled: boolean
}) => {
  const router = useRouter();
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => router.push(`/${page}`)}
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
    width: "100%",
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
