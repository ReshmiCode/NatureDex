import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Text, Left, Body } from "native-base";

export default DeckCard = (item) => {
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
