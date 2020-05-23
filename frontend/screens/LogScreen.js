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
          <Image
            source={plants}
            style={{ height: 200, width: null, flex: 1 }}
          />
          <Button info>
            <Text> Take Photo </Text>
          </Button>
          <Button info>
            <Text> Choose From Camera Roll </Text>
          </Button>
        </Body>
      </Content>
    </Container>
  );
}
