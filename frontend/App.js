import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import commonColor from "./native-base-theme/variables/commonColor";

//import { Apploading, Font } from "expo";
//import PlayfairDisplay from "./assets/fonts/PlayfairDisplay.ttf";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="LogIn"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                  title: "NatureDex",
                  headerTitleAlign: "center",
                  headerLeft: null,
                  headerTitleStyle: {
                    fontSize: 32, color: "#fff", textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5
                  },
                  headerStyle: {
                    
                    backgroundColor: "#B4CDD1",
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
