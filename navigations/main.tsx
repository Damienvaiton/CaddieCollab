import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useAppDispatch, useAppSelector } from "../store/hooks"; // Importez les hooks typés
import { loadUserAsync } from "../store/userSlice";

// Pages imports
import HomeScreen from "./pagesfirst/HomeScreen";
import SharedListsScreen from "./pagesfirst/SharedListsScreen";
import ProfileScreen from "./pagesfirst/ProfileScreen";
import RegisterScreen from "./pagesfirst/pages/RegisterScreen";
import LoginScreen from "./pagesfirst/pages/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Tabs"
				component={MainTabs}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

function MainTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: keyof typeof Ionicons.glyphMap = "reader-sharp";

					if (route.name === "Home") {
						iconName = focused ? "reader-sharp" : "reader-outline";
					} else if (route.name === "Shared Lists") {
						iconName = focused ? "receipt-sharp" : "receipt-outline";
					} else if (route.name === "Profile") {
						iconName = focused ? "person-circle-sharp" : "person-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Shared Lists" component={SharedListsScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}

export default function MainController() {
	const dispatch = useAppDispatch(); // Utilisez useAppDispatch au lieu de useDispatch

	React.useEffect(() => {
		dispatch(loadUserAsync());
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<MainStack />
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}
