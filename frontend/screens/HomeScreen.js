import * as React from "react";
import { Container, Body, Content, Header, Title, Text } from "native-base";

export default function HomeScreen() {
  return (
    <Container>
      <Header>
        <Body>
          <Title>hewwo</Title>
        </Body>
      </Header>
      <Content padder>
        <Body>
          <Text>hi</Text>
        </Body>
      </Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
