
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './AccountScreen.js';
import FlashcardsStack from './FlashcardsStack.js';
import CourseScreenStack from './CourseScreenStack.js';
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
                component={FlashcardsStack}
            />
            <Tab.Screen
                name='CS'
                component={CourseScreenStack}
            />
            <Tab.Screen
                name='CP'
                component={CoursePlannerStack}
            />
        </Tab.Navigator>
    );
}