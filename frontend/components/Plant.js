import React from "react";
import { Image, TouchableOpacity, Linking } from "react-native";
import { Text, Card, CardItem } from "native-base";

export default function Plant(props) {
  return (
    <Card>
      <CardItem>
        <Text>{props.plant.description[0]}</Text>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: props.plant.image,
          }}
          options={{ height: 100, width: 100 }}
        />
      </CardItem>
      <CardItem>
        <Text>First Seen On: {props.plant.date_added}</Text>
      </CardItem>
      <CardItem>
        <TouchableOpacity
          onPress={() => Linking.openURL(props.plant.description[2])}
        >
          <Text> More Information </Text>
        </TouchableOpacity>
      </CardItem>
    </Card>
  );
}
