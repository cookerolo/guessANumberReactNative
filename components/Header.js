import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../constants/color";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title} </Text>
      <Text style={styles.headerText}>
        {Platform.OS.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())} :{" "}
        {Dimensions.get("window").height} x {Dimensions.get("window").width}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontFamily: "open-sans-bold"
  }
});

export default Header;
