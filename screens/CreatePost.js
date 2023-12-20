import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions,ScrollView, } from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			light_theme: true,
			previewImage:"image_1",
			dropdownHeight:40
			
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	async addPost() {
		if (
		this.state.caption
		) {
		let postData = {
		preview_image: this.state.previewImage,
		caption: this.state.caption,
		author: firebase.auth().currentUser.displayName,
		created_on: new Date(),
		author_uid: firebase.auth().currentUser.uid,
		profile_image: this.state.profile_image,
		Likes: 0
		};
		await firebase
		.database()
		.ref(
			"/posts/" +
		Math.random()
			.toString(36)
			.slice(2)
		)
			.set(postData)
			.then(function (snapshot) { });
		this.props.setUpdateToTrue();
		this.props.navigation.navigate("Feed");
	} else {
		Alert.alert(
		'Error',
		"All fields are required!",
		[{ text: "OK", onPress: () => console.log("OK Pressed") }],
	{ cancelable: false }
	);
		}
	}

	componentDidMount() {
		this._loadFontsAsync();
	}
	likeAction = () => {
		if (this.state.is_liked) {
		  firebase
			.database()
			.ref("posts")
			.child(this.state.story_id)
			.child("likes")
			.set(firebase.database.ServerValue.increment(-1)); this.setState({ likes: (this.state.likes -= 1), is_liked: false });
		} else {
		 
		  firebase
			.database()
			.ref("posts")
			.child(this.state.story_id)
			.child("likes")
			.set(firebase.database.ServerValue.increment(1));
		  this.setState({ likes: (this.state.likes += 1), is_liked: true });
		}
	  };
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
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			let preview_images={
				image_1: require("../assets/story_image_1.png"),
				image_2: require("../assets/story_image_2.png"),
				image_3: require("../assets/story_image_3.png"),
				image_4: require("../assets/story_image_4.png"),
				image_5: require("../assets/story_image_5.png"),
			}
			console.log(this.state.previewImage)
			
			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={{ height: RFValue(this.state.dropdownHeight)}}>
						<DropDownPicker
						items={[
							{lable: "Image_1", value:"image_1"},
							{lable: "Image_2", value:"image_2"},
							{lable: "Image_3", value:"image_3"},
							{lable: "Image_4", value:"image_4"},
							{lable: "Image_5", value:"image_5"},
						]}
						defaultValue={this.state.previewImage}
						open={this.state.dropdownHeight == 170 ? true: false}
						onOpen={()=>{
							this.setState({dropdownHeight:170});
						}}
						onClose={()=>{
							this.setState({dropdownHeight:40});
						}}
						style={{
							backgroundColor: "transparent",
							brorderWidth:1,
							borderColor:"white"
						}}
						textStyle={{
							color: this.state.dropdownHeight == 170 ? "black" : "white",
							fontFamily: "Bubblegum-Sans",
						}}
						onSelectItem={(item)=>{
							this.setState({previewImage: item.value})
						}}
						/>
					</View>
					<ScrollView>
						<TextInput
						style={styles.inputFont}
						onChnageText={(title)=> this.setState({title})}
						placeholder={"Title"}
						placeholderTextColor="white"
						/>
						<TextInput
						   style={[
							styles.inputFont,
							styles.inputFontExtra,
							styles.inputTextBig,
						  ]}
						onChnageText={(descriptiod)=> this.setState({description})}
						placeholder={"description"}
						placeholderTextColor="white"
						multiline={true}
						numberOfLines={4}
						/>
							<TextInput
						   style={[
							styles.inputFont,
							styles.inputFontExtra,
							styles.inputTextBig,
						  ]}
						onChnageText={(story)=> this.setState({story})}
						placeholder={"story"}
						placeholderTextColor="white"
						multiline={true}
                		numberOfLines={20}
						/>
							<TextInput
						   style={[
							styles.inputFont,
							styles.inputFontExtra,
							styles.inputTextBig,
						  ]}
						onChnageText={(moral)=> this.setState({moral})}
						placeholder={"moral"}
						placeholderTextColor="white"
						multiline={true}
						numberOfLines={4}
						/>
						 <TouchableOpacity 
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />

                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
					</ScrollView>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Story</Text>
					</View>
				</View>
			</View>)
		}
	}
}

const styles = StyleSheet.create({
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	  },
	container: {
	  flex: 1,
	  backgroundColor: "#15193c",
	},
	postCardLight: {
		margin: RFValue(20),
		backgroundColor: "#eaeaea",
		borderRadius: RFValue(20)
		},
	droidSafeArea: {
	  marginTop:
		Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
	},
	appTitle: {
	  flex: 0.07,
	  flexDirection: "row",
	},
	appIcon: {
	  flex: 0.3,
	  justifyContent: "center",
	  alignItems: "center",
	},
	iconImage: {
	  width: "100%",
	  height: "100%",
	  resizeMode: "contain",
	},
	appTitleTextContainer: {
	  flex: 0.7,
	  justifyContent: "center",
	},
	appTitleText: {
	  color: "white",
	  fontSize: RFValue(28),
	  fontFamily: "Bubblegum-Sans",
	},
	fieldsContainer: {
	  flex: 0.85,
	},
	previewImage: {
	  width: "93%",
	  height: RFValue(250),
	  alignSelf: "center",
	  borderRadius: RFValue(10),
	  marginVertical: RFValue(10),
	  resizeMode: "contain",
	},
	inputFont: {
	  height: RFValue(40),
	  borderColor: "white",
	  borderWidth: RFValue(1),
	  borderRadius: RFValue(10),
	  paddingLeft: RFValue(10),
	  color: "white",
	  marginTop: RFValue(10),
	  fontFamily: "Bubblegum-Sans",
	},
	inputFontExtra: {
	  marginTop: RFValue(15),
	},
	inputTextBig: {
	  textAlignVertical: "top",
	  padding: RFValue(5),
	},
	authorNameText: {
		color: "white",
		fontSize: RFValue (20)
		},
		authorNameTextLight: {
		color: "black",
		fontSize: RFValue(20)
		},
		likeButtonLiked: {
			width: RFValue(160),
			height: RFValue(40),
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
			backgroundColor: "#eb3948",
			borderRadius: RFValue(30)
		  },
		  likeButtonDisliked: {
			width: RFValue(160),
			height: RFValue(40),
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
			borderColor: "#eb3948",
			borderWidth: 2,
			borderRadius: RFValue(30)
		  },
		  likeText: {
			color: "white",
			fontFamily: "Bubblegum-Sans",
			fontSize: 25,
			marginLeft: 25,
			marginTop: 6
		  },
		  likeTextLight: {
			fontFamily: "Bubblegum-Sans",
			fontSize: 25,
			marginLeft: 25,
			marginTop: 6
		  }
		
  });