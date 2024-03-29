import React from "react";
import * as Google from "expo-google-app-auth";
import { Thumbnail, Button, Text, View } from "native-base";
import { Image } from "react-native";
import Swiper from "react-native-swiper";

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID , ANDROID_APK_CLIENT_ID , IOS_APP_CLIENT_ID} from "../config";
import naturedexTitle from "../assets/images/naturedexTitle.png";
import tree from "../assets/images/tree.png";
import camera from "../assets/images/camera.png";
import ntbk from "../assets/images/ntbk.png";
import mag from "../assets/images/magGlass.png";

GLOBAL = require("../global");
const axios = require("axios").default;

var styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  natureDex: {
    flex: 1,
    alignSelf: "center",
  },
  desc: {
    flex: 2,
    textAlign: "center",
    color: "#0c4210",
    fontSize: 30,
    fontWeight: "bold",
    padding: 8,
    paddingTop: 10,
    fontFamily: "PlayfairDisplay",
  },
  loginDesc: {
    flex: 1.5,
    textAlign: "center",
    color: "#0c4210",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay",
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
    flex: .2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    borderWidth: 1,
    borderColor: "#4285F4",
    borderRadius: 5,
    margin: 5,
    padding:10
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
      "https://hdt-node-servers.herokuapp.com/NatureDex/api/v1/users/" +
      newUser.googleID;

    axios
      .get(userDBLink)
      .then(function (response) {
        if (response.data.data.length == 0) {
          axios
            .post("https://hdt-node-servers.herokuapp.com/NatureDex/api/v1/users/", {
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
        } else {
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
        androidStandaloneAppClientId: ANDROID_APK_CLIENT_ID,
        iosStandaloneAppClientId: IOS_APP_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        GLOBAL.id = user.id;
        GLOBAL.username = user.givenName;
        GLOBAL.profilePic = user.photoUrl;
        GLOBAL.accessToken = accessToken;

        newProfile();
        props.navigation.navigate("Root");
        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("Error with login", e);
      return { error: true };
    }
  };

  return (
    <Swiper showsButtons loop={false}>
      <View style={[styles.slides, { backgroundColor: "#CCD9CD" }]}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={tree} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Identify plants when you're out and about!
        </Text>
      </View>
      <View style={[styles.slides, { backgroundColor: "#A4C2AA" }]}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={camera} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Learn more about any plant instantly by just snapping a photo!
        </Text>
      </View>
      <View style={[styles.slides, { backgroundColor: "#A4C2BB" }]}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={ntbk} style={styles.icon}></Image>
        <Text style={styles.desc}>
          Keep track of all the plants you’ve seen before!
        </Text>
      </View>
      <View style={[styles.slides, { backgroundColor: "#B4CDD0" }]}>
        <Image source={naturedexTitle} style={styles.natureDex}></Image>
        <Image source={mag} style={styles.icon}></Image>
        <Button style={styles.GoogleStyle} onPress={signInWithGoogle}>
          <Thumbnail
            small
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            style={{ marginLeft: 9 }}
          />
          <Text style={styles.TextStyle, { color: '#000' }}>Sign In With Google</Text>
        </Button>
        <Text style={styles.loginDesc}>Go capture them all!</Text>
      </View>
    </Swiper>
  );
}
