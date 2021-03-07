import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

export default function AccountScreen( {navigation} ){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>
                    Account Details
                </Text>
            </View>

            <View style={styles.mainSection}>
                <View>
                    <Text>
                        Name
                    </Text>
                </View>
                <View>
                    <Text>
                        University Name
                    </Text>
                </View>
            </View>

            <View style={styles.logout}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {navigation.navigate('LoginScreen')}}
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
      backgroundColor: '#fff'
    },
    header: {
        flex: .10,
        alignSelf: 'center',
        paddingTop: '15%',
    },
    mainSection: {
        flex: .70,
        alignSelf: 'center',
    },
    logout: {
        flex: .05,
        alignSelf: 'center',
    },

    titleText: {
        color: 'black',
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
        color: colors.dimGray,
    },
});