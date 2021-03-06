import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen( {navigation} ){
    return(
        <View style={styles.container}>
            <Text>SignUpScreen</Text>
            <Text onPress={()=>{navigation.navigate('Login')}}>Back</Text>
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