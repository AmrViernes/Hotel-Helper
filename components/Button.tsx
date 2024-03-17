import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { useRouter } from "expo-router";

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
    width: "60%",
    margin: 8,
  },
  title: {
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});
