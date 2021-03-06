import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen.js';
import SignupScreen from './app/screens/SignupScreen.js';
import MainScreen from './app/screens/MainScreen.js';
import AccountScreen from './app/screens/AccountScreen.js';
import CoursePlannerScreen from './app/screens/CoursePlannerScreen.js';
import CoursesScreen from './app/screens/CoursesScreen.js';
import FlashcardsScreen from './app/screens/FlashcardsScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen 
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen 
          name="Flashcards"
          component={FlashcardsScreen}
        />
        <Stack.Screen 
          name="Account"
          component={AccountScreen}
        />
        <Stack.Screen 
          name="Courses"
          component={CoursesScreen}
        />
        <Stack.Screen 
          name="CoursePlanner"
          component={CoursePlannerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}