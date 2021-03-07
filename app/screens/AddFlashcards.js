import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function Flashcards(props) {
  const [flashcardQuestion, setFlashCardQuestion] = React.useState("");
  const [flashcardAnswer, setFlashCardAnswer] = React.useState("");

  function handleSubmit() {
    if (flashcardAnswer != "" && flashcardQuestion != "") {
      const newFlashcard = {
        question: flashcardQuestion,
        answer: flashcardAnswer,
      };
      props.navigation.navigate("FlashcardSetScreen", newFlashcard);
    }
  }

  return (
    <View>
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
  );
}
