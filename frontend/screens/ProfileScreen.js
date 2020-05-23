import React, { useState, useEffect } from "react";
import { Container, Body, Content, Header, Title, Text } from "native-base";

import Plant from "../components/Plant";

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

  //TODO: This is showing only one plant?

  return (
    <Container>
      <Content padder>
        {plants.length == 0 ? (
          <Text>You don't haven't seen any flowers, get looking!</Text>
        ) : (
          plants.map((plant) => <Plant plant={plant} key={plant._id} />)
        )}
      </Content>
    </Container>
  );
}
// props.navigation.navigate("PlantDetail")
