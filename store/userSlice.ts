import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
	id: string;
	email: string;
	password: string;
	lastname: string;
	firstname: string;
	username: string;
	sharedid: string;
}

const initialState: User = {
	id: "",
	email: "",
	password: "",
	lastname: "",
	firstname: "",
	username: "",
	sharedid: "",
};

// Création du thunk asynchrone pour charger l'utilisateur
export const loadUserAsync = createAsyncThunk("user/loadUser", async () => {
	const userData = await AsyncStorage.getItem("user");
	if (userData) {
		return JSON.parse(userData);
	}
	return null;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.lastname = action.payload.lastname;
			state.firstname = action.payload.firstname;
			state.username = action.payload.username;
			state.sharedid = action.payload.sharedid;

			AsyncStorage.setItem("user", JSON.stringify(action.payload));
		},
		clearUser: (state) => {
			state.id = "";
			state.email = "";
			state.password = "";
			state.lastname = "";
			state.firstname = "";
			state.username = "";
			state.sharedid = "";

			AsyncStorage.removeItem("user");
		},
		getUser: (state) => {
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadUserAsync.fulfilled, (state, action) => {
			if (action.payload) {
				console.log("User loaded from AsyncStorage");
				console.log("id : " + action.payload.id);
				state.id = action.payload.id;
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.lastname = action.payload.lastname;
				state.firstname = action.payload.firstname;
				state.username = action.payload.username;
				state.sharedid = action.payload.sharedid;
			} else {
				state.id = "";
				state.email = "";
				state.password = "";
				state.lastname = "";
				state.firstname = "";
				state.username = "";
				state.sharedid = "";
			}
		});
	},
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export default userSlice.reducer;
