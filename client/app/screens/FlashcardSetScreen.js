import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";

export default function FlashcardsStack(props) {
  const [flashcards, setFlashcards] = React.useState([]);
  React.useEffect(() => {
    //console.log(props.route.params);
    if (props.route.params) {
      let flashcards_ = [...flashcards];
      const newFlashcard = {
        question: props.route.params.question,
        answer: props.route.params.answer,
      };
      flashcards_.push(newFlashcard);
      setFlashcards([...flashcards_]);
    }
  }, [props.route.params]);
  return (
    <View>
      <Text>
        SetScreen
        {flashcards.map((entry, index) => (
          <TouchableOpacity key={index}>
            <View>
              <Text>{entry.question}</Text>
            </View>
            <View>
              <Text>{entry.answer}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Text>
      <Button
        title="MakeFlashCards"
        onPress={() => {
          props.navigation.navigate("AddFlashcards");
        }}
      />
      <Button
        title="Study"
        onPress={() => {
          props.navigation.navigate("FlashcardStudy", flashcards);
        }}
      />
    </View>
  );
}
