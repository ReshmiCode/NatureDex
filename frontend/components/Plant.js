import React from "react";
import { Image } from "react-native";
import { Text, Title, Card, CardItem } from "native-base";
import moment from "moment";

export default function Plant(props) {
  return (
    <Card style={{backgroundColor: '#B4CDD1'}}>
      
      <CardItem style={{backgroundColor: '#B4CDD1'}}>
        <Title style={{color: "#fff", textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5}}>{props.plant.description[0]}</Title>
      </CardItem>
      <CardItem
        cardBody
        button
        onPress={() => props.nav.navigate("PlantDetail")}
        style={{backgroundColor: '#B4CDD1'}}
      >
        <Image
          source={{
            uri: props.plant.image,
          }}
          style={{ height: 100, width: 100, justifyContent: 'center',
          alignItems: 'center', }}
        />
      </CardItem>
      <CardItem style={{backgroundColor: '#B4CDD1'}}>
        <Text style={{ textAlign: 'center', color: "#fff", textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5}}>{moment(props.plant.date_added).format("l")}</Text>
      </CardItem>
    </Card>
  );
}
