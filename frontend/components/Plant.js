import React from "react";
import { Image } from "react-native";
import { Text, Card, CardItem } from "native-base";
import moment from "moment";

export default function Plant(props) {
  return (
    <Card>
      <CardItem>
        <Text>{props.plant.description[0]}</Text>
      </CardItem>
      <CardItem
        cardBody
        button
        onPress={() => props.nav.navigate("PlantDetail")}
      >
        <Image
          source={{
            uri: props.plant.image,
          }}
          style={{ height: 100, width: 100 }}
        />
      </CardItem>
      <CardItem>
        <Text>{moment(props.plant.date_added).format("l")}</Text>
      </CardItem>
    </Card>
  );
}
