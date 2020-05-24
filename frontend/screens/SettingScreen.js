import * as React from "react";
import {
  Container,
  Body,
  Content,
  Text,
  Left,
  Right,
  Switch,
  ListItem,
  Title,
  Icon,
  Button,
} from "native-base";

export default function SettingScreen() {
  return (
    <Container>
      <Content padder>
        <Title style={{ fontSize: 25, marginBottom: 10 }}>Settings</Title>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Icon active name="logo-game-controller-b" />
            </Button>
          </Left>
          <Body>
            <Text>Pokemon Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Icon active name="md-list-box" />
            </Button>
          </Left>
          <Body>
            <Text>See Plant Options</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <Button>
          <Text>Sign Out</Text>
        </Button>
      </Content>
    </Container>
  );
}
