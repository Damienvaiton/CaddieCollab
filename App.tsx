import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Home"
>;

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Vos Listes",
			headerStyle: {
				backgroundColor: "#00b2ff",
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerRight: () => (
				<Image
					source={require("./assets/logo.png")}
					style={{ width: 40, height: 40, marginRight: 5 }}
				/>
			),
		});
	});
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate("Details")}
			/>
		</View>
	);
}

function DetailsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.textPrimary}>Details Screen</Text>
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1abaff",
		alignItems: "center",
		justifyContent: "center",
	},
	textPrimary: {
		color: "#00B2FF",
	},
});
