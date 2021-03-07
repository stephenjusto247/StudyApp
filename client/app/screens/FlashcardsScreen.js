import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function FlashcardScreen(props) {
  const [flashcardSet, setFlashcardSet] = React.useState([]);
  React.useEffect(() => {
    //console.log(props.route.params);
    if (props.route.params) {
      let flashcards_ = [...flashcardSet];
      const newFlashcardSet = {
        set: props.route.params.set,
      };
      flashcards_.push(newFlashcardSet);
      setFlashcardSet([...flashcards_]);
    }
  }, [props.route.params]);

  return (
    <View style={styles.container}>
      <Text>
        Flash Cards Groups
        {flashcardSet.map((entry, index) => (
          <TouchableOpacity style={styles.groupName} key={index}>
            <View style={styles.groupName}>
              <Button
                title={entry.set}
                onPress={() => {
                  props.navigation.navigate("FlashcardSetScreen", flashcardSet);
                }}
              ></Button>
            </View>
          </TouchableOpacity>
        ))}
      </Text>
      <Button
        title="Make new Set"
        onPress={() => {
          props.navigation.navigate("FlashcardsAddSet");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    bottom: 50,
  },
  groupName: {
    flex: 0.5,
    justifyContent: "center",
    color: "black",
    fontSize: 100,
  },
});

// const menuStyle = StyleSheet.creat({
//   container: {},
// });

// const flashCardStyle = StyleSheet.create({
//   rectangle: {
//     width: "2000px",
//     height: "800px",
//     backgroundColor: "peach",
//   },
// });

// const rectangleStyle = StyleSheet.create({
//   rectangle: {
//     width: "50px",
//     height: "50px",
//     backgroundColor: "black",
//   },
// });
