import React, { useState, useEffect } from 'react';
import { Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity,
Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-community/async-storage';

const Screen1 = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let keys = []
    let datas = [] 
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      console.log(e);
    }

    try {
      for(key in keys) {
        let return_value;
        try {
          const value = await AsyncStorage.getItem(key)
          return_value = value != null ? value : null;
        } catch(e) {
          console.log(e);
        }
        if(return_value !== null) {
          datas.push({ name: return_value, id: key });
        }
      }
      setTasks(datas);
    } catch(e) {
      console.log(e);
    }
  }
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(str(key), value)
    } catch (e) {
      console.log(e);
    }
  };
  
  const deleteTask = (id) => {
    const re_tasks = tasks.filter(task => task.id !== id);
    setTasks(re_tasks);
  };

  const textChange = (text) => {
    setNewTask(text);
  };

  const addTask = () => {
    if(tasks.length > 0) {
      let array = [ ...tasks ];
      const latest_id = array[array.length - 1]["id"] + 1;
      array.push({ name: newTask, id: latest_id});
      setTasks(array);
      storeData(latest_id, newTask);
    } else {
      let array = [{ name: newTask, id: 0 }];
      setTasks(array);
      storeData(0, newTask);
    }
    setNewTask("");
    Keyboard.dismiss();
  };

  const RenderList = () => {
    return (
      tasks.map(task => {
        return (
          <View key={task.id} style={styles.task_wrapper}>
            <Text style={styles.task_text}>{task.name}</Text>
            <TouchableOpacity
              style={styles.check_wrapper}
              onPress={() => deleteTask(task.id)}
            >
              <Image 
                style={styles.check_img}
                source={require('../assets/close.png')} 
              />
            </TouchableOpacity>
          </View>
        );
      })
    );
  };
  
  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("ADD")}
      >
        <Text style={styles.header_text}>ADD</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <RenderList />
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={(e) => textChange(e)}
      />
      <TouchableOpacity
        style={styles.button_wrapper}
        onPress={() => addTask()}
      >
        <Text style={styles.button_text}>ADD</Text>
      </TouchableOpacity>
      {/*<Button
        title="Screen2"
        onPress={() => navigation.navigate("Screen2")}
      />*/}
    </View>
  );
};

export {
  Screen1
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
  task_wrapper: {
    width: "90%",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  task_text: {
    fontSize: 25,
    lineHeight: 60,
  },
  check_wrapper: {
    height: 58,
    width: "15%",
  },
  check_box: {
    height: 58,
    width: "100%",
    backgroundColor: "red"
  },
  check_img: {
    margin: 9,
    height: 40,
    width: 40
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
  }
});
