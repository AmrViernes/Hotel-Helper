import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "@expo/vector-icons/FontAwesome"
import React from "react";
import { tintColorPrimary } from "../constants/Colors";

type Props = {
  data: string[] | number[];
  title: string;
  handleInput?: any;
  defaultValue?: number;
};

const DropdownMenu = (props: Props) => {
  const handleInputChange = (input: string, value?: string | number) =>
    props.handleInput(input);

  return (
    <SelectDropdown
      dropdownIconPosition="right"
      dropdownStyle={styles.dropdownMenu}
      buttonStyle={styles.dropdownButton}
      data={props.data}
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome
            name={isOpened ? "chevron-up" : "chevron-down"}
            color={tintColorPrimary}
            size={18}
          />
        );
      }}
      onSelect={(selectedItem, index) => {
        handleInputChange(selectedItem);
        return selectedItem;
      }}
      defaultValue={props.defaultValue}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      buttonTextStyle={{
        color: tintColorPrimary,
        fontFamily: "PoppinsR",
        fontWeight: "bold",
        fontSize: 15,
        opacity: 0.8,
      }}
    />
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  dropdownMenu: {
    backgroundColor: "#E6F4F1",
    borderRadius: 10,
    fontFamily: "PoppinsR",
  },
  dropdownButton: {
    fontFamily: "PoppinsR",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E6F4F1",
    borderRadius: 10,
    width: 300,
    height: 45,
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
