import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";
import React from "react";
import { tintColorPrimary } from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CustomInputProps = {
  onClick?: () => void;
  showEye: boolean
  secureText?: boolean
};

type Props = TextInput['props'] & CustomInputProps;

const Input = (props: Props) => {
  const { ...otherProps } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        {...otherProps}
        autoComplete="additional-name"
      />
      {props.showEye && (
        props.secureText ?
        <Pressable onPress={props.onClick} style={{ position: "absolute", right: 10, top: "18%" }}>
          <MaterialCommunityIcons name={props.secureText ? "eye" : "eye-off"} size={24} color={tintColorPrimary} />
        </Pressable> :
        <Pressable onPress={props.onClick} style={{ position: "absolute", right: 10, top: "18%" }}>
        <MaterialCommunityIcons name={props.secureText ? "eye" : "eye-off"} size={24} color={tintColorPrimary} />
      </Pressable>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  input: {
    fontFamily: "PoppinsR",
    backgroundColor: "#E6F4F1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: 300,
    marginBottom: 15,
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
  },
});
