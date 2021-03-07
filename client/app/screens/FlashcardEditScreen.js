import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, 
        TextInput, Keyboard, TouchableWithoutFeedback, 
        ScrollView, Dimensions } from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../config/colors.js';

export default function FlashcardEditScreen(props){
    const [dialogVisibility, setDialogVisiblity] = useState(false);
    const [editVisibility, setEditVisibility] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(()=>{
        if (props.route.params){
            setQuestion(props.route.params.question);
            setAnswer(props.route.params.answer);
        }
    }, [props.route.params]);

    function hideDialog(){
        setDialogVisiblity(false);
    }

    function hideEdit(){
        setEditVisiblity(false);
    }

    function handleDelete(){
        setDialogVisiblity(false);
        props.navigation.navigate('FlashcardSetScreen', {
            index: props.route.params.index,
            delete: true,
            edit: false,
            add: false,
            initial: false
        });
    }

    function handleEdit(){
        setEditVisibility(false);
        props.navigation.navigate('FlashcardSetScreen', {
            index: props.route.params.index,
            question: question,
            answer: answer,
            edit:  true,
            delete: false,
            add: false,
            initial: false
        });
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.header}>Edit Flashcard</Text>
                </View>
                <ScrollView style={styles.mainSection}>
                    <View style={styles.flashcard}>
                        <View style={styles.flashcardQuestion}>
                            <Text style={styles.label}>Question</Text>
                            <TextInput 
                                style={styles.textInput}
                                onChangeText={text => setQuestion(text)}
                                value={question}
                                autoCorrect={false}
                                keyboardAppearance='dark'
                                textContentType='none'
                                multiline={true}
                            />
                        </View>
                        <View style={styles.flashcardAnswer}>
                            <Text style={styles.label}>Answer</Text>
                            <TextInput 
                                style={styles.textInput}
                                onChangeText={text => setAnswer(text)}
                                value={answer}
                                autoCorrect={false}
                                keyboardAppearance='dark'
                                textContentType='none'
                                multiline={true}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomSection}>
                    <TouchableOpacity style={styles.cancel} onPress={()=>{
                        props.navigation.navigate('FlashcardSetScreen')
                    }}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.edit} onPress={() => {
                        setEditVisibility(true);
                    }}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={()=>{
                        setDialogVisiblity(true);
                    }}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <Dialog.Container visible={dialogVisibility}>
                    <Dialog.Title>Delete Flashcard</Dialog.Title>
                    <Dialog.Description>Are you sure you want to delete this flashcard?</Dialog.Description>
                    <Dialog.Button label={'Cancel'} onPress={hideDialog}/>
                    <Dialog.Button label={'Delete'} onPress={handleDelete}/>
                </Dialog.Container>
                <Dialog.Container visible={editVisibility}>
                    <Dialog.Title>Edit Flashcard</Dialog.Title>
                    <Dialog.Description>Are you sure you want to edit this flashcard?</Dialog.Description>
                    <Dialog.Button label={'Cancel'} onPress={hideEdit}/>
                    <Dialog.Button label={'Edit'} onPress={handleEdit}/>
                </Dialog.Container>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    bottomSection: {
        flex: .3333,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
        borderColor: colors.red,
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
        color: colors.red
    },
    edit: {
        alignItems: 'center',
        borderColor: colors.paleSilver,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        height: 45,
        width: 100
    },
    editText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.paleSilver
    },
    flashcard: {
        flexDirection: 'row'
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
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    mainSection: {
        flex: .3333
    },
    textInput: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width / 2,
        borderColor: colors.dimGray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10
    }
});