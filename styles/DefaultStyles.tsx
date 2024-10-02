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
		fontFamily: "Arial",
	},
});

export default styles;
