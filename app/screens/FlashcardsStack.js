import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FlashcardsScreen from "./FlashcardsScreen.js";
import AddFlashcards from "./AddFlashcards.js";
import FlashcardStudyScreen from "./FlashcardStudyScreen.js";
import FlashcardsAddSet from "./FlashcardsAddSet.js";
import FlashcardSetScreen from "./FlashcardSetScreen.js";

const Stack = createStackNavigator();

export default function FlashcardsStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
      <Stack.Screen name="AddFlashcards" component={AddFlashcards} />
      <Stack.Screen name="FlashcardsAddSet" component={FlashcardsAddSet} />
      <Stack.Screen name="FlashcardStudy" component={FlashcardStudyScreen} />
      <Stack.Screen name="FlashcardSetScreen" component={FlashcardSetScreen} />
    </Stack.Navigator>
  );
}
