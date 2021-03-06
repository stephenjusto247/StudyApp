
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './AccountScreen.js';
import FlashcardsScreen from './FlashcardsScreen.js';
import CoursesScreen from './CoursesScreen.js';
import CoursePlannerScreen from './CoursePlannerScreen.js';
import CoursePlannerStack from './CoursePlannerStack.js';

const Tab = createBottomTabNavigator();

export default function MainScreen(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name='Acc'
                component={AccountScreen}
            />
            <Tab.Screen
                name='FC'
                component={FlashcardsScreen}
            />
            <Tab.Screen
                name='CS'
                component={CoursesScreen}
            />
            <Tab.Screen
                name='CP'
                component={CoursePlannerStack}
            />
        </Tab.Navigator>
    );
}