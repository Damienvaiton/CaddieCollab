import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1abaff",
		alignItems: "center",
		justifyContent: "center",
	},
	textItemPrimary: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
	},
	textItemSecondary: {
		color: "#ffffff",
		fontSize: 16,
		fontStyle: "italic",
	},

	listItem: {
		color: "#ffffff",
		backgroundColor: "orange",
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},
	list: {
		flex: 1,
		backgroundColor: "#1abaff",
	},
	fabContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	fab: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 50,
	},
	buttonadd: {
		backgroundColor: "white",
		width: 75,
		height: 75,
		fontSize: 50,
		textAlign: "center",
		borderRadius: 50,
	},
	buttonClose: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#00b2ff",
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default styles;
