import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import PlantScreen from "../screens/PlantScreen";

const Stack = createStackNavigator();

export default function NatureDex() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PlantDetail" component={PlantScreen} />
    </Stack.Navigator>
  );
}
