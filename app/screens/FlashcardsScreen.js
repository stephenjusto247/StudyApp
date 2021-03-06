import React, { Fragment } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function FlashcardScreen(props) {
  const [flashcards, setFlashcards] = React.useState([]);
  React.useEffect(() => {
    console.log(props.route.params);
    if (props.route.params) {
      let flashcards_ = [...flashcards];
      flashcards_.push(props.route.params.flashcard);
      setFlashcards(flashcards_);
      //console.log(flashcards_);
    }
  }, [props.route.params]);

  return (
    <Fragment>
      <View style={styles.container}>
        <Text>Flash Cards Groups</Text>
        <Button
          title="Make new cards"
          onPress={() => {
            props.navigation.navigate("FlashCards");
          }}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Acc"
          onPress={() => {
            props.navigation.navigate("Account");
          }}
        />
        <Button
          title="FC"
          onPress={() => {
            props.navigation.navigate("Flashcards");
          }}
        />
        <Button
          title="CS"
          onPress={() => {
            props.navigation.navigate("Courses");
          }}
        />
        <Button title="CP" />
      </View>
    </Fragment>
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
