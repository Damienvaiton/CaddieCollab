import * as React from "react";
import MainController from "./navigations/main"; // Assurez-vous que ce chemin est correct
import { Provider } from "react-redux";
import { store } from "./store/store"; // Vérifiez que le store est correctement exporté

export default function App() {
	return (
		<Provider store={store}>
			<MainController />
		</Provider>
	);
}
