import * as React from "react";
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
  return (
    <Container>
      <Header>
        <Body>
          <Title>NatureDex</Title>
        </Body>
      </Header>
      <Content padder>
        <Body>
          <Title>Identify a plant by a picture!</Title>
          <Text>Please make sure the plant is centered in the photo.</Text>
          <Image source={plants} style={{ height: 300, width: 300, flex: 1 }} />
          <Button info style={styles.button}>
            <Text> Take Photo </Text>
          </Button>
          <Button info style={styles.button}>
            <Text> Choose From Camera Roll </Text>
          </Button>
        </Body>
      </Content>
    </Container>
  );
}
