import { z } from "zod";

export const QuizDataFormSchema = z.object({
  subjectName: z
    .object({
      _id: z.string({ required_error: "Please select a subject!" }),
      name: z.string({ required_error: "Please select a subject!" }),
    })
    .nullable(),
  chapterName: z
    .object({
      _id: z.string({ required_error: "Please select a chapter!" }),
      name: z.string({ required_error: "Please select a chapter!" }),
    })
    .nullable(),
  topicNames: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
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
