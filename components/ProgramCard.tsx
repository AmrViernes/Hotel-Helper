import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { tintColorPrimary } from "../constants/Colors";
import { ImageBackground } from "expo-image";

type Program = {
  id?: number;
  title: string;
  description?: string;
  startAt?: string;
  date?: Date;
};

const ProgramCard = ({
  id,
  title,
  description,
  date,
  startAt,
}: Program) => {
  return (
    <ImageBackground
      source={require("../assets/images/events.jpg")}
      style={styles.container}
      imageStyle={{ borderRadius: 10, opacity: 0.25 }}
      contentFit="cover"
    >
      <Text style={styles.text}>{id}</Text>
      <Text style={[styles.text, { fontSize: 16, color: tintColorPrimary }]}>
        {title}
      </Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>{startAt}</Text>
    </ImageBackground>
  );
};

export default ProgramCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 5,
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#789",
    fontFamily: "Poppins",
    paddingHorizontal: 3,
  },
});
