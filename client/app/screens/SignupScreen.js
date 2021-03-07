import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
        StyleSheet, Text, View, TouchableOpacity, 
        TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../config/colors.js';

export default function SignUpScreen( {navigation} ){
    const [fullNameInput, setFullNameInput] = React.useState('');
    const [universityNameInput, setUniversityNameInput] = React.useState('');
    const [emailInput, setemailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');

    async function handleSubmit(){
        await fetch('https://sfhacks-studying-app.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: fullNameInput,
                email: emailInput,
                password: passwordInput
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                if(data.message) console.log(data.message);
                else if(data.token){
                    await AsyncStorage.setItem('token', data.token);
                    navigation.navigate('Main');
                }
            })
            .catch(e => {
                console.log("error: ", e.message);
            });
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.title}>StudyApp</Text>
                </View>
                <View style={styles.middleSection}>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setFullNameInput(text)}
                        value={fullNameInput}
                        autoCompleteType='name'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='Full Name'
                        textContentType='none'
                    />
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setUniversityNameInput(text)}
                        value={universityNameInput}
                        autoCompleteType='name'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='University Name'
                        textContentType='none'
                    />
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setemailInput(text)}
                        value={emailInput}
                        autoCompleteType='email'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='email'
                        textContentType='emailAddress'
                    />
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={text => setPasswordInput(text)}
                        value={passwordInput}
                        autoCompleteType='password'
                        autoCorrect={false}
                        keyboardAppearance='dark'
                        placeholder='Password'
                        secureTextEntry={true}
                        textContentType='password'
                    />
                    <TouchableOpacity style={styles.signUpButton} onPress={()=>{handleSubmit()}}>
                        <Text style={styles.signUpButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomSection}>
                    <LinearGradient start={{x: .5, y: 1}} end={{x: .5, y: 0}} colors={['#c7a9c2', '#fff']} style={styles.linearGradient}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({ 
    bottomSection: {
        flex: .3333,
        alignItems: 'center'
    },
    cancelText: {
        color: colors.paleSilver,
        fontWeight: 'bold'
    },  
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    headerSection: {
        flex: .3333,
        alignItems: 'center',
        borderBottomColor: colors.black,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    }, 
    middleSection: {
        flex: .3333,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        alignItems: 'center',
        borderColor: colors.paleSilver,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        height: 45,
        width: 300
    },
    signUpButtonText: {
        color: colors.paleSilver,
        fontWeight: 'bold'
    },
    textInput: {
        height: 45,
        width: 300,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    title: {
        paddingTop: '40%',
        fontSize: 35,
        fontWeight: 'bold'
    }
});