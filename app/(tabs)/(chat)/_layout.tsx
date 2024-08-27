import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { colors } from '../../../constants/constants';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTobTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

const PlannerLayout = () => {
	return (
		<MaterialTobTabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: '#000000',
				tabBarLabelStyle: {
					fontSize: 15,
					paddingVertical:5,
					fontFamily: 'Mada-SemiBold',
					textTransform: 'capitalize',
				},
				tabBarIndicatorStyle: {
					backgroundColor: colors.primary,
					height: 3,
					borderRadius: 999,
				},
				tabBarStyle: {
					borderBottomColor: colors.inputBorder,
					borderBottomWidth: 1,
					marginTop: 30,
				},
			}}
		>
			<MaterialTobTabs.Screen
				name='chats'
				options={{ title: 'Chats' }}
			/>
			<MaterialTobTabs.Screen
				name='meetings'
				options={{ title: 'Meetings' }}
			/>
			<MaterialTobTabs.Screen
				name='requestMeeting'
				options={{ title: 'Request Meeting' }}
			/>
		</MaterialTobTabs>
	);
};

export default PlannerLayout;
