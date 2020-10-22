import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/color";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}> {props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  number: {
    color: "black",
    fontSize: 22
  }
});
export default NumberContainer;