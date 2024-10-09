import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import auth from "@react-native-firebase/auth";

import styles from "../../styles/DefaultStyles";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function ProfileScreen({
	navigation,
}: {
	navigation: HomeScreenNavigationProp;
}) {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Profile",
			headerStyle: {
				backgroundColor: "#00b2ff",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerRight: () => (
				<Image
					source={require("../../assets/logo.png")}
					style={{
						width: 40,
						height: 40,
						marginRight: 5,
					}}
				/>
			),
		});
	});

	const Register = () => {
		auth()
			.createUserWithEmailAndPassword("test1@test.test", "testtest")
			.then(() => {
				console.log("User account created & signed in!");
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					console.log("That email address is already in use!");
				}

				if (error.code === "auth/invalid-email") {
					console.log("That email address is invalid!");
				}

				console.error(error);
			});
	};

	return (
		<View style={styles.container}>
			<Button title="Register" onPress={Register} />
		</View>
	);
}
