import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
	Pressable,
	TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";

import styles from "../../styles/DefaultStyles";
import { useCustomFonts } from "../../styles/useCustomFonts";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type RootStackParamList = {
	Home: undefined;
	Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type List = {
	id: string;
	name: string;
	count: number;
};

export default function HomeScreen({
	navigation,
}: {
	navigation: HomeScreenNavigationProp;
}) {
	const [list, setList] = useState<List[]>([]);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [modifyModalVisible, setModifyModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedList, setSelectedList] = useState<List | null>(null);
	const [newListName, setNewListName] = useState<string>("");

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
	}, [navigation, list.length]);

	useEffect(() => {
		const idUser = auth().currentUser?.uid;
		const Lists = firestore()
			.collection("Users")
			.doc(idUser)
			.collection("Lists");

		const unsubscribe = Lists.onSnapshot((querySnapshot) => {
			const newList: List[] = [];
			querySnapshot.forEach((doc) => {
				newList.push({
					id: doc.id,
					name: doc.data().name,
					count: doc.data().count,
				});
			});
			setList(newList);
		});

		return unsubscribe;
	}, []);

	const handleDelete = (listToDelete: List) => {
		const idUser = auth().currentUser?.uid;
		const ListRef = firestore()
			.collection("Users")
			.doc(idUser)
			.collection("Lists")
			.doc(listToDelete.id);

		Alert.alert(
			"Supprimer la liste",
			`Voulez-vous vraiment supprimer la liste "${listToDelete.name}" ?`,
			[
				{ text: "Annuler", style: "cancel" },
				{
					text: "Supprimer",
					style: "destructive",
					onPress: () => {
						ListRef.delete()
							.then(() => {
								console.log(`Liste "${listToDelete.name}" supprimée.`);
								setDeleteModalVisible(false);
							})
							.catch((error) => {
								console.error(
									"Erreur lors de la suppression de la liste : ",
									error
								);
							});
					},
				},
			]
		);
	};

	const handleModify = (listToModify: List) => {
		const idUser = auth().currentUser?.uid;
		const ListRef = firestore()
			.collection("Users")
			.doc(idUser)
			.collection("Lists")
			.doc(listToModify.id);

		ListRef.update({ name: newListName })
			.then(() => {
				console.log(
					`Liste "${listToModify.name}" modifiée en "${newListName}".`
				);
				setNewListName("");
				setModifyModalVisible(false);
			})
			.catch((error) => {
				console.error("Erreur lors de la modification de la liste : ", error);
			});
	};

	const handleAddList = () => {
		const idUser = auth().currentUser?.uid;
		const ListsRef = firestore()
			.collection("Users")
			.doc(idUser)
			.collection("Lists");

		ListsRef.add({
			name: newListName,
			count: 0,
		})
			.then(() => {
				console.log("Nouvelle liste ajoutée.");
				setNewListName("");
				setAddModalVisible(false);
			})
			.catch((error) => {
				console.error("Erreur lors de l'ajout de la nouvelle liste : ", error);
			});
	};

	if (!fontsLoaded) {
		return <Text>Chargement...</Text>; // Afficher un écran de chargement en attendant
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.list}>
				{list.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={styles.listItem}
						onPress={() => {
							console.log(
								`Ouverture de la liste ${item.name} dont l'id est ${item.id}`
							);
						}}
						onLongPress={() => {
							setSelectedList(item);
							setNewListName(item.name);
							setModifyModalVisible(true);
						}}
					>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text style={styles.textItemPrimary}>{item.name}</Text>
							<Pressable
								onPress={() => {
									setSelectedList(item);
									setDeleteModalVisible(true);
								}}
							>
								<Image
									source={require("../../assets/delete.webp")}
									style={{ width: 20, height: 20 }}
								/>
							</Pressable>
						</View>
						<View
							style={{
								alignItems: "flex-end",
							}}
						>
							<View>
								<Text style={styles.textItemSecondary}>
									{item.count}{" "}
									{item.count === 1 || item.count === 0
										? "élément"
										: "éléments"}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Modal d'ajout */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={addModalVisible}
				onRequestClose={() => {
					setAddModalVisible(!addModalVisible);
					setNewListName("");
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTextTitle}>
							Ajouter une nouvelle liste
						</Text>
						<TextInput
							style={styles.modalTextInput}
							placeholder="Nom de la liste"
							value={newListName}
							onChangeText={(text) => setNewListName(text)}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Pressable
								style={[styles.buttonClose, { backgroundColor: "red" }]}
								onPress={() => {
									setAddModalVisible(!addModalVisible);
									setNewListName("");
								}}
							>
								<Text style={styles.buttonText}>Annuler</Text>
							</Pressable>
							<Pressable
								style={[
									styles.buttonClose,
									{ backgroundColor: "green" },
									{ marginLeft: 10 },
								]}
								onPress={handleAddList}
							>
								<Text style={styles.buttonText}>Ajouter</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* Modal de modification */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={modifyModalVisible}
				onRequestClose={() => {
					setModifyModalVisible(!modifyModalVisible);
					setNewListName("");
					setSelectedList(null);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTextTitle}>Modifier la liste</Text>
						<TextInput
							style={styles.modalTextInput}
							placeholder="Nom de la liste"
							value={newListName}
							onChangeText={(text) => setNewListName(text)}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Pressable
								style={[styles.buttonClose, { backgroundColor: "red" }]}
								onPress={() => {
									setModifyModalVisible(!modifyModalVisible);
									setNewListName("");
									setSelectedList(null);
								}}
							>
								<Text style={styles.buttonText}>Annuler</Text>
							</Pressable>
							<Pressable
								style={[
									styles.buttonClose,
									{ backgroundColor: "green" },
									{ marginLeft: 10 },
								]}
								onPress={() => {
									if (selectedList) {
										handleModify(selectedList);
									}
								}}
							>
								<Text style={styles.buttonText}>Modifier</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* Modal de suppression */}
			<Modal
				animationType="fade"
				transparent={true}
				visible={deleteModalVisible}
				onRequestClose={() => {
					setDeleteModalVisible(!deleteModalVisible);
					setSelectedList(null);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalTextTitle}>
							Voulez-vous supprimer la liste "{selectedList?.name}" ?
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Pressable
								style={[
									styles.buttonClose,
									{ backgroundColor: "red" },
									{ marginVertical: 10 },
								]}
								onPress={() => {
									setDeleteModalVisible(!deleteModalVisible);
									setSelectedList(null);
								}}
							>
								<Text style={styles.buttonText}>Annuler</Text>
							</Pressable>
							<Pressable
								style={[
									styles.buttonClose,
									{ backgroundColor: "green" },
									{ marginVertical: 10 },
								]}
								onPress={() => {
									if (selectedList) {
										handleDelete(selectedList);
									}
								}}
							>
								<Text style={styles.buttonText}>Supprimer</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<View style={styles.fabContainer}>
				<TouchableOpacity
					onPress={() => {
						setSelectedList(null);
						setNewListName("");
						setAddModalVisible(true);
					}}
				>
					<Text style={styles.buttonadd}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
