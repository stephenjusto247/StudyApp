import React from "react";
import { Text, View, Button, TextInput } from "react-native";

export default function FlashcardScreen(props) {
  const [flashcardSet, setFlashCardSet] = React.useState("");

  function handleSubmit() {
    if (flashcardSet != "") {
      const newFlashcardSet = {
        set: flashcardSet,
      };
      props.navigation.navigate("Flashcards", newFlashcardSet);
    }
  }
  return (
    <View>
      <View>
        <Text>FlashCardSet</Text>
        <TextInput
          multiline={true}
          value={flashcardSet}
          onChangeText={(text) => setFlashCardSet(text)}
        ></TextInput>
      </View>
      <Button onPress={handleSubmit} title="Save"></Button>
    </View>
  );
}
