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
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
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
});

export default styles;
