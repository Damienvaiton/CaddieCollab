import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUser, setUser } from "../../store/userSlice";

import styles from "../../styles/DefaultStyles";
import { TextInput } from "react-native-gesture-handler";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
	Register: undefined;
	Login: undefined;
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
				<Pressable
					onPress={() => {
						console.log(user);
					}}
				>
					<Image
						source={require("../../assets/logo.png")}
						style={{
							width: 40,
							height: 40,
							marginRight: 5,
						}}
					/>
				</Pressable>
			),
		});
	});

	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Text style={styles.textItemPrimary}>Profile</Text>
			{user && user.id ? (
				<View>
					<Text style={styles.textItemSecondary}>
						Welcome {user.firstname} {user.lastname}
					</Text>
					<Text style={styles.textItemSecondary}>Email: {user.email}</Text>
				</View>
			) : (
				<View>
					<Button title="Login" onPress={() => navigation.navigate("Login")} />
					<Text style={styles.textItemSecondary}>Please login</Text>
					<Text style={styles.textItemSecondary}>id in store: {user.id}</Text>
				</View>
			)}
		</View>
	);
}
