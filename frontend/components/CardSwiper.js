import React, { useRef } from "react";
import { View, Button, DeckSwiper, Text, Body, Icon } from "native-base";
import DeckCard from "./DeckCard";

export default CardSwiper = (props) => {
  const swiper = useRef(null);

  return (
    <React.Fragment>
      <View style={{ padding: 10 }}>
        <Body>
          <Text>Select the plant you found:</Text>
        </Body>
        <DeckSwiper
          ref={swiper}
          dataSource={props.data.suggestions}
          renderEmpty={() => (
            <View style={{ alignSelf: "center" }}>
              <Text>Please retake the photo and try again.</Text>
              <Button onPress={() => props.navigation.navigate("AddImage")}>
                <Text>Go Back</Text>
              </Button>
            </View>
          )}
          renderItem={(item) => <DeckCard item={item} />}
          onSwipeRight={() =>
            props.addPlant(swiper.current._root.state.selectedItem)
          }
          onSwipeLeft={() => console.log("left")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          justifyContent: "center",
          padding: 15,
        }}
      >
        <Button
          style={{ marginRight: 20 }}
          onPress={() => {
            swiper.current._root.swipeLeft();
            swiper.current.props.onSwipeLeft();
          }}
        >
          <Icon name={"md-close-circle"} />
          <Text>Incorrect</Text>
        </Button>
        <Button
          onPress={() => {
            swiper.current._root.swipeRight();
            swiper.current.props.onSwipeRight();
          }}
        >
          <Icon name={"md-checkmark-circle"} />
          <Text>Select</Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          justifyContent: "center",
        }}
      >
        <Button onPress={() => props.navigation.navigate("AddImage")}>
          <Text>None of These</Text>
        </Button>
      </View>
    </React.Fragment>
  );
};
