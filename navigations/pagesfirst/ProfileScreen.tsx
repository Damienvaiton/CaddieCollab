import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import styles from "../../styles/DefaultStyles";
import { TextInput } from "react-native-gesture-handler";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
	Register: undefined;
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

	return (
		<View style={styles.container}>
			<Text style={styles.textItemPrimary}>Profile</Text>
			<Button
				title="Go to Register"
				onPress={() => navigation.navigate("Register")}
			/>
		</View>
	);
}
