import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MyStack from "./src/components/navigation";
import myColor from "./src/myColors.json";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MyStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColor.secondary,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
