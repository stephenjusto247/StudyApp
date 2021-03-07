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

  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;

  const list = () => {
    if (flashcardSet.flashcards !== undefined) {
      return flashcardSet.flashcards.map((entry, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              flex: 1,
              width: screenWidth,
              height: screenHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                padding: 15,
                color: "black",
                textAlign: "center",
              }}
            >
              {entry.question}

              {show ? entry.answer : null}
              <Button
                title="Show/Hide Answer"
                onPress={() => setShow(!show)}
              ></Button>
              <Button
                title="Back"
                onPress={() => {
                  props.navigation.navigate("FlashcardSetScreen", flashcardSet);
                }}
              />
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      onMomentumScrollBegin={() => {
        setShow(false);
      }}
    >
      {list()}
    </ScrollView>
  );
}
