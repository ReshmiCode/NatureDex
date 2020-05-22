import * as React from "react";
import { Container, Body, Content, Header, Title, Text } from "native-base";

export default function ProfileScreen() {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Profile</Title>
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
