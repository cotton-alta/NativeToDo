import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity,
Keyboard } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-community/async-storage';
import { TaskContext } from "../App";

const Screen1 = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const { stateTask, dispatch } = useContext(TaskContext);

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
      dispatch({
        type: "init",
        payload: datas
      });
    } catch(e) {
      console.log(e);
    }
  };
  
  const deleteTask = async (id) => {
    const re_tasks = stateTask.filter(task => task.id !== id);
    try {
      await AsyncStorage.removeItem(String(id))
      dispatch({
        type: "delete",
        payload: re_tasks
      });
    } catch(e) {
      console.log(e);
    }
  };

  const RenderList = () => {
    return (
      stateTask.map(task => {
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
      <ScrollView style={styles.scroll_container}>
        <RenderList />
      </ScrollView>
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
    justifyContent: "center"
  },
  scroll_container: {
    width: "90%",
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
    width: "100%",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  task_text: {
    fontSize: 20,
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
  }
});
