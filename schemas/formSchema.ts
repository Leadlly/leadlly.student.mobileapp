import { z } from 'zod';

export const FormSchema = z.object({
	phoneNumber: z
		.string({ required_error: 'Phone number is required' })
		.length(10, { message: 'Phone number should be exactly 10 characters' })
		.regex(/^\d+$/, { message: 'Phone number should only contain digits' }),
	gender: z.enum(['Male', 'Female', 'Other']).optional(),
	class: z.enum(['11th', '12th']).optional(),
	course: z.enum(['Jee', 'Neet']).optional(),
	schedule: z.string().min(1, 'Please select a schedule option.'),
});