import * as React from "react";
import { Container, Body, Content, Text, Button } from "native-base";

export default function ProfileScreen(props) {
  return (
    <Container>
      <Content padder>
        <Body>
          <Text>profile</Text>
          <Button onPress={() => props.navigation.navigate("PlantDetail")}>
            <Text>go to plant detail</Text>
          </Button>
        </Body>
      </Content>
    </Container>
  );
}
