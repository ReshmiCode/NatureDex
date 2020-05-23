import React, { useRef } from "react";
import { Image } from "react-native";
import {
  Container,
  View,
  Button,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Icon,
} from "native-base";
const axios = require("axios").default;

export default function ChooseScreen(props) {
  const { data } = props.route.params;
  const swiper = useRef(null);

  const addPlant = async () => {
    const correctSug = swiper.current._root.state.selectedItem;
    console.log(correctSug);

    /*try {
      const user = await axios.get(
        `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${GLOBAL.id}`
      );
      const newPlants = user.data.data[0].plants;
      const newPlant = await axios.post(
        "https://backyardhacks2020.wl.r.appspot.com/api/v1/plants",
        {
          userID: GLOBAL.id,
          image: plantData.images[0].url,
          description: [plantData.suggestions[0].plant_name],
        }
      );
      newPlants.push(newPlant.data.data._id);
      await axios.patch(
        `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${GLOBAL.id}`,
        {
          plants: newPlants,
        }
      );
    } catch (err) {
      console.log(err);
    }*/
  };

  return (
    <Container>
      <View>
        <Body>
          <Text>Select the plant you found:</Text>
        </Body>
        <DeckSwiper
          ref={swiper}
          dataSource={data.suggestions}
          looping={false}
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
    </Container>
  );
}

const DeckCard = (item) => {
  const plant = item.item;
  return (
    <Card style={{ elevation: 3 }}>
      <CardItem>
        <Left>
          <Body>
            <Text>{plant.plant_name}</Text>
            <Text note>Confidence: {plant.probability.toFixed(2) * 100}%</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          style={{ height: 300, flex: 1 }}
          source={{
            uri: plant.plant_details.wiki_image
              ? plant.plant_details.wiki_image.value
              : "https://classifieds.skyhinews.com/public/images/no-photo.png",
          }}
        />
      </CardItem>
    </Card>
  );
};
