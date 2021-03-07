import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from "react-native";
import colors from '../config/colors.js';

export default function FlashcardScreen(props) {
  const [flashcardSet, setFlashCardSet] = React.useState("");

  function handleSubmit() {
    if (flashcardSet != "") {
      const newFlashcardSet = {
        name: flashcardSet,
        flashcards: [{}],
        deleteSet: false
      };
      props.navigation.navigate("Flashcards", newFlashcardSet);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Create New Set</Text>
      </View>
      <View style={styles.mainSection}>
        <TextInput
          style={styles.textInput}
          value={flashcardSet}
          onChangeText={(text) => setFlashCardSet(text)}
          keyboardAppearance='dark'
          placeholder='Set Name'
          textContentType='none'
          autoCorrect={false}
        />
      </View>
      <View style={styles.bottomSection}> 
        <TouchableOpacity style={styles.backBorder} onPress={()=>props.navigation.navigate('Flashcards')}>
          <Text style={styles.back}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBorder} onPress={handleSubmit}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  backBorder: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    height: 45,
    marginLeft: 40,
    width: 100
  },
  bottomSection: {
    flex: .3333,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  container: {
    flex: 1,
    paddingTop: '15%'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  },
  headerSection: {
    flex: .3333,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainSection: {
    flex: .1,
    justifyContent: 'flex-start'
  },
  save: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.paleSilver
  },
  saveBorder: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    height: 45,
    width: 75,
    marginLeft: 115
  },
  textInput: {
    height: 45,
    width: 300,
    borderColor: colors.dimGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: 'center'
  }
});
