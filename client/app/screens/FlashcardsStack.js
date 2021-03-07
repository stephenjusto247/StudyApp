import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FlashcardsScreen from "./FlashcardsScreen.js";
import AddFlashcards from "./AddFlashcards.js";
import FlashcardStudyScreen from "./FlashcardStudyScreen.js";
import FlashcardsAddSet from "./FlashcardsAddSet.js";
import FlashcardSetScreen from "./FlashcardSetScreen.js";
import FlashcardEditScreen from './FlashcardEditScreen.js';

const Stack = createStackNavigator();

export default function FlashcardsStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Flashcards" 
        component={FlashcardsScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="AddFlashcards" 
        component={AddFlashcards} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FlashcardsAddSet" 
        component={FlashcardsAddSet} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FlashcardStudy" 
        component={FlashcardStudyScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FlashcardSetScreen" 
        component={FlashcardSetScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='FlashcardEdit'
        component={FlashcardEditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
