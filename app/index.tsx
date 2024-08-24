import { View, Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

const WelcomeScreen = () => {
  return (
		<View className='flex-1 justify-center items-center px-4 bg-white'>
			<Text className='text-3xl font-mada-Bold'>WelcomeScreen</Text>
			<TouchableOpacity
				className='w-full h-14 bg-primary rounded-full items-center justify-center mt-4'
				onPress={() => router.push('/login')}
			>
				<Text className='text-lg font-mada-semibold text-white'>Get Started</Text>
			</TouchableOpacity>
		</View>
	);
};

export default WelcomeScreen;
