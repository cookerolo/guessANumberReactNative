import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import MainButton from "../components/MainButton";
import Colors from "../constants/color";
import DefaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Game Over!</Text>
        <View style={styles.imageContainer}>
          {/* <Image source={require("../assets/success.png")} style={styles.img} resizeMode="cover" /> */}
          <Image
            fadeDuration={1000}
            source={{
              uri:
                "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }}
            style={styles.img}
            resizeMode="cover"
          />
        </View>
        <Text style={{ ...DefaultStyles.bodyText, ...styles.text }}>
          Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number <Text style={styles.highlight}>{props.userNumber}</Text>!
        </Text>
        <MainButton onPress={props.onGameRestart}>Wanna another try?</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: Dimensions.get("window").height * 0.5,
    height: Dimensions.get("window").height * 0.5,
    borderRadius: Dimensions.get("window").height * 0.25,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30
  },
  img: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold"
  },
  text: {
    width: "80%",
    textAlign: "center",
    marginVertical: Dimensions.get("window").height / 20,
    fontSize: Dimensions.get("window").height < 400 ? 16 : 17
  }
});

export default GameOverScreen;
