import React, { useState, useEffect } from 'react';
import { Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Screen1 = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks([
      { name: "state", id: 1 }, 
      { name: "state2", id: 2 }, 
      { name: "state3", id: 3 }
    ]);
  }, []);

  const deleteTask = (id) => {
    const re_tasks = tasks.filter(task => task.id !== id);
    setTasks(re_tasks);
  };

  const textChange = (text) => {
    setNewTask(text);
  };

  const addTask = () => {
    let array = [ ...tasks ];
    const new_tasks = array.push({ name: newTask, id: array.length + 1});
    setTasks(array);
  };

  return (
    <View style={styles.container}>
      {
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
          )
        })
      }
      <TextInput
        style={styles.input}
        value={newTask}
        onChangeText={(e) => textChange(e)}
      />
      <TouchableOpacity
        style={styles.button_wrapper}
        onPress={() => addTask()}
      >
        <Text style={styles.button_text}>追加</Text>
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
