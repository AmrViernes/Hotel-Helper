import { Dimensions, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import React from "react";
import {
    tintColorDisabled,
  tintColorPrimary,
} from "../../constants/Colors";

type FoodCard = {
  id?: number;
  name: string;
  backgroundColor: string
};

const LocationCard = ({
  id,
  name,
  backgroundColor,
}: FoodCard) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
        <Text style={styles.text}>
          {name.toLocaleUpperCase()}
        </Text>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
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
    margin: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontFamily: "Poppins",
    textAlign: 'center',
    fontSize: 22
  },
});
