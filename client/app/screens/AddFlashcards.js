import React from "react";
import { StyleSheet, Dimensions, Keyboard, Text, TouchableWithoutFeedback, View, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from '../config/colors.js';

export default function Flashcards(props) {
  const [flashcardQuestion, setFlashCardQuestion] = React.useState("");
  const [flashcardAnswer, setFlashCardAnswer] = React.useState("");

  function handleSubmit() {
    if (flashcardAnswer != "" && flashcardQuestion != "") {
      let flashcards = [];
      let flashcardSet = {
        set: props.route.params.set
      }
      if (Array.isArray(props.route.params.flashcards)) flashcards = [...props.route.params.flashcards];
      const newFlashcard = {
        question: flashcardQuestion,
        answer: flashcardAnswer,
        new: true
      };
      flashcards.push(newFlashcard);
      flashcardSet.flashcards = flashcards;
      console.log('adding: ');
      console.log(flashcards);
      props.navigation.navigate("FlashcardSetScreen", flashcardSet);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.header}>Add Flashcard</Text>
        </View>
        <View style={styles.flashcard}>
          <View style={styles.flashcardQuestion}>
            <Text style={styles.label}>Question</Text>
            <TextInput
              multiline={true}
              value={flashcardQuestion}
              onChangeText={(text) => setFlashCardQuestion(text)}
              style={styles.textInput}
              autoCorrect={false}
              keyboardAppearance='dark'
              textContentType='none'
            />
          </View>
          <View style={styles.flashcardAnswer}>
            <Text style={styles.label}>Answer</Text>
            <TextInput
              multiline={true}
              value={flashcardAnswer}
              onChangeText={(text) => setFlashCardAnswer(text)}
              style={styles.textInput}
              autoCorrect={false}
              keyboardAppearance='dark'
              textContentType='none'
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelBorder} onPress={()=>props.navigation.navigate('FlashcardSetScreen')}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBorder} onPress={handleSubmit}>
            <Text style={styles.save}>Save Flash Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cancelBorder: {
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
  cancel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  container: {
    flex: 1,
    paddingTop: '15%'
  },
  buttons: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flashcard: {
    flex: .45,
    flexDirection: 'row'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  },
  headerSection: {
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  save: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  saveBorder: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 150,
    marginRight: 10
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
