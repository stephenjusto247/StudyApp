import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CoursePlannerScreen( {navigation} ){
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
            <Button 
                title="CS"
                onPress={() => {
                    navigation.navigate('Courses')
                }}
            />
            <Button title="CP"/>
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