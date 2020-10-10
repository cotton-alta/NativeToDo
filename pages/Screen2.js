import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TaskContext } from "../App";

const Screen2 = ({ navigation }) => {
  const [newTask, setNewTask] = useState("");
  const [alert, setAlert] = useState(false);
  const { stateTask, dispatch } = useContext(TaskContext);
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(String(key), value);
      dispatch({
        type: "add",
        payload: {
          id: String(key),
          name: value
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getLatestKey = async () => { 
    let keys = await AsyncStorage.getAllKeys();
    if(keys.length > 0) {
      keys = keys.map(key => parseInt(key)).sort((a, b) => a - b);
    } else {
      keys = null;
    }
    if(keys !== null) {
      return keys[keys.length - 1];
    } else {
      return 0;
    }
  };

  const addTask = () => {
    if(newTask.length > 15) {
      setAlert(true);
    }
    if(getLatestKey !== null) {
      getLatestKey().then(key => {
        const latest_id = parseInt(key) + 1;
        storeData(latest_id, newTask);
      })
    } else {
      storeData(0, newTask);
    }
    setNewTask("");
    Keyboard.dismiss();
  };

  const textChange = (text) => {
    if(text.length > 15) return;
    setNewTask(text);
  };

  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("ToDo")}
      >
        <Text style={styles.header_text}>BACK</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={(e) => textChange(e)}
      />
      <Text style={styles.alert_box}>10文字以内で入力してください。</Text>
      <TouchableOpacity
        style={styles.button_wrapper}
        onPress={() => addTask()}
      >
        <Text style={styles.button_text}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export {
  Screen2
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header_wrapper: {
    width: "100%",
    height: 100,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  header_text: { 
    width: "20%",
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    lineHeight: 50,
    fontSize: 25,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
    borderRadius: 5
  },
  button_wrapper: {
    backgroundColor: "gray",
    height: 50,
    width: "50%",
    borderRadius: 5
  },
  button_text: {
    lineHeight: 50,
    height: 50,
    width: "100%",
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  },
  alert_box: {
    color: "red",
    width: "100%",
    height: 40,
    lineHeight: 40,
    fontSize: 20,
    textAlign: "center"
  }
});
