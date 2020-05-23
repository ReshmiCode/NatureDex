import React, { useState, useEffect } from "react";
import { Container, Body, Content, Header, Title, Text } from "native-base";

import Plant from '../components/Plant'; 

const axios = require("axios").default;
GLOBAL = require("../global");

export default function ProfileScreen() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    GLOBAL.userID = "112522383689004928445";

    const fetchData = async () => {
      const result = await axios(
        `https://backyardhacks2020.wl.r.appspot.com/api/v1/plants/user/${GLOBAL.userID}`
      );
      setPlants(result.data.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <Body>
          <Title>Profile</Title>
        </Body>
      </Header>
      <Content padder>
        <Body>
          <Plant 
            title = "Rose"
            image = "https://d384u2mq2suvbq.cloudfront.net/public/spree/products/1693/original/Red-Rose-Fragrance-Oil.jpg"
            name = "Rosa"
            date= "Date"
            link = "https://en.wikipedia.org/wiki/Rose"
          />
        </Body>
      </Content>
    </Container>
  );
}
