import React, { Component } from "react";
import * as Google from "expo-google-app-auth";
import { Thumbnail, Button, Text, View } from "native-base";
import Swiper from "react-native-swiper";

import { ANDROID_CLIENT_ID  , IOS_CLIENT_ID} from '../config';

var styles = {
  wrapper: {},
  natureDex: {
    textAlign: "center",
    color: "#0c4210",
    fontSize: 30,
    fontWeight: "bold",
  },
  desc: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    padding: 8,
  },
  loginDesc: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 15,
  },
  textStyle: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  GoogleStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    borderWidth: 1,
    borderColor: "#4285F4",
    // height: 40,
    //width: fit-content,
    borderRadius: 5,
    margin: 5,
  },
};

export default function SwiperComponent(props) {
  const signInWithGoogle = async () => {
    try {
      const { type, accessToken , user } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        console.log("LoginScreen.js.js 21 | ", user.givenName);

        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <Swiper style={styles.wrapper} showsButtons loop={false}>
      <View style={{ backgroundColor: "#c0dcc3" }}>
        <Text style={styles.desc}>
          Identify plants when you're out and about!
        </Text>
      </View>
      <View style={{ backgroundColor: "#cA4C2AA" }}>
        <Text style={styles.desc}>
          identify plants instantly by just snapping a photo!
        </Text>
      </View>
      <View style={{ backgroundColor: "#cA4C2BB" }}>
        <Text style={styles.desc}>
          Keep track of all the plants you’ve seen before!
        </Text>
      </View>
      <View style={{ backgroundColor: "#B4CDD0" }}>
        <Text style={styles.desc}>Go capture them all!</Text>
        <Button style={styles.GoogleStyle} onPress={signInWithGoogle}>
          <Thumbnail
            small
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            style={{ marginLeft: 9 }}
          />
          <Text style={styles.TextStyle}>Sign in with Google</Text>
        </Button>
      </View>
    </Swiper>
  );
}
