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
      }
    } catch (E) {
      console.log(E);
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
          <Image source={plants} style={{ height: 300, width: 300, flex: 1 }} />
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
        </Body>
      </Content>
    </Container>
  );
}
