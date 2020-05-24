import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LogScreen from "../screens/LogScreen";
import ChooseScreen from "../screens/ChooseScreen";

const Stack = createStackNavigator();

export default function AddPlant() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AddImage" component={LogScreen} />
      <Stack.Screen name="ChoosePlant" component={ChooseScreen} />
    </Stack.Navigator>
  );
}
