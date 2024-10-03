import React, { useState } from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
	Pressable,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

import styles from "../../styles/DefaultStyles";
import { useCustomFonts } from "../../styles/useCustomFonts";

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
	const [modalVisible, setModalVisible] = useState(false);

	const fontsLoaded = useCustomFonts(); // Chargement des polices

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
					style={{ width: 40, height: 40, marginRight: 5 }}
				/>
			),
		});
	}, [navigation]);

	if (!fontsLoaded) {
		return <Text>Chargement...</Text>; // Afficher un écran de chargement en attendant
	}

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
								alignItems: "flex-end",
							}}
						>
							<View>
								<Text style={styles.textItemSecondary}>
									{list.count}{" "}
									{list.count === 1 || list.count === 0
										? "élément"
										: "éléments"}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTextTitle}>Ajouter une liste</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Pressable
								style={[styles.buttonClose]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.buttonText}>Hide Modal</Text>
							</Pressable>
							<Pressable
								style={[styles.buttonClose]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.buttonText}>Hide Modal</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<View style={styles.fabContainer}>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Text style={styles.buttonadd}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
