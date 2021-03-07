import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoursesScreen from './CoursesScreen.js';
import EditCourses from './EditCourses';

const Stack = createStackNavigator();

export default function CourseScreenStack( {navigation} ){

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
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}