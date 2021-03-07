import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import colors from '../config/colors.js';

export default function FlashcardsStack(props) {
  const [test, setTest] = React.useState('l');
  const [flashcardSet, setFlashcardSet] = React.useState({});

  React.useEffect(() => {
    if (props.route.params) {
      if (props.route.params.delete){
        let flashcardSet_ = flashcardSet;
        console.log('delete----------')
        console.log(flashcardSet_);
        console.log(flashcardSet_.flashcards[props.route.params.index]);
        flashcardSet_.flashcards = [];
        console.log(flashcardSet_);
        setFlashcardSet(flashcardSet_);
        setTest('delete');
        props.route.params.delete = null;
      }
      else{
        const newFlashcard = {
          set: props.route.params.set,
          flashcards: props.route.params.flashcards
        };
        console.log('pusshing-------')
        console.log(newFlashcard);
        setFlashcardSet(newFlashcard);
        setTest('add');
      }
    }
  }, [props.route.params]);

  React.useEffect(()=>{
    console.log('new-------');
    console.log(test);
    console.log(flashcardSet);
  }, [test]);

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
        }) : <Text style={styles.empty}>It looks empty here</Text>
      }
      </ScrollView>
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.back}
          onPress={() => {
            props.navigation.navigate("Flashcards", flashcardSet);
          }}
        >
          <Text style={styles.backText}>Back</Text>
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
            props.navigation.navigate("AddFlashcards", flashcardSet);
          }}
        >
          <Text style={styles.createText}>Create</Text>
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
    flex: .3333,
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
