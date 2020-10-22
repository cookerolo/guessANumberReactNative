import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const Card = (props) => {
  return <View style={{ ...styles.screenInput, ...props.style }}>{props.children}</View>;
};
const styles = StyleSheet.create({
  screenInput: {
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 3
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
    borderRadius: 8,
    margin: 10
  }
});
export default Card;
