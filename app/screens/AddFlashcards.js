import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import { event } from "react-native-reanimated";

export default function Flashcards(props) {
  const [flashCardGroup, setFlashCardGroup] = React.useState("");
  const [flashCardQuestion, setFlashCardQuestion] = React.useState("");
  const [flashCardAnswer, setFlashCardAnswer] = React.useState("");

  function handleSubmit() {
    if (
      flashCardGroup != "" &&
      flashCardQuestion != "" &&
      flashCardAnswer != ""
    ) {
      const flashcard = {
        groupName: flashCardGroup,
        question: flashCardQuestion,
        answer: flashCardAnswer,
      };
      props.navigation.navigate("Flashcards", flashcard);
    }
  }

  return (
    <View>
      <View>
        <Text>FlashCardGroup</Text>
        <TextInput
          value={flashCardGroup}
          onChangeText={(text) => setFlashCardGroup(text)}
        ></TextInput>
      </View>
      <View>
        <Text>Question</Text>
        <TextInput
          multiline={true}
          value={flashCardQuestion}
          onChangeText={(text) => setFlashCardQuestion(text)}
        ></TextInput>
      </View>
      <View>
        <Text>Answer</Text>
        <TextInput
          multiline={true}
          value={flashCardAnswer}
          onChangeText={(text) => setFlashCardAnswer(text)}
        ></TextInput>
        <Button onPress={handleSubmit} title="Save" />
      </View>
    </View>
  );
}
