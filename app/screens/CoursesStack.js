import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoursesScreen from './CoursesScreen.js';
import EditCourses from './EditCourses.js';

const Stack = createStackNavigator();

export default function CoursesStack( props ){

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='CoursesScreen'
                component={CoursesScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='EditCourses'
                component={EditCourses}
            />
        </Stack.Navigator>
    )
}