import { View, Text, StyleSheet } from "react-native";
import React from "react";
import myColor from "../../myColors.json";

const JokeContainer = ({ joke, loading }) => {
  if (loading)
    return (
      <View style={styles.root}>
        <View style={styles.constainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{joke.category ?? "Loading"}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>Loading ...</Text>
          </View>
        </View>
      </View>
    );

  if (joke.error) {
    return (
      <View style={styles.root}>
        <View style={styles.constainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Error</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>{joke.message}</Text>
            <Text style={styles.text}>Try changing the search string</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.constainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{joke.category}</Text>
        </View>
        <View style={styles.body}>
          {joke.type === "twopart" ? (
            <>
              <Text style={[styles.text, { marginBottom: 30 }]}>
                {joke.setup}
              </Text>
              <Text style={styles.text}>{joke.delivery}</Text>
            </>
          ) : (
            <Text style={styles.text}>{joke.joke}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0.5,
    //backgroundColor: "#000",
    alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },
  constainer: {
    flex: 1,
    width: "80%",
    //backgroundColor: "#000",
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: myColor.border,
    borderRadius: 10,
    margin: 20,
  },
  text: {
    color: myColor.text,
    textAlign: "center",
    padding: 10,
  },
  title: {
    backgroundColor: myColor.primary,
    flex: 0.15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  titleText: {
    color: myColor.text,
    fontSize: 16,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.85,
    width: "100%",
    // backgroundColor: "red",
  },
});

export default JokeContainer;
