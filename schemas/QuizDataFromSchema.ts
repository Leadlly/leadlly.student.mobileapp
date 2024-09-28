import { z } from "zod";

export const QuizDataFormSchema = z.object({
  subjectName: z.string({ required_error: "Please select a subject!" }),
  chapterName: z.string({ required_error: "Please select a chapter!" }),
  topicNames: z
    .string({ required_error: "Please select at least one topic" })
    .array()
    .min(1, { message: "Please select at least one topic" })
    .default([]),
  numberOfQuestions: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Please enter a valid number of questions",
    }),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
});
