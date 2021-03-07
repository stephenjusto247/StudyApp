
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './AccountScreen.js';
import FlashcardsStack from './FlashcardsStack.js';
import CoursesStack from './CoursesStack.js';
import CoursePlannerStack from './CoursePlannerStack.js';

const Tab = createBottomTabNavigator();

export default function MainTabScreen(){
    return(
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 90,
                    display: 'flex',
                    justifyContent: 'center'
                },
                labelStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingBottom: 5
                }
            }}
        >
            <Tab.Screen
                name='Acc'
                component={AccountScreen}
                style={{
                    alignSelf: 'center'
                }}
            />
            <Tab.Screen
                name='FC'
                component={FlashcardsStack}
            />
            <Tab.Screen
                name='CS'
                component={CoursesStack}
            />
            <Tab.Screen
                name='CP'
                component={CoursePlannerStack}
            />
        </Tab.Navigator>
    );
}