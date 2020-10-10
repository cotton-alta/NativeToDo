import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { taskAction } from "./actions/task";
import { Screen1 } from "./pages/Screen1";
import { Screen2 } from "./pages/Screen2";

const Stack = createStackNavigator();

const TaskContext = React.createContext(null);

export default function App() {
  const [stateTask, dispatch] = useReducer(taskAction, []);
  const value = { stateTask, dispatch };

  return (
    <TaskContext.Provider value={value}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ToDo"
          component={ Screen1 }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ADD"
          component={ Screen2 }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </TaskContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  TaskContext
}


