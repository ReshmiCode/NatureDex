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

import sampleResponse from "../assets/sampleResponse.json";

const DeckCard = (item) => {
  const plant = item.item;
  return (
    <Card style={{ elevation: 3 }}>
      <CardItem>
        <Left>
          <Body>
            <Text>{plant.plant_name}</Text>
            <Text note>
              {plant.plant_details.common_names &&
                plant.plant_details.common_names[0]}
            </Text>
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

export default function ChooseScreen(props) {
  //const { data } = props.route.params;
  const swiper = useRef(null);

  const addPlant = async () => {
    try {
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
    }
  };

  return (
    <Container>
      <View>
        <DeckSwiper
          ref={swiper}
          dataSource={sampleResponse.suggestions}
          looping={false}
          renderEmpty={() => (
            <View style={{ alignSelf: "center" }}>
              <Text>Over</Text>
            </View>
          )}
          renderItem={(item) => <DeckCard item={item} />}
          onSwipeRight={() => console.log("right")}
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
        <Button iconLeft onPress={() => swiper.current._root.swipeLeft()}>
          <Icon name="arrow-back" />
          <Text>Swipe Left</Text>
        </Button>
        <Button iconRight onPress={() => swiper.current._root.swipeRight()}>
          <Icon name="arrow-forward" />
          <Text>Swipe Right</Text>
        </Button>
      </View>
    </Container>
  );
}
