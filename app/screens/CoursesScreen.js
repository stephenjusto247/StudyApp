import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CoursesScreen( {navigation} ){
    return(
        <View style={styles.container}>
            <Button 
                title="Acc"
                onPress={() => {
                    navigation.navigate('Account')
                }}
            />
            <Button 
                title="FC"
                onPress={() => {
                    navigation.navigate('Flashcards')
                }}
            />
            <Button title="CS"/>
             <Button 
                title="CP"
                onPress={() => {
                    navigation.navigate('CoursePlanner')
                }}
            />

            <Button
                title="Add Class"
                onPress={() => {
                    navigation.navigate('EditCourses')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
      bottom: 50
    },
});