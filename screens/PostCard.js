import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions,ScrollView, } from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import DropDownPicker from "react-native-dropdown-picker";
SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			previewImage:"image_1",
			dropdownHeight:40
		};
	}
    constructor(props) {
        super(props);
        this.state = {
        light_theme: true,
        post_id: this.props.post.key,
        post_data: this.props.post.value
        };
        }

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	
    }
    fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };

render() {
     return ( 
     <View style={styles.container}
     > <View style={styles.cardContainer}>
         <View style={styles. authorContainer}>
             <View style={styles.authorImageContainer}>
                < Image 
                source={ require("../assets/profile_img.png")}
                 style={styles.profileImage}
                 > </Image> 
                 </View>
                 <View style={styles.authorNameContainer}>
                     <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                      </View>
                       </View>
                        <Image source={ require("../assets/post.jpeg")} style={styles.postImage} />
                         <View style={styles.captionContainer}> 
                         < Text style={styles.captionText}>
                             {this.props.post.caption}
                              </Text>
                               </View>
                                <View style={styles.actionContainer}> 
                                <View style={styles.likeButton}>
                                     <Ionicons name={"heart"} size={RFValue (30)} color={"white"}/> 
                                     <Text style={styles.likeText}>12k</Text>
                                      </View>
                                       </View>
                                        </View>
                                         </View>
                                          ); 
     }}
