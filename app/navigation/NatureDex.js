import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import PlantScreen from "../screens/PlantScreen";
import SettingScreen from "../screens/SettingScreen";

const Stack = createStackNavigator();

export default function NatureDex() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="PlantDetail" component={PlantScreen} />
    </Stack.Navigator>
  );
}
