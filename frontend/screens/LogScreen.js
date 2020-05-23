import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import {
  Container,
  Body,
  Button,
  Content,
  Header,
  Title,
  Text,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import plants from "../assets/images/plantoutlines.png";

const axios = require("axios").default;

var styles = {
  button: {
    width: 300,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
};

export default function LogScreen() {
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

    //TODO: Get plant info here
    // const data = {
    //   api_key: "",
    //   images: imageBase,
    //   modifiers: ["crops_fast", "similar_images"],
    //   plant_language: "en",
    //   plant_details: ["common_names", "url", "name_authority","wiki_description", "taxonomy","synonyms"]
    // };
    
    // fetch('https://api.plant.id/v2/identify', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    GLOBAL.userID = "112522383689004928445";

    axios
    .get(`https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${GLOBAL.userID}`)
    .then((response) => {
      console.log("GETTED");
      const newPlants = response.data.data[0].plants;
      axios
        .post("https://backyardhacks2020.wl.r.appspot.com/api/v1/plants", {
          userID: GLOBAL.userID,
          image: "Sample Image",
          description: ["Sample Description"]
        })
        .then(function (response) {
          console.log("ADDED");
          newPlants.push(response.data.data._id);
          axios
            .patch(`https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${GLOBAL.userID}`, {
              plants: newPlants,
            })
            .then(function (response) {
              console.log("PATCHED");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log("Error in post", error);
        });
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log("Error in get", error);
    });
  
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
      <Header>
        <Body>
          <Title>NatureDex</Title>
        </Body>
      </Header>
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
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button info style={styles.button} onPress={addPlant}>
            <Text> Submit </Text>
          </Button>
        </Body>
      </Content>
    </Container>
  );
}
