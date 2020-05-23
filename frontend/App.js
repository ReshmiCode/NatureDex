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

const Stack = createStackNavigator();

export default function App(props) {
    return <LoginScreen />;

    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <View style={styles.container}>
                    {Platform.OS === "ios" && (
                        <StatusBar barStyle="dark-content" />
                    )}
                    <NavigationContainer>
                        <Stack.Navigator headerMode="none">
                            {/*<Stack.Screen name="LogIn" component={LoginScreen} />*/}
                            <Stack.Screen
                                name="Root"
                                component={BottomTabNavigator}
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
