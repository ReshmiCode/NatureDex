import React, { useState } from "react";
import { Container, Button, Content, Text, Title, Body } from "native-base";
import { Image } from "react-native";
import CardSwiper from "../components/CardSwiper";
const axios = require("axios").default;

export default function ChooseScreen(props) {
  const { data, resetImage } = props.route.params;
  const [choices, setChoices] = useState(false);

  const addPlant = async (plantData) => {
    try {
      const newPlant = await axios.post(
        "https://backyardhacks2020.wl.r.appspot.com/api/v1/plants",
        {
          userID: GLOBAL.id,
          image: data.images[0].url,
          description: plantData,
        }
      );
    } catch (err) {
      console.log(err);
    }
    resetImage();
    props.navigation.popToTop();
  };

  const results = () => {
    if (!data.suggestions) {
      return (
        <Content padder>
          <Text>No results found. Please retake the photo and try again.</Text>
          <Button onPress={() => props.navigation.navigate("AddImage")}>
            <Text>Go Back</Text>
          </Button>
        </Content>
      );
    }
    const plant = data.suggestions[0];
    return (
      <Content padder>
        <Body>
          <Title>Top Result:</Title>
          <Text>{plant.plant_name}</Text>
          <Image
            source={{
              uri: plant.plant_details.wiki_image
                ? plant.plant_details.wiki_image.value
                : plant.images[0].url,
            }}
            style={{ width: 300, height: 300, borderRadius: 10, margin: 20 }}
          />
          <Button style={{ marginBottom: 15 }} onPress={() => addPlant(plant)}>
            <Text>Select</Text>
          </Button>

          <Button onPress={() => setChoices(true)}>
            <Text>See Other Choices</Text>
          </Button>
        </Body>
      </Content>
    );
  };

  return (
    <Container>
      {choices ? <CardSwiper data={data} addPlant={addPlant} /> : results()}
    </Container>
  );
}
