import React, { useState } from "react";
import { Container, Button, Content, Text, Title, Body } from "native-base";
import { Image } from "react-native";
import CardSwiper from "../components/CardSwiper";
const axios = require("axios").default;

export default function ChooseScreen(props) {
  const { data } = props.route.params;
  const [choices, setChoices] = useState(false);

  const addPlant = async () => {
    console.log("hewwo");

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

  const results = () => {
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
          <Button onPress={() => setChoices(true)}>
            <Text>See Other Choices</Text>
          </Button>
        </Body>
      </Content>
    );
  };

  return (
    <Container>{choices ? <CardSwiper data={data} /> : results()}</Container>
  );
}
