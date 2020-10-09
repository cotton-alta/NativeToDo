import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDorawerNavigator } from "react-navigation";

import Screen1 from "./pages/Screen1.tsx";
import Screen2 from "./pages/Screen2.tsx";

const Stack = createStackNavigator(
  {
    Stack1: { screen: Screen1 },
    Stack2: { screen: Screen2 }
  },
  {
    initialRouteName: "Screen1"
  }
);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Stack1!</Text>
      <StatusBar style="auto" />
    </View>
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
