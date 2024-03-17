import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { tintColorPrimary } from '../constants/Colors';

type Props =  TextInput["props"]

const Input = (props: Props) => {
  const {...otherProps } = props
  
  return (
    <View>
      <TextInput style={styles.input}  {...otherProps} autoComplete='additional-name'/>
    </View>
  );
};

export default Input

const styles = StyleSheet.create({
  input: {
    fontFamily: "PoppinsR",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E6F4F1",
    borderRadius: 10,
    width: 300,
    marginBottom: 15,
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
  },
});