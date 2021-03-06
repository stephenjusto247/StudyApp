import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FlashcardsScreen from './FlashcardsScreen.js';
import AddFlashcards from './AddFlashcards.js';

const Stack = createStackNavigator();

export default function FlashcardsStack( {navigation} ){

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Flashcards'
                component={FlashcardsScreen}
            />
            <Stack.Screen 
                name='AddFlashcards'
                component={AddFlashcards}
            />
        </Stack.Navigator>
    )
}