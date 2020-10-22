import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.textInput, ...props.style }} />;
};

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 8
  }
});

export default Input;
