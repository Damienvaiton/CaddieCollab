import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, TextInput, Button, Image } from "react-native";
import styles from "../../../styles/DefaultStyles";
import { RootState } from "../../../store/store";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { StackNavigationProp } from "@react-navigation/stack";
import { setUser } from "../../../store/userSlice";

type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	Register: undefined;
	Profile: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Login"
>;

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation<LoginScreenNavigationProp>();

	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Image
				source={require("../../../assets/logo.png")}
				style={{
					width: 150,
					height: 150,
					marginRight: 5,
					marginBottom: 20,
				}}
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
				title="Sign In"
				onPress={() => {
					auth()
						.signInWithEmailAndPassword(email, password)
						.then(() => {
							const idUser = auth().currentUser?.uid;
							console.log("idUser " + idUser);

							firestore()
								.collection("Users")
								.doc(idUser)
								.get()
								.then((documentSnapshot) => {
									if (documentSnapshot.exists) {
										const user = documentSnapshot.data();
										console.log(
											"firestore user " + user?.firstname + " " + user?.lastname
										);
										dispatch(
											setUser({
												id: idUser,
												lastname: user?.lastname,
												firstname: user?.firstname,
												email: email,
												username: user?.username ? user?.username : "",
												sharedid: user?.sharedid ? user?.sharedid : "",
											})
										);
									} else {
										console.log("User with id " + idUser + " does not exist");
									}
								});

							navigation.navigate("Profile");
						})
						.catch((error) => {
							if (error.code === "auth/wrong-password") {
								console.log("Wrong password!");
							}

							if (error.code === "auth/invalid-email") {
								console.log("Invalid email!");
							}

							console.error(error);
						});
				}}
			/>

			<Button
				title="Sign Up"
				onPress={() => {
					navigation.navigate("Register");
				}}
			/>
		</View>
	);
}
