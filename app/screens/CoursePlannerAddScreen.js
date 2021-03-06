import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors.js';

export default function CoursePlannerAddScreen( {navigation} ){
    const [courseNumberInput, setCourseNumberInput] = React.useState('');
    const [courseNameInput, setCourseNameInput] = React.useState('');
    const [courseUnitsInput, setCourseUnitsInput] = React.useState('');

    function handleSubmit(){
        if (courseNumberInput !== '' && courseNameInput !== '' && courseUnitsInput !== ''){
            const courseEntry = {
                name: courseNameInput,
                number: courseNumberInput,
                units: courseUnitsInput
            }
            navigation.navigate('CoursePlanner', courseEntry);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <Text style={styles.header}>Course Planner</Text>
            </View>
            <View style={styles.mainSection}>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text => setCourseNameInput(text)}
                    value={courseNameInput}
                    autoCorrect={false}
                    keyboardAppearance='dark'
                    placeholder='Course name'
                />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text => setCourseNumberInput(text)}
                    value={courseNumberInput}
                    autoCorrect={false}
                    keyboardAppearance='dark'
                    placeholder='Course number'
                />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={text => setCourseUnitsInput(text)}
                    value={courseUnitsInput}
                    autoCorrect={false}
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                    placeholder='Units'
                />
                <View style={styles.buttons}>
                    <TouchableOpacity>
                        <Text onPress={()=>{navigation.navigate('CoursePlanner')}}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text onPress={handleSubmit}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
           

        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: '15%'
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
    textInput: {
        height: 45,
        width: 300,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    mainSection: {
        flex: .6666,
        alignItems: 'center'
    }
});