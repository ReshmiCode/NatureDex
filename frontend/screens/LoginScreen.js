import React, { Component } from "react";
import * as Google from "expo-google-app-auth";
import { Thumbnail, Button, Text, View } from "native-base";
import { Image } from "react-native";
import Swiper from "react-native-swiper";

import naturedexTitle from "../assets/images/naturedexTitle.png";
import tree from "../assets/images/tree.png";
import camera from "../assets/images/camera.png";
import ntbk from "../assets/images/ntbk.png";
import mag from "../assets/images/magGlass.png";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "../config";

GLOBAL = require("../global");
const axios = require("axios").default;

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCD9CD",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A4C2AA",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A4C2BB",
  },
  slide4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B4CDD0",
  },
  natureDex: {
    flex: 1,
    alignSelf: "center",
  },
  desc: {
    flex: 1.7,
    textAlign: "center",
    color: "#0c4210",
    fontSize: 30,
    fontWeight: "bold",
    padding: 8,
    paddingTop: 10,
  },
  loginDesc: {
    flex: 1.7,
    textAlign: "center",
    color: "#0c4210",
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    flex: 1.7,
    width: 230,
    height: 230,
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
  GLOBAL.id = "";
  GLOBAL.username = "";
  GLOBAL.profilePic = "";
  GLOBAL.userID = "";

  const newProfile = () => {
    const newUser = {
      googleID: GLOBAL.id,
      userName: GLOBAL.username,
      profilePic: GLOBAL.profilePic,
      plants: [],
    };

    const userDBLink =
      "https://backyardhacks2020.wl.r.appspot.com/api/v1/users/" +
      newUser.googleID;

    axios
      .get(userDBLink)
      .then(function (response) {
        if (response.data.data.length == 0) {
          axios
            .post("https://backyardhacks2020.wl.r.appspot.com/api/v1/users/", {
              googleID: newUser.googleID,
              userName: newUser.userName,
              profilePic: newUser.profilePic,
              plants: newUser.plants,
            })
            .then(function (response) {
              console.log(response);
              GLOBAL.userID = response.data.data._id;
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log("User Created");
        } else {
          console.log("User already exists");
          GLOBAL.userID = response.data.data[0]._id;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  const signInWithGoogle = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        console.log("LoginScreen.js.js 21 | ", user.givenName);

        GLOBAL.id = user.id;
        GLOBAL.username = user.givenName;
        GLOBAL.profilePic = user.photoUrl;
        GLOBAL.accessToken = accessToken;

        newProfile();

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
      <View style={styles.slide1}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={tree} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Identify plants when you're out and about!
        </Text>
      </View>
      <View style={styles.slide2}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={camera} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Learn more about any plant instantly by just snapping a photo!
        </Text>
      </View>
      <View style={styles.slide3}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={ntbk} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Keep track of all the plants you’ve seen before!
        </Text>
      </View>
      <View style={styles.slide4}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={mag} style={styles.icon}></Image>
        <Text style={styles.loginDesc}>Go capture them all!</Text>
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
