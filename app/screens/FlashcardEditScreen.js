import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors.js';

export default function FlashcardEditScreen(props){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.header}>Edit Flashcard</Text>
                </View>
                <View style={styles.mainSection}>

                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.cancel} onPress={()=>{
                        props.navigation.navigate('FlashcardSetScreen')
                    }}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    bottomSection: {
        flex: .3333,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cancel: {
        alignItems: 'center',
        borderColor: colors.paleSilver,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        height: 45,
        width: 100,
        marginLeft: 10
    },
    cancelText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.paleSilver
    },
    container: {
        flex: 1,
        paddingTop: '15%'
    },
    delete: {
        alignItems: 'center',
        borderColor: colors.paleSilver,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        height: 45,
        width: 100,
        marginRight: 10
    },
    deleteText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.paleSilver
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30
    },
    headerSection: {
        flex: .3333,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainSection: {
        flex: .3333
    }
});