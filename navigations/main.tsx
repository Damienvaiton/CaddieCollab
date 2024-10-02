import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Pages imports
import HomeScreen from "./pages/HomeScreen";
import SharedListsScreen from "./pages/SharedListsScreen";
import ProfileScreen from "./pages/ProfileScreen";

const Stack = createBottomTabNavigator();

function MainController() {
	return (
		<NavigationContainer>
			<Stack.Navigator
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
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Shared Lists" component={SharedListsScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainController;
