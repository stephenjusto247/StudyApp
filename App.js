import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen.js";
import SignupScreen from "./app/screens/SignupScreen.js";
import MainScreen from "./app/screens/MainScreen.js";
import AccountScreen from "./app/screens/AccountScreen.js";
import CoursePlannerScreen from "./app/screens/CoursePlannerScreen.js";
import CoursesScreen from "./app/screens/CoursesScreen.js";
import FlashcardsScreen from "./app/screens/FlashcardsScreen.js";
import Flashcards from "./app/screens/Flashcards.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "LoginScreen" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "SignupScreen" }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "MainScreen" }}
        />
        <Stack.Screen
          name="Flashcards"
          component={FlashcardsScreen}
          options={{ title: "FlashcardsScreen" }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ title: "AccountScreen" }}
        />
        <Stack.Screen
          name="Courses"
          component={CoursesScreen}
          options={{ title: "CoursesScreen" }}
        />
        <Stack.Screen
          name="CoursePlanner"
          component={CoursePlannerScreen}
          options={{ title: "CoursePlannerScreen" }}
        />
        <Stack.Screen
          name="FlashCards"
          component={Flashcards}
          options={{ title: "Flashcards" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
