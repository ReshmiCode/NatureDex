import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Container, Text } from "native-base";
import { RefreshControl } from "react-native";

import Plant from "../components/Plant";

const axios = require("axios").default;
GLOBAL = require("../global");

export default function ProfileScreen(props) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    setLoading(true);
    const result = await axios(
      `https://hdt-node-servers.herokuapp.com/NatureDex/api/v1/plants/user/${GLOBAL.id}`
    );
    setPlants(result.data.data.reverse());
    setLoading(false);
  };

  return (
    <Container style={{ padding: 10 }}>
      <FlatList
        data={plants}
        showsVerticalScrollIndicator={false}
        renderItem={(plant) => (
          <Plant plant={plant.item} nav={props.navigation} />
        )}
        keyExtractor={(plant) => plant._id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
}
