import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormType } from '../../types/types';
const PhoneNumberForm = ({ next, form }: { next: () => void; form: FormType }) => {
	const onSubmit = () => {
		next();
	};
	return (
		<View className='flex items-center gap-5 py-12 px-12'>
			<Image
				source={require('../../assets/images/phoneNumber.png')}
				className='w-[20vh] h-[20vh]'
			/>
			<Text className='text-2xl font-mada-semibold leading-tight text-center'>
				Enter Your Phone number?
			</Text>
			<Text className='text-base leading-tight font-mada-medium text-center'>
				We need to register your phone number before getting Started!
			</Text>
			<View
				className='mb-4'
				style={styles.input}
			>
				<Controller
					name='phoneNumber'
					control={form.control}
					rules={{ required: true }}
					render={({ field }) => (
						<View
							className='h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center '
							style={{}}
						>
							<Text className='mr-3'>+91</Text>
							<TextInput
								inputMode='numeric'
								placeholder='Phone number'
								onBlur={field.onBlur}
								onChangeText={field.onChange}
								value={field.value}
								cursorColor={'#9654F4'}
								keyboardType='numeric'
								className='w-full h-full text-lg font-mada-regular '
							/>
						</View>
					)}
				/>
				{form.formState.errors.phoneNumber && (
					<Text className='text-red-600 font-mada-medium'>
						{form.formState.errors.phoneNumber.message}
					</Text>
				)}
			</View>
			<Pressable
				onPress={onSubmit}
				className='w-2/4 h-12  bg-primary rounded-lg items-center justify-center mb-4 disabled:bg-primary/30'
			>
				<Text className='text-lg font-mada-semibold text-white'>Confirm</Text>
			</Pressable>
		</View>
	);
};
export default PhoneNumberForm;
const styles = StyleSheet.create({
	input: {
		shadowColor: 'rgba(0, 0, 0, 0.2)',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 5,
	},
});
