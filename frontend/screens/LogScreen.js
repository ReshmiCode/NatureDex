import * as React from "react";
import { Container, Body, Content, Header, Title, Text } from "native-base";

export default function LogScreen() {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Log Activity</Title>
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
