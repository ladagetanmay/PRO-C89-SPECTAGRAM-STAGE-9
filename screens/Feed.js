import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  FlatList
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";

import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

let stories = require("./temp_stories.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

 renderItem = ({ item:post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />
 }
  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
        <SafeArea View style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
        <Image
        source={require("../assets/logo.png")}
        style={styles.applcon}
        ></Image>
        <Text style={styles.appTitleText}>{'Story Telling\nApp'}</Text>
        </View>
        <View style={styles.buttonContainer}>
<TouchableOpacity
style={styles.button}
onPress={() => this.signInWithGoogleAsync()}
>
<Image
source={require("../assets/google_icon.png")}
style={styles.googlelcon}
></Image>
<Text style={styles.googleText}>Sign in with Google</Text>
</TouchableOpacity>
</View>
<View style={styles.cloudContainer}>
<Image
source={require("../assets/cloud.png")}
style={styles.cloudImage}
></Image>
</View>
</View>
);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  }
});
