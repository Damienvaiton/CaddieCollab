import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import auth from "@react-native-firebase/auth";

import styles from "../../styles/DefaultStyles";
import { TextInput } from "react-native-gesture-handler";

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

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textItemPrimary}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				style={styles.textItemPrimary}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry={true}
			/>

			<Button
				title="Sign Up"
				onPress={() => {
					auth()
						.createUserWithEmailAndPassword(email, password)
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
				}}
			/>
		</View>
	);
}
