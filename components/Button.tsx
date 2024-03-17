import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { useRouter } from "expo-router";
import { tintColorPrimary } from "../constants/Colors";

const Button = ({
  title,
  color,
  page,
}: {
  title: string;
  color: string;
  page: string;
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => router.push(`/${page}`)}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
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
