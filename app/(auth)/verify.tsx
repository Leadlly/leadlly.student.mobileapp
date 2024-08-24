import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import showToast from '../../components/AuthComponents/Verify/Toastconfig';
import OTPInput from '../../components/AuthComponents/Verify/OtpInput';
import ResendOtpButton from '../../components/AuthComponents/Verify/ResendButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
const OTPFormSchema = z.object({
	otp: z
		.string({ required_error: 'OTP is required!' })
		.min(6, { message: 'Your OTP must be 6 characters' })
		.regex(/^\d+$/, { message: 'OTP should only contain digits' }),
});

const Verify: React.FC = () => {
	const [isVerifying, setIsVerifying] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(OTPFormSchema),
	});
	const navigation = useNavigation();

	// const onOTPSubmit = async (data: { otp: string }) => {
	// 	setIsVerifying(true);
	// 	const email = await AsyncStorage.getItem('email');

	// 	try {
	// 		const response = await axios.post('/api/auth/verify', {
	// 			otp: data.otp,
	// 			email,
	// 		});

	// 		if (response.status === 200) {
	// 			const responseData = response.data;

	// 			showToast('success', 'Success', 'Account verified successfully');

	// 			await AsyncStorage.removeItem('email');
	// 			navigation.replace('InitialInfo'); // Navigate to the next screen
	// 		} else {
	// 			showToast('error', 'Error', response.data.message);
	// 		}
	// 	} catch (error) {
	// 		showToast('error', 'Verification Failed', 'Account verification failed!');
	// 	} finally {
	// 		setIsVerifying(false);
	// 	}
	// };

	return (
		<SafeAreaView className='flex-1 p-4 bg-white'>
			<Image
				source={require('../../assets/images/leadlly_logo_full.png')}
				alt='Leadlly'
				className='w-36 h-16'
				resizeMode='contain'
			/>

			<View className='w-full flex-1 justify-center max-w-lg p-4 bg-white rounded-lg '>
				<Text className='text-center text-2xl font-semibold mb-4'>One-Time Password</Text>

				<OTPInput
					control={control}
					errors={errors}
				/>
				<Text className='text-center  text-gray-700 mb-4'>Please enter the one-time password sent to your email.</Text>

				<TouchableOpacity
					className={`mt-4 bg-blue-500 p-3 rounded-lg ${isVerifying ? 'opacity-50' : ''}`}
					// onPress={handleSubmit(onOTPSubmit)}
					disabled={isVerifying}
				>
					{isVerifying ? (
						<ActivityIndicator
							size='small'
							color='#fff'
						/>
					) : (
						<Text className='text-white text-center'>Submit</Text>
					)}
				</TouchableOpacity>

				<ResendOtpButton />
			</View>
		</SafeAreaView>
	);
};

export default Verify;
