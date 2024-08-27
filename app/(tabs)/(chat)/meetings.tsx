import * as React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TMeetingsProps } from '../../../types/types';
import { convertDateString, formatDate } from '../../../helpers/utils';
import { AntDesign } from '@expo/vector-icons';

const upcomingMeetings: TMeetingsProps[] = [
	{
		_id: '1',
		date: '2024-09-01',
		time: '10:00 AM',
		student: 'Student A',
		mentor: 'Mentor X',
		accepted: true,
		message: 'Project Kickoff Meeting',
		rescheduled: {
			isRescheduled: false,
			date: new Date('2024-09-01'),
			time: '10:00 AM',
		},
		gmeet: {
			link: 'https://meet.google.com/example',
		},
		isCompleted: false,
		createdAt: '2024-08-01',
		updatedAt: '2024-08-01',
		createdBy: 'admin',
	},
	{
		_id: '2',
		date: '2024-09-05',
		time: '02:00 PM',
		student: 'Student B',
		mentor: 'Mentor Y',
		accepted: false,
		message: 'Design Review',
		rescheduled: {
			isRescheduled: true,
			date: new Date('2024-09-06'),
			time: '03:00 PM',
		},
		gmeet: {
			link: null,
		},
		isCompleted: false,
		createdAt: '2024-08-01',
		updatedAt: '2024-08-01',
		createdBy: 'admin',
	},
];

const doneMeetings: TMeetingsProps[] = [
	{
		_id: '3',
		date: '2024-08-20',
		time: '11:00 AM',
		student: 'Student C',
		mentor: 'Mentor Z',
		accepted: true,
		message: 'Retrospective Meeting',
		rescheduled: {
			isRescheduled: false,
			date: new Date('2024-08-20'),
			time: '11:00 AM',
		},
		gmeet: {
			link: null,
		},
		isCompleted: true,
		createdAt: '2024-07-20',
		updatedAt: '2024-08-20',
		createdBy: 'admin',
	},
	{
		_id: '1',
		date: '2024-09-01',
		time: '10:00 AM',
		student: 'Student A',
		mentor: 'Mentor X',
		accepted: true,
		message: 'Project Kickoff Meeting',
		rescheduled: {
			isRescheduled: false,
			date: new Date('2024-09-01'),
			time: '10:00 AM',
		},
		gmeet: {
			link: 'https://meet.google.com/example',
		},
		isCompleted: false,
		createdAt: '2024-08-01',
		updatedAt: '2024-08-01',
		createdBy: 'admin',
	},
	{
		_id: '2',
		date: '2024-09-05',
		time: '02:00 PM',
		student: 'Student B',
		mentor: 'Mentor Y',
		accepted: false,
		message: 'Design Review',
		rescheduled: {
			isRescheduled: true,
			date: new Date('2024-09-06'),
			time: '03:00 PM',
		},
		gmeet: {
			link: null,
		},
		isCompleted: false,
		createdAt: '2024-08-01',
		updatedAt: '2024-08-01',
		createdBy: 'admin',
	},
];

const UpcomingMeetingsRoute = () => (
	<ScrollView className='flex-1 bg-[#F7F3FE] p-4 '>
		{upcomingMeetings.length ? (
			upcomingMeetings.map((meeting) => (
				<View
					key={meeting._id}
					className='flex-row border border-gray-200 rounded-lg p-4 my-2 bg-white shadow'
				>
					<View className='bg-[#CCE4FF] rounded-lg w-24 items-center justify-center p-2 '>
						<Text className='text-lg font-semibold'>
							{meeting.rescheduled.isRescheduled
								? formatDate(meeting.rescheduled.date)
								: formatDate(new Date(meeting.date))}
						</Text>
						<Text className='text-sm text-gray-600 font-semibold'>
							{meeting.rescheduled.isRescheduled ? meeting.rescheduled.time : meeting.time}
						</Text>
					</View>
					<View className='flex-1 pl-4 justify-between'>
						<Text
							numberOfLines={1}
							className='text-lg font-bold '
						>
							{meeting.message ? meeting.message : 'New Meeting'}
						</Text>
						<View className='flex items-center gap-1 flex-row'>
							<AntDesign
								name='clockcircleo'
								size={14}
								color='blue'
							/>
							<Text className='text-sm  text-primary'>
								{meeting.isCompleted ? 'Meeting Over' : 'Upcoming Meeting'}
							</Text>
						</View>

						{meeting.gmeet && meeting.gmeet.link ? (
							<TouchableOpacity onPress={() => Linking.openURL(meeting.gmeet.link || '#')}>
								<View className='bg-blue-500 rounded-md py-2 px-4 mt-4'>
									<Text className='text-white text-center font-semibold'>Join Meeting</Text>
								</View>
							</TouchableOpacity>
						) : (
							<View className='bg-blue-500/60 rounded-md py-2 px-4 mt-4'>
								<Text className='text-white text-center font-semibold '>Join Meeting</Text>
							</View>
						)}
					</View>
				</View>
			))
		) : (
			<Text className='text-center text-gray-600   text-xl font-bold'>No meetings yet!</Text>
		)}
	</ScrollView>
);

const DoneMeetingsRoute = () => (
	<ScrollView className='flex-1 bg-[#F7F3FE] p-4'>
		{doneMeetings.length ? (
			doneMeetings.map((meeting) => (
				<View
					key={meeting._id}
					className='border border-gray-200 bg-white rounded-lg p-4 my-2 '
				>
					<Text className='text-lg font-semibold'>{meeting.message}</Text>
					<Text className='text-sm text-gray-600'>
						Date:{' '}
						{meeting.rescheduled.isRescheduled
							? convertDateString(meeting.rescheduled.date)
							: convertDateString(new Date(meeting.date))}
					</Text>
				</View>
			))
		) : (
			<Text className='text-center text-gray-600 text-xl font-bold'>No meetings done yet!</Text>
		)}
	</ScrollView>
);

const MeetingsComponent: React.FC = () => {
	const [index, setIndex] = useState<number>(0);
	const [routes] = useState([
		{ key: 'upcoming', title: 'Upcoming ' },
		{ key: 'done', title: 'Done ' },
	]);

	const renderScene = SceneMap({
		upcoming: UpcomingMeetingsRoute,
		done: DoneMeetingsRoute,
	});

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: Dimensions.get('window').width }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					indicatorStyle={{ backgroundColor: '#9654F4' }}
					labelStyle={{ color: 'black', fontWeight: 'bold' }}
					style={{ backgroundColor: '#E9EBF8' }}
					activeColor='#9654F4'
				/>
			)}
		/>
	);
};

export default MeetingsComponent;
