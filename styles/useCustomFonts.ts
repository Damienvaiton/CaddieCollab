import { useFonts } from "expo-font";

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		Itim: require("../assets/fonts/Itim-Regular.ttf"),
	});

	return fontsLoaded;
};
