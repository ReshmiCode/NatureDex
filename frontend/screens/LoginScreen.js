import React, { Component } from "react";
import { Thumbnail, Button, Text, View } from "native-base";
import Swiper from "react-native-swiper";

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
};

export default function SwiperComponent(props) {
  const signInWithGoogle = () => {
    props.navigation.navigate("Root");
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
