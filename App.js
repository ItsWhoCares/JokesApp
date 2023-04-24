import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import JokeContainer from "./src/components/jokeContainer";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/components/navigation";
import myColor from "./src/myColors.json";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColor.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
