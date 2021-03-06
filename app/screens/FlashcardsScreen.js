import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function FlashcardScreen( {navigation} ){
    return(
        <View style={styles.container}>
            <Button 
                title="Acc"
                onPress={() => {
                    navigation.navigate('Account')
                }}
            />
            <Button title="FC"/>
            <Button 
                title="CS"
                onPress={() => {
                    navigation.navigate('Courses')
                }}
            />
            <Button 
                title="CP"
                onPress={() => {
                    navigation.navigate('CoursePlanner')
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