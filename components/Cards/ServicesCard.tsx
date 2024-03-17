import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import React from "react";
import {
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import { ServicesCardT } from "../../types/types";

const ServicesCard = ({ id, name, checked }: ServicesCardT) => {
  return (
    <View style={[styles.container, { backgroundColor: checked }]}>
      <Text style={styles.text}>{name?.toLocaleUpperCase()}</Text>
    </View>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    height: Dimensions.get("screen").height / 11,
    marginHorizontal: 10,
    shadowColor: tintColorPrimary,
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  maintenanceContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: tintColorSecondary,
    fontFamily: "Poppins",
    paddingHorizontal: 3,
    textAlign: "left",
    fontSize: 20,
  },
});
