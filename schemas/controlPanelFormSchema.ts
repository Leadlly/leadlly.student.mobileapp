import { z } from "zod";

export const ControlPanelFormSchema = z.object({
  nextDay: z.boolean({
    required_error: "Please select a preference day!",
  }),
  dailyQuestions: z.number({
    required_error: "Please select number of questions!",
  }),
  backRevisionTopics: z.number({
    required_error: "Please select number of back revision topics!",
  }),
});
