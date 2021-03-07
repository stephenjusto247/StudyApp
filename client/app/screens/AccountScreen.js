import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

export default function AccountScreen( {navigation} ){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function fetchData() {
            const token = await AsyncStorage.getItem('token');
            await fetch('https://sfhacks-studying-app.herokuapp.com/auth/get-account-details', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(async (data) => {
                    if(data.message) console.log(data.message);
                    else if(data.name && data.email){
                        setName(data.name);
                        setEmail(data.email);
                    }
                })
                .catch(e => {
                    console.log("error: ", e.message);
                });
        }
            fetchData();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>
                    Account Details
                </Text>
            </View>

            <View style={styles.mainSection}>
                <View>
                    <Text style={styles.main}>
                        Name: {name}
                    </Text>
                </View>
                <View>
                    <Text style={styles.main}>
                        Email: {email}
                    </Text>
                </View>
            </View>

            <View style={styles.logout}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={styles.button}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: '15%'
    },
    header: {
        flex: .3333,
        alignSelf: 'center',
        paddingTop: '15%',
    },
    main: {
        fontWeight: 'bold',
        fontSize: 18
    },
    mainSection: {
        flex: .3333,
        alignSelf: 'center',
    },
    logout: {
        flex: .3333,
        alignSelf: 'center'
    },
    titleText: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 30,
    },
    logoutButton: {
        alignItems: 'center',
        borderColor: colors.paleSilver,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        height: 45,
        width: 200
    },
    button: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.paleSilver,
    },
});