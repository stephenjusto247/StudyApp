import React from "react";
import { StyleSheet, Keyboard, Text, TouchableWithoutFeedback, View, Button, TextInput } from "react-native";

export default function Flashcards(props) {
  const [flashcardQuestion, setFlashCardQuestion] = React.useState("");
  const [flashcardAnswer, setFlashCardAnswer] = React.useState("");

  React.useEffect(()=>{
    console.log(props.route.params);
  }, []);

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
      props.navigation.navigate("FlashcardSetScreen", flashcardSet);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <Text>Question</Text>
          <TextInput
            multiline={true}
            value={flashcardQuestion}
            onChangeText={(text) => setFlashCardQuestion(text)}
          ></TextInput>
        </View>
        <View>
          <Text>Answer</Text>
          <TextInput
            multiline={true}
            value={flashcardAnswer}
            onChangeText={(text) => setFlashCardAnswer(text)}
          ></TextInput>
          <Button onPress={handleSubmit} title="Save Flash Card" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%'
  }
});
