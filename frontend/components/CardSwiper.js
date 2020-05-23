import React, { useRef } from "react";
import { View, Button, DeckSwiper, Text, Body, Icon } from "native-base";
import DeckCard from "./DeckCard";

export default CardSwiper = (props) => {
  const swiper = useRef(null);

  const addPlant = async () => {
    const correctSug = swiper.current._root.state.selectedItem;
    console.log(correctSug);
  };

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
          onSwipeRight={addPlant}
          onSwipeLeft={() => console.log("left")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <Button
          iconLeft
          onPress={() => {
            swiper.current._root.swipeLeft();
            swiper.current.props.onSwipeLeft();
          }}
        >
          <Icon name="arrow-back" />
          <Text>Not This One</Text>
        </Button>
        <Button
          iconRight
          onPress={() => {
            swiper.current._root.swipeRight();
            swiper.current.props.onSwipeRight();
          }}
        >
          <Icon name="arrow-forward" />
          <Text>Select</Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          marginTop: 15,
          alignSelf: "center",
        }}
      >
        <Button onPress={() => props.navigation.navigate("AddImage")}>
          <Text>None of These</Text>
        </Button>
      </View>
    </React.Fragment>
  );
};
