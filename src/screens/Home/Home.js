import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import JokeContainer from "../../components/jokeContainer";
import myColor from "../../myColors.json";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const [joke, setJoke] = useState({
    error: false,
    category: "Programming",
    type: "twopart",
    setup: "Why did the JavaScript heap close shop?",
    delivery: "It ran out of memory.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 31,
    safe: true,
    lang: "en",
  });

  const [settings, setSettings] = useState({
    category: "Any",
    type: "single",
    search: "",
  });
  const getSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("settings");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getJoke();
  }, []);

  const getJoke = async () => {
    const sett = await getSettings();
    // console.log(
    //   sett,
    //   `https://v2.jokeapi.dev/joke/${sett.category}?type=${sett.type}${
    //     sett.search ? `&contains=${encodeURIComponent(sett.search)}` : ""
    //   }}`
    // );
    if (sett) {
      setLoading(true);
      if (sett.search !== "") {
        fetch(
          `https://v2.jokeapi.dev/joke/${sett.category}?type=${
            sett.type
          }&contains=${encodeURIComponent(sett.search)}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setJoke(data);
            setLoading(false);
          });
      } else {
        fetch(`https://v2.jokeapi.dev/joke/${sett.category}?type=${sett.type}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setJoke(data);
            setLoading(false);
          });
      }
    } else {
      setLoading(true);
      fetch("https://v2.jokeapi.dev/joke/Any")
        .then((res) => res.json())
        .then((data) => {
          setJoke(data);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    // fetch("https://official-joke-api.appspot.com/random_joke")
    //   .then((res) => res.json())
    //   .then((data) => setJoke(data));
    // fetch("https://v2.jokeapi.dev/joke/Coding?type=twopart")
    //   .then((res) => res.json())
    //   .then((data) => setJoke(data));
    // getJoke();
  }, []);

  return (
    <View style={styles.root}>
      <JokeContainer joke={joke} loading={loading} />
      <Pressable
        onPress={getJoke}
        style={({ pressed }) =>
          pressed
            ? [
                styles.nextBtn,
                {
                  backgroundColor: myColor.primary,
                  borderColor: myColor.primary,
                },
              ]
            : [styles.nextBtn, { backgroundColor: myColor.secondary }]
        }>
        <Text style={styles.text}>Next Joke</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignContent: "center",
    backgroundColor: myColor.secondary,
  },
  nextBtn: {
    flex: 0.08,
    //backgroundColor: myColor.secondary,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: myColor.border,
  },
  text: {
    color: myColor.text,
  },
});

export default Home;
