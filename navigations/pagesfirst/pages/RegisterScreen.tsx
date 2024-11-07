import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, TextInput, Button, Image, Pressable } from "react-native";
import styles from "../../../styles/DefaultStyles";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getUser, setUser } from "../../../store/userSlice";

type RootStackParamList = {
	Home: undefined;
	Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Register"
>;

export default function RegisterScreen() {
	const [lastname, setLastname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation<RegisterScreenNavigationProp>();

	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => {
					// Get the user from the store without using the variable user, the goal is to show that we can get the user from the store
					console.log(user);
				}}
			>
				<Image
					source={require("../../../assets/logo.png")}
					style={{
						width: 150,
						height: 150,
						marginRight: 5,
						marginBottom: 20,
					}}
				/>
			</Pressable>

			<TextInput
				style={styles.input}
				placeholder="Lastname"
				onChangeText={(text) => setLastname(text)}
				value={lastname}
			/>

			<TextInput
				style={styles.input}
				placeholder="Firstname"
				onChangeText={(text) => setFirstname(text)}
				value={firstname}
			/>

			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				style={styles.input}
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
							const userCollection = firestore().collection("Users");
							userCollection.doc(auth().currentUser?.uid).set({
								id: auth().currentUser?.uid,
								lastname: lastname,
								firstname: firstname,
								email: email,
								username: "No username implemented",
								sharedid: "Shared id not implemented",
							});
							// Create the collection Lists for the user inside the collection Users

							const listCollection = userCollection.doc(auth().currentUser?.uid).collection("Lists");
							listCollection.add({
								name: "Ma première liste",
								count: 0,
							});


						
							

							dispatch(
								setUser({
									id: auth().currentUser?.uid,
									email: email,
									password: password,
									lastname: lastname,
									firstname: firstname,
									username: "",
									sharedid: "Id not set",
								})
							);

							console.log("User account created & signed in!");
							
							console.log(dispatch(getUser()));

							navigation.navigate("Home");
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
