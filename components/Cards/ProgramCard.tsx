import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import React from "react";
import {
  tintColorColdBackground,
  tintColorDisabled,
  tintColorPrimary,
} from "../../constants/Colors";
import { ImageBackground } from "expo-image";

type Program = {
  id?: number;
  title: string;
  description?: string;
  startAt?: string;
  date?: Date;
};

const ProgramCard = ({ id, title, description, startAt }: Program) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <ImageBackground
        source={require("../../assets/images/svg/plan.svg")}
        style={styles.imageContainer}
        imageStyle={{ borderRadius: 10, opacity: 0.25 }}
        contentFit="contain"
      >
        <Text style={[styles.text, { fontSize: 24, color: tintColorPrimary }]}>
          {title}
        </Text>
        {description && <Text style={styles.text}>{description}</Text>}
        {startAt && <Text style={styles.text}>{startAt}</Text>}
      </ImageBackground>
    </View>
  );
};

export default ProgramCard;

const styles = StyleSheet.create({
  container: {
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
    width: "90%",
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
    opacity: 0.7,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tintColorColdBackground,
  },
  text: {
    color: "black",
    fontFamily: "Poppins",
    paddingHorizontal: 3,
    fontSize: 20
  },
});
