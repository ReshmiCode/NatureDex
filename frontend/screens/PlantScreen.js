import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Image } from "react-native";
import { Container, Body, Content, Title, Text, Button } from "native-base";
import response from "../assets/sampleResponse.json";

export default function PlantScreen(props) {
  const { plant } = props.route.params;
  console.log(plant);

  return (
    <Container>
      <Content padder>
        <Body>
          <Title style={{ fontSize: 25 }}>
            {plant.description.plant_name
              .split(" ")
              .map(
                (item) => item.substring(0, 1).toUpperCase() + item.substring(1)
              ) // capitalize all first letters
              .join(" ")}
          </Title>
          <Image
            source={{ uri: plant.image }}
            style={{ height: 250, width: 250, flex: 1 }}
          />
          <Text>Name: {plant.description.plant_details.common_names[0]}</Text>
          <Text>Class: {plant.description.plant_details.taxonomy.class}</Text>
          <Text>{plant.description.plant_details.wiki_description.value}</Text>
          <Button
            info
            style={{ margin: 10, borderRadius: 5 }}
            onPress={handleLearnMorePress}
          >
            <Text>Learn More</Text>
          </Button>
          <Text>More Images:</Text>
          <Body style={{ flex: 1, flexDirection: "row" }}>
            <Image
              source={{ uri: plant.description.similar_images[0].url }}
              style={{ height: 150, width: 150, flex: 1 }}
            />
            <Image
              source={{ uri: plant.description.similar_images[1].url }}
              style={{ height: 150, width: 150, flex: 1 }}
            />
          </Body>
        </Body>
      </Content>
    </Container>
  );
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(plant.plant_details.wiki_description.citation);
}
