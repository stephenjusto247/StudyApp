import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoursePlannerScreen from './CoursePlannerScreen.js';
import CoursePlannerAddScreen from './CoursePlannerAddScreen';

const Stack = createStackNavigator();

export default function CoursePlannerStack( {navigation} ){

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='CoursePlanner'
                component={CoursePlannerScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='CoursePlannerAdd'
                component={CoursePlannerAddScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}