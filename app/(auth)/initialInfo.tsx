import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Progress from '../../components/AuthComponents/Progress';
import PhoneNumberForm from '../../components/AuthComponents/PhoneNumberForm';
import { useState } from 'react';
import GenderForm from '../../components/AuthComponents/GenderForm';
import ClassForm from '../../components/AuthComponents/ClassForm';
import CourseForm from '../../components/AuthComponents/CourseForm';
import ScheduleForm from '../../components/AuthComponents/ScheduleForm';
import { useForm } from 'react-hook-form';
import { FormSchema } from '../../schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const initialInfo = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			phoneNumber: '',
			gender: undefined,
			class: undefined,
			course: undefined,
			schedule: '',
		},
	});

	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	function back() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}
	function next() {
		setTimeout(() => {
			setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
		}, 200);
	}
	const steps = [
		<PhoneNumberForm
			next={next}
			form={form}
		/>,
		<GenderForm
			next={next}
			form={form}
		/>,
		<ClassForm
			next={next}
			form={form}
		/>,
		<CourseForm
			next={next}
			form={form}
		/>,
		<ScheduleForm
			next={next}
			form={form}
		/>,
	];
	return (
		<SafeAreaView>
			<Progress
				currentStep={currentStepIndex}
				steps={steps.length}
				back={back}
			/>
			<View>{steps[currentStepIndex]}</View>
		</SafeAreaView>
	);
};
export default initialInfo;
const styles = StyleSheet.create({});
