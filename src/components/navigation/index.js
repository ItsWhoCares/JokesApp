import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/Home";
import myColor from "../../myColors.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Settings from "../../screens/Settings";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const navigation = useNavigation();
  const homeOptions = {
    headerStyle: {
      backgroundColor: myColor.secondary,
    },
    headerTintColor: myColor.text,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
    headerRight: () => (
      <>
        <Ionicons
          onPress={() => navigation.navigate("Settings")}
          name="settings-sharp"
          size={24}
          color={myColor.text}
        />
      </>
    ),
  };

  const settingsOptions = {
    headerStyle: {
      backgroundColor: myColor.secondary,
    },
    headerTintColor: myColor.text,
    headerShadowVisible: false,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={homeOptions} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={settingsOptions}
      />
    </Stack.Navigator>
  );
}
