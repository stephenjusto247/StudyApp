import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet, Text, View,
  TouchableOpacity, ScrollView} from "react-native";
import colors from '../config/colors.js';

export default function FlashcardScreen(props) {
  const [flashcardSets, setFlashcardSets_] = useState([]);
  const flashcardSetsRef = useRef(flashcardSets);
  const setFlashcardSets = (data) => {
    flashcardSetsRef.current = data;
    setFlashcardSets_(data);
  }

  useEffect(()=>{
    readData();
  }, []);

  useEffect(() => {
    if (props.route.params) {
      if (props.route.params.deleteSet){
        if (flashcardSets.length > 0){
          setFlashcardSets(flashcardSets.filter((flashcardSet, index) => index !== props.route.params.setIndex));
          storeData(flashcardSetsRef.current);
        }
        else{
          const flashcardSet = []
          setFlashcardSets(flashcardSet);
          storeData(flashcardSet);
        }
      }
      else if(props.route.params.lastAction === 'edit' || props.route.params.lastAction === 'delete'){
        let flashcardSets_ = [...flashcardSets];
        for (let i = 0; i < flashcardSets_.length; i++){
          if (flashcardSets_[i].name === props.route.params.name){
            flashcardSets_[i].flashcards = props.route.params.flashcards;
            break;
          }
        }
        setFlashcardSets(flashcardSets_);
        storeData(flashcardSets_);
      }
      else{
        if (flashcardSets.length > 0){
          let index = 0;
          let flashcardSets_ = [...flashcardSets];
          let newFlashcardSet = true;
          const flashcardSet = {
            name: props.route.params.name,
            flashcards: props.route.params.flashcards
          };
          for (let i = 0; i < flashcardSets_.length; i++){
            index = i;
            if (flashcardSets_[i].name === flashcardSet.name){
              flashcardSets_[i].flashcards = props.route.params.flashcards;
              newFlashcardSet = false;
              break;
            }
          }
          if (newFlashcardSet) {
            flashcardSet.flashcards = [];
            flashcardSets_.push(flashcardSet);
          }
          setFlashcardSets([...flashcardSets_]);
          storeData(flashcardSetsRef.current);
        }
        else{
          let newFlashcardSet = {
            name: props.route.params.name,
            flashcards: props.route.params.flashcards,
            index: 0
          }
          newFlashcardSet.flashcards = [];
          setFlashcardSets([newFlashcardSet]);
          storeData([newFlashcardSet]);
        }
      }
    }
  }, [props.route.params]);

  async function storeData(value){
    try{
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem('flashcardsScreen', serializedValue);
    } catch(e){
      console.log(e);
    }
  }

  async function readData(){
    let data;
    try{
      data = await AsyncStorage.getItem('flashcardsScreen');
    } catch(e){
      console.log(e);
    }
    if (data !== null){
      try{
        data = JSON.parse(data);
        if (Array.isArray(data)) setFlashcardSets([...data]);
        else setFlashcardSets([data]);
      } catch(e){
        console.log(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          Flashcard Groups
        </Text>
      </View>
      <ScrollView style={styles.mainSection}>
      {flashcardSetsRef.current.map((flashcardSet, index) => (
          <TouchableOpacity style={styles.setBorder} key={index} onPress={()=>{props.navigation.navigate("FlashcardSetScreen", {
              flashcards: flashcardSet.flashcards,
              name: flashcardSet.name,
              delete: false,
              edit: false,
              initial: true,
              setIndex: index
            }
          )}}>
            <Text style={styles.setName}>
              {flashcardSet.name}
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