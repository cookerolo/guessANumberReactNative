import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Dimensions, FlatList } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/color";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction == "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that is not correct...", [
        { text: "sorry", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponents guess: </Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>
            {currentGuess} - {userChoice}
          </NumberContainer>
          <MainButton
            onPress={() => nextGuessHandler("higher")}
            style={{ backgroundColor: Colors.accent }}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={pastGuesses}
            keyExtractor={(item) => item.toString()}
            renderItem={(item) => {
              return (
                <View>
                  <Text style={{ ...DefaultStyles.bodyText, ...styles.listItem }}>
                    Phone Guess #{pastGuesses.length - item.index} for Value {item.item}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponents guess: </Text>
      <NumberContainer>
        {currentGuess} - {userChoice}
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => nextGuessHandler("higher")}
          style={{ backgroundColor: Colors.accent }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView >
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <Text style={DefaultStyles.bodyText}>Guess #{pastGuesses.length - index} </Text>
              <Text style={DefaultStyles.bodyText}>Value {guess}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          keyExtractor={(item) => item.toString()}
          // style={{ flex: 1 }}
          // contentContainerStyle={styles.list}
          renderItem={(item) => {
            return (
              <View>
                <Text style={{ ...DefaultStyles.bodyText, ...styles.listItem }}>
                  Phone Guess #{pastGuesses.length - item.index} for Value {item.item}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "90%"
  },
  listItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 5,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 300 ? "100%" : "85%",
    alignItems: "center"
  },
  list: {
    alignItems: "center"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  }
});

export default GameScreen;
