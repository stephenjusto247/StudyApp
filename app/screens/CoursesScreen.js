import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CoursesScreen( props ){
    return(
        <View style={styles.container}>
            <Button title='Edit' onPress={props.navigation.navigate('EditCourses')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
});