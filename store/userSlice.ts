import { createSlice } from "@reduxjs/toolkit";

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
		},
		clearUser: (state) => {
			state.id = "";
			state.email = "";
			state.password = "";
			state.lastname = "";
			state.firstname = "";
			state.username = "";
			state.sharedid = "";
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
