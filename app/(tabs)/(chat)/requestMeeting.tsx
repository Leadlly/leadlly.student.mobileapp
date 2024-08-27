import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity,
	Modal,
	ImageBackground,
	TouchableWithoutFeedback,
	FlatList,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { RequestMeetingFormSchema } from '../../../schemas/requestMeetingFormSchema';
import { format } from 'date-fns';

const RequestMeetingComponent: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [isCalendarVisible, setIsCalendarVisible] = useState(false);
	const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);

	const form = useForm<z.infer<typeof RequestMeetingFormSchema>>({
		resolver: zodResolver(RequestMeetingFormSchema),
	});

	const formatTime = (hour: number, minute: number) => {
		const period = hour >= 12 ? 'PM' : 'AM';
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
	};

	const intervalCount = (22 - 9) * 4 + 1;

	const onSubmit = async (data: z.infer<typeof RequestMeetingFormSchema>) => {
		setIsSubmitting(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			Toast.show({
				type: 'success',
				text1: 'Meeting request sent successfully!',
			});
			setSubmitted(true);
			form.reset();
		} catch (error: any) {
			Toast.show({
				type: 'error',
				text1: error.message,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View className='lg:hidden flex-1'>
			<Modal
				visible={isCalendarVisible}
				transparent={true}
				animationType='fade'
				onRequestClose={() => setIsCalendarVisible(false)}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						setIsCalendarVisible(false);
					}}
				>
					<View className='flex-1 justify-center items-center bg-black/50'>
						<TouchableWithoutFeedback>
							<View className='bg-white rounded-lg p-5 w-11/12 max-w-md'>
								<Text className='text-center text-2xl font-bold mb-4'>Select Date</Text>
								<Calendar
									onDayPress={(day: any) => {
										form.setValue('date_of_meeting', new Date(day.dateString));
										setIsCalendarVisible(false);
									}}
									minDate={new Date().toISOString().split('T')[0]}
									maxDate={
										new Date(new Date().setDate(new Date().getDate() + 7))
											.toISOString()
											.split('T')[0]
									}
								/>
								<TouchableOpacity
									className='mt-4 bg-primary rounded-lg py-2'
									onPress={() => setIsCalendarVisible(false)}
								>
									<Text className='text-center text-white'>Close</Text>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<Modal
				visible={isTimeModalVisible}
				transparent={true}
				animationType='fade'
				onRequestClose={() => setIsTimeModalVisible(false)}
			>
				<TouchableWithoutFeedback onPress={() => setIsTimeModalVisible(false)}>
					<View className='flex-1 justify-center items-center bg-black/50'>
						<TouchableWithoutFeedback>
							<View className='bg-white rounded-lg p-5 w-10/12 h-5/6 max-w-md'>
								<Text className='text-center text-2xl font-bold mb-4'>Select Time</Text>
								<FlatList
									data={Array.from({ length: intervalCount }).map((_, i) => {
										const hour = Math.floor(i / 4) + 9;
										const minute = (i % 4) * 15;
										return formatTime(hour, minute);
									})}
									keyExtractor={(item, index) => index.toString()}
									renderItem={({ item }) => (
										<TouchableOpacity
											className='py-2'
											onPress={() => {
												form.setValue('time', item);
												setIsTimeModalVisible(false);
											}}
										>
											<Text className='text-center text-lg'>{item}</Text>
										</TouchableOpacity>
									)}
								/>
								<TouchableOpacity
									className='mt-4 bg-primary rounded-lg py-2'
									onPress={() => setIsTimeModalVisible(false)}
								>
									<Text className='text-center text-white'>Close</Text>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			{!submitted ? (
				<ScrollView className=' bg-white px-5'>
					<ImageBackground source={require('../../../assets/images/programmer.png')}>
						<View className='flex justify-center gap-x-2 py-3 flex-row my-6'>
							<Image
								source={require('../../../assets/images/video_call.png')}
								alt='VideoCall'
								style={{ width: 40, height: 30 }}
							/>
							<Text className='font-bold text-2xl'>
								Request <Text className='text-primary font-medium'>Meet</Text>
							</Text>
						</View>

						<View className='text-center space-y-4 mx-8'>
							<Text className='font-bold text-xl text-center'>
								Embarking on a Journey Request for Mentorship Meeting
							</Text>
							<Text className='text-base text-center text-gray-600'>
								A meeting request offers students tailored mentorship and support to enhance
								personal development.
							</Text>
						</View>

						<View className='my-10'>
							<View className='flex flex-row gap-5'>
								<View className='mb-4 flex-1 bg-white'>
									<Controller
										name='date_of_meeting'
										control={form.control}
										rules={{ required: true }}
										render={({ field }) => (
											<TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
												<View className='px-3 h-12 text-left font-normal border border-gray-300 rounded-lg flex-row items-center'>
													<Text className='flex-1'>
														{field.value ? format(field.value, 'dd-MM-yyyy') : 'Pick a date'}
													</Text>
													<Feather
														name='calendar'
														size={18}
														color='black'
													/>
												</View>
											</TouchableOpacity>
										)}
									/>
									{form.formState.errors.date_of_meeting && (
										<Text className='text-red-600 font-mada-medium'>
											{form.formState.errors.date_of_meeting?.message}
										</Text>
									)}
								</View>

								<View className='mb-4 flex-1 bg-white'>
									<Controller
										name='time'
										control={form.control}
										rules={{ required: true }}
										render={({ field }) => (
											<TouchableOpacity onPress={() => setIsTimeModalVisible(true)}>
												<View className='h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center'>
													<View className='mr-3'>
														<MaterialIcons
															name='access-time'
															size={18}
															color='#7F7F7F'
														/>
													</View>
													<Text className='flex-1'>{field.value || 'Select a time'}</Text>
												</View>
											</TouchableOpacity>
										)}
									/>
									{form.formState.errors.time && (
										<Text className='text-red-600 font-mada-medium'>
											{form.formState.errors.time?.message}
										</Text>
									)}
								</View>
							</View>

							<View className='mb-4'>
								<Controller
									name='meeting_agenda'
									control={form.control}
									rules={{ required: true }}
									render={({ field }) => (
										<View className='bg-white border border-input-border p-3 rounded-lg flex'>
											<TextInput
												placeholder='Type your doubt here...'
												onBlur={field.onBlur}
												onChangeText={field.onChange}
												value={field.value}
												cursorColor={'#9654F4'}
												multiline={true}
												numberOfLines={8}
												className='text-lg font-mada-regular max-h-60'
											/>
										</View>
									)}
								/>
								{form.formState.errors.meeting_agenda && (
									<Text className='text-red-600 font-mada-medium'>
										{form.formState.errors.meeting_agenda?.message}
									</Text>
								)}
							</View>

							<View className='text-center'>
								<TouchableOpacity
									onPress={form.handleSubmit(onSubmit)}
									className='bg-primary rounded-lg py-2 px-4 font-bold'
								>
									{isSubmitting ? (
										<Text className='text-white text-center'>Submitting...</Text>
									) : (
										<Text className='text-white text-center'>Submit Request</Text>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</ImageBackground>
				</ScrollView>
			) : (
				<View className='relative py-20'>
					<Image
						source={require('../../../assets/images/girl_celebration.png')}
						className='h-[20vh] w-[13vh] opacity-70 mx-5'
					/>

					<View className='absolute top-2 right-2'>
						<TouchableOpacity
							onPress={() => setSubmitted(false)}
							className='border-primary text-primary flex flex-row items-center py-2 px-4 gap-2'
						>
							<Ionicons
								name='arrow-back'
								size={20}
								color='blue'
							/>
							<Text className='text-primary text-center font-black'>Back</Text>
						</TouchableOpacity>
					</View>
					<View className='flex flex-col gap-y-7 items-center justify-center text-center'>
						<View className='w-16 h-16 md:w-20 md:h-20 text-white bg-primary rounded-full flex items-center justify-center shadow-[0_0_32px_0_#9654f4]'>
							<AntDesign
								name='check'
								size={24}
								color='white'
							/>
						</View>
						<Text className='text-primary text-4xl font-bold'>Sent Successfully</Text>
						<View className='text-center'>
							<Text className='text-3xl font-semibold mt-6 text-center'>Thank You!</Text>
							<Text className='font-medium text-xl m-1'>Your Request has been sent</Text>
						</View>
					</View>
					<View className='flex items-end w-full p-5'>
						<Image
							source={require('../../../assets/images/work_discussion.png')}
							className='h-[16vh] w-[17vh]'
						/>
					</View>
				</View>
			)}
		</View>
	);
};

export default RequestMeetingComponent;
