import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Screen1 = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      { name: "state", id: 1 }, 
      { name: "state2", id: 2 }, 
      { name: "state3", id: 3 }
    ]);
  }, []);

  const deleteTask = (id) => {
    re_tasks = tasks.filter(task => task.id !== id);
    setTasks(re_tasks);
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
                <View 
                  style={styles.check_box}
                >
                  <Text></Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })
      }
      <Button
        title="Screen2"
        onPress={() => navigation.navigate("Screen2")}
      />
    </View>
  );
};

export {
  Screen1
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  task_wrapper: {
    width: "90%",
    height: 60,
    borderBottomColor: "gray",
    borderBottomWidth: 3,
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
  }
});
