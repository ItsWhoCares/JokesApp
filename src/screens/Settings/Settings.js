import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import myColor from "../../myColors.json";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState({
    category: "Any",
    type: "single",
    search: "",
  });
  console.log(selectedValue);
  const saveSettings = async () => {
    try {
      const jsonValue = JSON.stringify(selectedValue);
      await AsyncStorage.setItem("settings", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
    navigation.goBack();
  };

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
    getSettings().then((data) => {
      if (data) {
        setSelectedValue(data);
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.lable}>Category</Text>

        <Picker
          selectedValue={selectedValue.category}
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor={myColor.text}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue((prev) => ({ ...prev, category: itemValue }))
          }>
          <Picker.Item label="Any" value="Any" />
          <Picker.Item label="Miscellaneous" value="Misc" />
          <Picker.Item label="Coding" value="Coding" />
          <Picker.Item label="Development" value="Development" />
          <Picker.Item label="Dark" value="Dark" />
          <Picker.Item label="Pun" value="Pun" />
          <Picker.Item label="Christmas" value="Christmas" />

          <Picker.Item label="Spooky" value="Spooky" />
        </Picker>
      </View>
      <View style={styles.container}>
        <Text style={styles.lable}>Joke Type</Text>

        <Picker
          selectedValue={selectedValue.type}
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor={myColor.text}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue((prev) => ({ ...prev, type: itemValue }))
          }>
          <Picker.Item label="Single Part" value="single" />
          <Picker.Item label="Two Parts" value="twopart" />
        </Picker>
      </View>
      <View style={styles.container}>
        <Text style={styles.lable}>Search String</Text>
        <View style={styles.input}>
          <TextInput
            value={selectedValue.search}
            placeholderTextColor={myColor.text}
            onChangeText={(text) =>
              setSelectedValue((prev) => ({ ...prev, search: text }))
            }
            style={{ alignSelf: "center", color: myColor.text }}
          />
        </View>
      </View>
      <Pressable
        onPress={saveSettings}
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
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    //flex: 1,
    backgroundColor: myColor.secondary,
    alignItems: "center",
    height: "100%",
    // justifyContent: "center",
  },
  lable: {
    fontSize: 16,
    color: myColor.text,
    width: "35%",
  },
  text: {
    color: myColor.text,
  },
  container: {
    // flex: 0.1,
    height: 50,
    width: "80%",
    flexDirection: "row",
    //backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-start",
    // justifyContent: "center",
    // borderWidth: 1,
    // borderColor: myColor.border,
    // borderRadius: 10,
    // margin: 20,
  },
  picker: {
    height: 50,
    width: "65%",
    fontSize: 14,
    color: myColor.text,
    marginLeft: 10,
  },
  input: {
    height: 50,
    width: "65%",
    fontSize: 14,
    color: myColor.text,
    //backgroundColor: myColor.primary,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: myColor.border,
    borderRadius: 10,
  },
  nextBtn: {
    // flex: 0.08,
    height: 50,
    //backgroundColor: myColor.secondary,
    width: "30%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: myColor.border,
  },
});

export default Settings;
