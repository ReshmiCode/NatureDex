import React, { useState } from "react";
import { Image } from "react-native";
import { Container, Body, Button, Content, Title, Text } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import plants from "../assets/images/plantoutlines.png";
import { PLANT_API_KEY } from "../config";

const axios = require("axios").default;

var styles = {
  button: {
    width: 300,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
};

export default function LogScreen(props) {
  let [image, setImage] = useState(null);
  let [imageBase, setImageBase] = useState(null);

  const getPickerPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const getCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      await getPickerPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setImageBase(result.base64);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const addPlant = async () => {
    const data = {
      images: ["data:image/jpeg;base64," + imageBase],
      modifiers: ["crops_fast", "similar_images"],
      plant_details: ["common_names", "taxonomy", "url", "wiki_description"],
      plant_language: "en",
      api_key: PLANT_API_KEY,
    };
    let plantData;
    try {
      const response = await axios.post(
        `https://api.plant.id/v2/identify`,
        data
      );
      plantData = response.data;
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

  const takeImage = async () => {
    try {
      await getCameraPermission();
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setImageBase(result.base64);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <Container>
      <Content padder>
        <Body>
          <Title style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Identify a plant by a picture!
          </Title>
          <Text>Please make sure the plant is centered in the photo.</Text>
          <Image source={plants} style={{ height: 250, width: 250, flex: 1 }} />
          <Button info style={styles.button} onPress={takeImage}>
            <Text> Take Photo </Text>
          </Button>
          <Button info style={styles.button} onPress={pickImage}>
            <Text> Choose From Camera Roll </Text>
          </Button>
          {image && (
            <React.Fragment>
              <Image
                source={{ uri: image }}
                style={{ width: 300, height: 300 }}
              />
              <Button info style={styles.button} onPress={addPlant}>
                <Text> Submit </Text>
              </Button>
            </React.Fragment>
          )}
        </Body>
      </Content>
    </Container>
  );
}
