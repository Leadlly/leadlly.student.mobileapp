import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValid, z } from 'zod';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { FormType } from '../../types/types';

const ScheduleForm = ({ next, form }: { next: () => void; form: FormType }) => {
	const onSubmit = () => {};

	return (
		<Animated.View
			entering={FadeInRight.duration(300)}
			exiting={FadeOutLeft.duration(100)}
			className='flex items-center gap-5 py-12 px-12'
		>
			<Image
				source={require('../../assets/images/Schedule.png')}
				className='w-[20vh] h-[20vh]'
			/>
			<Text className='text-2xl font-mada-semibold leading-tight text-center'>
				Schedule you follow?
			</Text>
			<Text className='text-base leading-tight font-mada-medium text-center'>
				Focus on core topics with hands-on practice and real-world examples for deeper
				understanding.
			</Text>

			<View
				className='mb-4 w-full'
				style={styles.input}
			>
				<Controller
					name='schedule'
					control={form.control}
					render={({ field }) => (
						<View className='flex  flex-col gap-4 py-4'>
							{[
								'School+coaching+self-study',
								'Coaching+self-study',
								'School+self-study',
								'Only self-study',
							].map((option) => (
								<Pressable
									key={option}
									className={`py-2    w-full rounded-lg border-2 ${
										field.value === option
											? 'border-[#9654F4] bg-gray-50'
											: 'border-transparent bg-gray-50'
									}`}
									onPress={() => {
										field.onChange(option);
									}}
								>
									<Text
										className={`text-center font-semibold text-base ${
											field.value === option ? 'text-black' : 'text-gray-500'
										}`}
									>
										{option}
									</Text>
								</Pressable>
							))}
						</View>
					)}
				/>

				{form.formState.errors.schedule && (
					<Text className='text-red-600 font-mada-medium'>
						{form.formState.errors.schedule.message}
					</Text>
				)}
			</View>
			
			<Pressable
				className='mt-8 py-2 px-6 bg-[#9654F4] rounded-lg flex flex-row space-x-2 justify-center items-center'
				onPress={onSubmit}
			>
				<Text className='text-white font-semibold'>Next</Text>
				<Feather
					name='arrow-right'
					size={16}
					color='white'
				/>
			</Pressable>
		</Animated.View>
	);
};

export default ScheduleForm;

const styles = StyleSheet.create({
	input: {
		shadowColor: 'rgba(0, 0, 0, 0.2)',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 5,
	},
});
