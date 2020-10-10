import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Screen2 = ({ navigation }) => {
  const Header = () => {
    return (
      <TouchableOpacity
        style={styles.header_wrapper}
        onPress={() => navigation.navigate("ToDo")}
      >
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text>Screen2!</Text>
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
  }
});
