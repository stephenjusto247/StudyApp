import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import colors from "../config/colors";

export default function FlashcardStudyScreen(props) {
  const [flashcardSet, setFlashcardSet] = React.useState({});
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (props.route.params) {
      const newFlashcard = {
        set: props.route.params.set,
        flashcards: props.route.params.flashcards,
      };
      setFlashcardSet({ ...newFlashcard });
    }
  }, [props.route.params]);

  const list = () => {
    if (flashcardSet.flashcards !== undefined) {
      return flashcardSet.flashcards.map((entry, index) => {
        return (
          <View
            key={index}
            style={styles.flashcard}
          >
            <View>
              <Text style={styles.header}>{show ? 'Answer' : 'Question'}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.card}>
              {show ? (<Text style={styles.cardText}>{entry.answer}</Text>) : <Text style={styles.cardText}>{entry.question}</Text>}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => setShow(!show)}>
              <Text style={styles.buttonText}>
                {show ? 'Hide Answer' : 'Show Answer'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>{flashcardSet.set}</Text>
      </View>
      <View style={styles.mainSection}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollBegin={() => {
            setShow(false);
          }}
        >
          {list()}
        </ScrollView>
      </View>
      <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.back} onPress={() => {props.navigation.navigate("FlashcardSetScreen", flashcardSet)}}>
          <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  back:{
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
    color: colors.paleSilver,
    fontWeight: 'bold',
    fontSize: 18
  },
  bottomSection: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    borderColor: colors.paleSilver,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    height: 45,
    width: 175
  },
  buttonText: {
    color: colors.paleSilver,
    fontWeight: 'bold',
    fontSize: 18
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardText: {
    fontSize: 25,
    color: "black"
  },
  container: {
    flex: 1,
    paddingTop: '15%',
    backgroundColor: colors.white
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30
  },
  headerSection: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flashcard: {
    backgroundColor: "#fff",
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center"
  },
  flashcards: {
    flex: 1
  },
  mainSection: {
    flex: .5
  },
});