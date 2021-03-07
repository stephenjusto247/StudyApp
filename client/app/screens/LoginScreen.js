import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LoginScreen( {navigation} ){
    return(
        <View style={styles.container}>
            <Button 
                title="Login"
                onPress={() => {
                    navigation.navigate('Main')
                }}
            />
            <Button 
                title="Signup"
                onPress={() => {
                    navigation.navigate('Signup')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});