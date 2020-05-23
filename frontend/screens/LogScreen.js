import React, { useState } from "react";
import { Image } from "react-native";
import {
  Container,
  Body,
  Button,
  Content,
  Title,
  Text,
  Spinner,
} from "native-base";
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
  let [loading, setLoading] = useState(false);

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

  const identifyPlant = async () => {
    const data = {
      images: ["data:image/jpeg;base64," + imageBase],
      modifiers: ["crops_fast", "similar_images"],
      plant_details: [
        "common_names",
        "taxonomy",
        "url",
        "wiki_description",
        "wiki_image",
      ],
      plant_language: "en",
      api_key: PLANT_API_KEY,
    };
    let plantData;
    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.plant.id/v2/identify`,
        data
      );
      plantData = response.data;
      setLoading(false);
      props.navigation.navigate("ChoosePlant", { data: plantData });
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
          <Title
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 0,
              textShadowColor: "rgba(0, 0, 0, 0.3)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 5,
            }}
          >
            Identify a plant by a picture!
          </Title>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              marginHorizontal: 40,
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.3)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 5,
            }}
          >
            Please make sure the plant is centered in the photo.
          </Text>
          <Button style={styles.button} onPress={takeImage}>
            <Title
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 5,
              }}
            >
              {" "}
              Take Photo{" "}
            </Title>
          </Button>
          <Button style={styles.button} onPress={pickImage}>
            <Title
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.3)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 5,
              }}
            >
              {" "}
              Choose From Camera Roll{" "}
            </Title>
          </Button>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300, marginVertical: 10 }}
            />
          ) : (
            <Image
              source={plants}
              style={{ height: 250, width: 250, flex: 1 }}
            />
          )}
          {image &&
            (loading ? (
              <Spinner color="green" />
            ) : (
              <Button style={styles.button} onPress={identifyPlant}>
                <Title
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.3)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 5,
                  }}
                >
                  {" "}
                  Submit{" "}
                </Title>
              </Button>
            ))}
        </Body>
      </Content>
    </Container>
  );
}
