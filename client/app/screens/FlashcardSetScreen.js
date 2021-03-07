import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import colors from '../config/colors.js';

export default function FlashcardsStack(props) {
  const [lastAction, setLastAction] = useState('initial');
  const [flashcardSet, setFlashcardSet_] = useState({});
  const flashcardSetRef = useRef(flashcardSet);
  const setFlashcardSet = (data) => {
    flashcardSetRef.current = data;
    setFlashcardSet_(data);
  }

  useEffect(() => {
    //console.log('in effect: ');
    //console.log(props.route.params);
    if (props.route.params) {
      if (props.route.params.delete){
        setFlashcardSet({
          flashcards : flashcardSet.flashcards.filter((flashcard, index) => index !== props.route.params.index),
          set: flashcardSet.set
        });
        setLastAction('delete');
      }
      else if (props.route.params.edit){
        let flashcards_ = flashcardSet.flashcards;
        flashcards_[props.route.params.index] = {
          answer: props.route.params.answer,
          question: props.route.params.question
        };
        setFlashcardSet({flashcards: flashcards_, set: flashcardSet.set});
        setLastAction('edit');
      }
      else{
        const newFlashcard = {
          set: props.route.params.set,
          flashcards: props.route.params.flashcards
        };
        setFlashcardSet(newFlashcard);
        setLastAction('add');
      }
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
      {(flashcardSetRef.current.flashcards !== undefined) ? 
        flashcardSetRef.current.flashcards.map((entry, index) =>{
            return(
              <TouchableOpacity key={index} onPress={()=>
                props.navigation.navigate('FlashcardEdit', {
                  question: entry.question, 
                  answer: entry.answer,
                  set: flashcardSet.set,
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
        }) : <Text style={styles.empty}>It looks empty here</Text>
      }
      </ScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.back}
          onPress={() => {
            props.navigation.navigate("Flashcards", {
              set: flashcardSet.set,
              flashcards: flashcardSet.flashcards,
              lastAction: lastAction,
              deleteSet: false
            });
          }}
        >
        {props.route.params.initial ?  <Text style={styles.backText}>Back</Text>
        : <Text style={styles.backText}>Save</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.study}
          onPress={() => {
            props.navigation.navigate("FlashcardStudy", flashcardSet);
          }}
        >
          <Text style={styles.studyText}>Study</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.create}
          onPress={() => {
            props.navigation.navigate("AddFlashcards", {
              flashcards: flashcardSet.flashcards,
              set: flashcardSet.set,
              deleteSet: false
            });
          }}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deleteSection}>
        <TouchableOpacity 
          style={styles.delete}
          onPress={() => {
            props.navigation.navigate('Flashcards', {
              setIndex: props.route.params.setIndex,
              deleteSet: true
          })
        }}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 100
  },
  backText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  bottomSection: {
    flex: .16665,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  container: {
    flex: 1,
    paddingTop: '15%'
  },
  create:{
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 100
  },
  createText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  delete:{
    alignItems: 'center',
    borderColor: colors.red,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 100
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.red
  },
  deleteSection: {
    flex: .16665,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  empty: {
    fontSize: 16,
    alignSelf: 'center'
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
  },
  study: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 100
  },
  studyText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  }
});