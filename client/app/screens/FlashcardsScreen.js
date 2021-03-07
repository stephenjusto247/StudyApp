import React from "react";
import {
  StyleSheet, Text, View, Button,
  TouchableOpacity, ScrollView} from "react-native";
import colors from '../config/colors.js';

export default function FlashcardScreen(props) {
  const [flashcardSets, setFlashcardSet] = React.useState([]);
  React.useEffect(() => {
    if (props.route.params) {
      if (flashcardSets.length > 0){
        let flashcardSets_ = [...flashcardSets];
        let newFlashcardSet = true;
        const flashcardSet = {
          set: props.route.params.set,
          flashcards: props.route.params.flashcards
        };
        for (let i = 0; i < flashcardSets_.length; i++){
          if (flashcardSets_[i].set === flashcardSet.set){
            for (let j = 0; j < props.route.params.flashcards.length; j++){
              if (props.route.params.flashcards[j].new){
                flashcardSets_[i].flashcards.push({
                  question: props.route.params.flashcards[j].question,
                  answer: props.route.params.flashcards[j].answer
                });
              }
            }
            newFlashcardSet = false;
            break;
          }
        }
        if (newFlashcardSet) flashcardSets_.push(flashcardSet);
        setFlashcardSet([...flashcardSets_]);
      }
      else{
        let newFlashcardSet = {
          set: props.route.params.set,
          flashcards: props.route.params.flashcards
        }
        newFlashcardSet.flashcards.splice(0, 1);
        setFlashcardSet([newFlashcardSet]);
      }
    }
  }, [props.route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          Flashcard Groups
        </Text>
      </View>
      <ScrollView style={styles.mainSection}>
      {flashcardSets.map((flashcardSet, index) => (
          <TouchableOpacity style={styles.setBorder} key={index} onPress={()=>{props.navigation.navigate("FlashcardSetScreen", flashcardSet)}}>
            <Text style={styles.setName}>
              {flashcardSet.set}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={() => {props.navigation.navigate("FlashcardsAddSet")}}>
          <Text style={styles.createNewSet}>Create New Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSection: {
    flex: .2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: '15%'
  },
  createNewSet: {
    fontWeight: 'bold',
    fontSize: 18
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainSection: {
    flex: .8
  },
  setBorder: {
    borderColor: colors.paleSilver,
    borderWidth: 2,
    justifyContent: 'center',
    width: '100%',
    height: 45
  },
  setName: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 10
  },
});
