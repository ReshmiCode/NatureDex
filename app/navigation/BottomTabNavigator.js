import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import TabBarIcon from "../components/TabBarIcon";
import AddPlant from "./AddPlant";
import NatureDex from "./NatureDex";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeBackgroundColor: "#B4CDD1",
        inactiveBackgroundColor: "#B4CDD1",
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={AddPlant}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="camera" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={NatureDex}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="tree" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
