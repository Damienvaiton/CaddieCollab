import React, { useState } from "react";
import {
	Button,
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

import styles from "../../styles/DefaultStyles";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const ListExemple = [
	{ id: 1, name: "Janvier 2021", count: 3 },
	{ id: 2, name: "Février 2021", count: 2 },
	{ id: 3, name: "Mars 2021", count: 5 },
	{ id: 4, name: "Avril 2021", count: 1 },
	{ id: 5, name: "Mai 2021", count: 0 },
	{ id: 6, name: "Juin 2021", count: 4 },
	{ id: 7, name: "Juillet 2021", count: 3 },
	{ id: 8, name: "Août 2021", count: 2 },
	{ id: 9, name: "Septembre 2021", count: 5 },
	{ id: 10, name: "Octobre 2021", count: 1 },
	{ id: 11, name: "Novembre 2021", count: 0 },
	{ id: 12, name: "Décembre 2021", count: 4 },
];

export default function HomeScreen({
	navigation,
}: {
	navigation: HomeScreenNavigationProp;
}) {
	const [modalVisible, setModalVisible] = useState(false); // État pour la modal

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
					source={require("../../assets/logo.png")}
					style={{
						width: 40,
						height: 40,
						marginRight: 5,
					}}
				/>
			),
		});
	}, [navigation]);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.list}>
				{ListExemple.map((list) => (
					<TouchableOpacity
						key={list.id}
						style={styles.listItem}
						onPress={() => {
							alert(`Liste: ${list.name}`);
						}}
					>
						<Text style={styles.textItemPrimary}>{list.name}</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Text style={{ ...styles.textItemPrimary, color: "orange" }}>
								{list.name}
							</Text>
							<Text style={styles.textItemSecondary}>
								{list.count}{" "}
								{list.count === 1 || list.count === 0 ? "élément" : "éléments"}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			<View style={styles.fabContainer}>
				<TouchableOpacity
					onPress={() => {
						alert("Ajouter une liste");
					}}
				>
					<Text style={styles.buttonadd}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
