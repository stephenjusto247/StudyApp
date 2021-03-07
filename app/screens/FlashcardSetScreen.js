import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import colors from '../config/colors.js';

export default function FlashcardsStack(props) {
  const [flashcardSet, setFlashcardSet] = React.useState({});
  React.useEffect(() => {
    if (props.route.params) {
      const newFlashcard = {
        set: props.route.params.set,
        flashcards: props.route.params.flashcards
      };
      console.log(newFlashcard);
      setFlashcardSet({...newFlashcard});
    }
  }, [props.route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          {flashcardSet.set}
        </Text>
      </View> 
      <ScrollView style={styles.mainSection}>
      {(flashcardSet.flashcards !== undefined) ? 
        flashcardSet.flashcards.map((entry, index) =>{
          if (entry !== undefined){
            return(
              <TouchableOpacity key={index} onPress={()=>
                props.navigation.navigate('FlashcardEdit', {
                  question: entry.question, 
                  answer: entry.answer,
                  index: index})}
              >
                <View style={styles.flashcard}>
                  <View style={styles.flashcardQuestion}>
                      <Text style={styles.flashcardQuestionText}>{entry.question}</Text>
                  </View>
                  <View style={styles.flashcardAnswer}>
                      <Text style={styles.flashcardAnswerText}>{entry.answer}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          } 
          else return(
            <Text>It looks empty here</Text>
          )
        }) : <Text>Empty</Text>
      }
      </ScrollView>
      <View style={styles.bottomSection}>
        <Button
          title="MakeFlashCards"
          onPress={() => {
            props.navigation.navigate("AddFlashcards", flashcardSet);
          }}
        />
        <Button
          title="Study"
          onPress={() => {
            props.navigation.navigate("FlashcardStudy", flashcardSet);
          }}
        />
        <Button
          title="Back"
          onPress={() => {
            props.navigation.navigate("Flashcards", flashcardSet);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%'
  },
  bottomSection: {
    flex: .3333
  },
  flashcard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  flashcardAnswer: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 1
  },
  flashcardAnswerText: {
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10
  },
  flashcardQuestion: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  flashcardQuestionText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 5
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
  mainSection: {
    flex: .3333
  }
});
