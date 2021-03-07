import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import colors from "../config/colors.js";

export default function FlashcardStudyScreen(props) {
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
        StudyScreen
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleSilver,
    paddingTop: "15%",
  },
  question: {
    flex: 0.5,
    justifyContent: "center",
  },
  courseEntry: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
});
