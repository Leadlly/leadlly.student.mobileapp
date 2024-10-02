import { ImageSourcePropType, TextInputProps } from "react-native";

export interface ISubject {
  name: string;
  overall_efficiency: number;
  overall_progress: number;
  total_questions_solved: {
    number?: number;
    percentage?: number;
  };
}

export interface IAcademic {
  standard: number;
  competitiveExam?: string | null;
  subjects?: ISubject[];
  schedule?: string | null;
  coachingMode?: string | null;
  coachingName?: string | null;
  coachingAddress?: string | null;
  schoolOrCollegeName?: string | null;
  schoolOrCollegeAddress?: string | null;
}

export type UserDataProps = {
  token: string;
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: {
    personal?: number;
    other?: number;
  };
  password: string;
  salt: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  planner: boolean;
  parent: {
    name?: string;
    phone?: string;
  };
  address: {
    country?: string;
    addressLine?: string;
    pincode?: number;
  };
  academic: IAcademic;
  about: {
    dateOfBirth?: string;
    gender: string;
  };
  role?: string;
  details?: {
    level?: { number: number };
    points?: { number: number };
    streak?: { number: number };
    mood?: Array<{
      day: string;
      emoji: string;
    }>;
    report?: {
      dailyReport?: {
        date: Date;
        session: number;
        quiz: number;
        overall?: number;
      };
    };
  };
  badges?: Array<{
    name: string;
    url: string;
  }>;
  points?: number;
  subscription: {
    type?: string;
    id?: string;
    status?: string;
    dateOfActivation?: Date;
  };
  freeTrial: {
    availed?: boolean;
    active?: boolean;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
  };
  refund: {
    type?: string;
    subscriptionType?: string;
    status?: string;
    amount?: string;
  };
  createdAt?: Date;
};

export type Topic = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type Chapter = {
  name: string;
  plannerFrequency?: number;
  level?: string;
  overall_efficiency?: number;
  overall_progress?: number;
  total_questions_solved: {
    number?: number;
    percentage?: number;
  };
  studiedAt: {
    date?: Date;
    efficiency?: number;
  }[];
};

export type TRevisionProps = {
  _id: string;
  user: string;
  tag: string;
  topic: Topic;
  chapter: Chapter;
  subject: ISubject;
  standard: number;
  createdAt?: Date;
  updatedAt?: Date;
  efficiency?: any;
  quizScores?: number[];
  weeklyTestScore?: number;
};

export type TDayProps = {
  date: string;
  day: string;
  continuousRevisionTopics: TRevisionProps[];
  backRevisionTopics: TRevisionProps[];
  questions: { [key: string]: any };
  completedTopics: any[];
  incompletedTopics: any[];
  _id: string;
};

export type PlannerDataProps = {
  student: string;
  startDate: string;
  endDate: string;
  days: TDayProps[];
  createdAt: string;
};

export type DataProps = {
  data: PlannerDataProps;
};

export type TTrackerProps = {
  _id: string;
  user: string;
  subject: string;
  chapter: Chapter;
  topics: Topic[];
};

export type TLevelPointProps = {
  cardBgColor: string;
  pointsColor: string;
  points: number;
  pointsText: string;
  progressValue?: number;
  progressIndicatorBg?: string;
};

export type SubjectChaptersProps = {
  _id: string;
  exam: string[];
  name: string;
  standard: number;
  subjectName: string;
  topics: {
    _id: string;
    name: string;
    icon?: React.ComponentType<{ className?: string | undefined }>;
  }[];
};

export type ChapterTopicsProps = {
  _id: string;
  chapterName: string;
  createdAt: string;
  exam: string[];
  name: string;
  standard: number;
  subjectName: string;
  subtopics: any[];
  updatedAt: string;
};

export type TStudentReportProps = {
  startDate: string;
  endDate: string;
  days: Array<{
    day: string;
    date: string;
    session: number;
    quiz: number;
    overall: number;
  }>;
};

export type TStudentOverallReportProps = {
  day: string;
  date: string;
  session: number;
  quiz: number;
  overall: number;
};

export type FormType = UseFormReturn<
  {
    phoneNumber: string;
    schedule: string;
    gender?: "male" | "female" | "other" | undefined;
    class?: "11" | "12" | undefined;
    course?: "JEE" | "NEET" | undefined;
  },
  any,
  undefined
>;

export type StudentPersonalInfoProps = {
  address?: string;
  class?: number | null;
  coachingAddress?: string;
  coachingName?: string;
  coachingType?: string;
  competitiveExam?: string;
  country?: string;
  dateOfBirth?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  messageAboutCompetitiveExam?: string;
  messageAboutStudentSchedule?: string;
  parentName?: string;
  parentsPhone?: number | null;
  phone?: number | null;
  pinCode?: number | null;
  schoolOrCollegeAddress?: string;
  schoolOrCollegeName?: string;
  studentSchedule?: string;
};

export interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  icon2?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  icon2Style?: string;
  className?: string;
  handlePress?: () => void;
}

export type TMeetingsProps = {
  rescheduled: {
    isRescheduled: boolean;
    date: Date;
    time: string;
  };
  gmeet: { link: string | null };
  _id: string;
  date: string;
  time: string;
  student: string;
  mentor: string;
  accepted: boolean;
  message: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isCompleted: boolean;
};

export type TQuizQuestionOptionsProps = {
  name: string;
  tag: "Correct" | "Incorrect";
  images?: Image[];
  _id: string;
};

export type TQuizAnswerProps = {
  question: TQuizQuestionProps;
  studentAnswer: string;
  isCorrect: boolean;
  tag: string;
};

export type Subject = keyof typeof SUBJECT_COLORS;

export interface AttemptedWeeklyQuiz {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  subject: Subject;
  completedDate: string;
  efficiency: number;
  questions: number;
}

export interface AttemptedQuizProps {
  id: number;
  chapterName: string;
  description: string;
  subject: string;
  questions: number;
  completedDate: string;
  efficiency: number;
}

export type WeeklyQuizProps = {
  _id: string;
  user: string;
  questions: {
    [key: string]: {
      _id: string;
      question: string;
      options: {
        name: string;
        tag: string;
        images: string | null;
        _id: string;
      }[];
      standard: number;
      subject: string;
      chapter: string[];
      topics: string[];
      subtopics: string[];
      level: string;
      images: [];
      createdBy: string;
      createdAt: string;
    }[];
  };
  quizType: string;
  attempted: boolean;
  reattempted: number;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type UnattemptedChapterQuizProps = {
  id: number;
  chapterName: string;
  description: string;
  subject: string;
  questions: number;
};

export type QuizReportResponse = {
  status: number;
  topicsWithEfficiency: { topic: string; efficiency: string }[];
  questions: Question[];
  score: number;
  correctAnswers: number;
  inCorrectAnswers: number;
  totalQuestions: number;
};

export type Question = {
  _id: string;
  question: string;
  options: QuestionOption[];
  selectedOption: string;
};

export interface Plan {
  _id: string;
  amount: number;
  category: string;
  createdAt: string;
  currency: string;
  "duration(months)": number;
  planId: string;
  status: string;
  type: string;
}

export interface MergedPlanData extends Plan {
  discountPercentage: number;
  initialPrice: number;
  features: string[];
  image: ImageSourcePropType;
}

export type ChapterProps = {
  chapter: string;
  totalQuestions: number;
};

export type SubjectProps = {
  subject: string;
  chapters: ChapterProps[];
};

export type ErrorNoteProps = {
  _id: string;
  note: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type ErrorBookProps = {
  errorBook?: SubjectProps[];
  errorNotes?: ErrorNoteProps[];
};

export interface QuestionOption {
  name: string;
  tag: "Correct" | "Incorrect";
  images?: Image[];
  _id: string;
}

export interface Image {
  url: string;
  key: string;
  _id: string;
}

export type TQuizQuestionProps = {
  chapter: string[];
  createdAt: string;
  createdBy: string;
  images: Image[];
  level: string;
  options: TQuizQuestionOptionsProps[];
  question: string;
  standard: number;
  subject: string;
  subtopics: string[];
  topics: string[];
  _id: string;
};

export interface ErrorBookQuestion {
  _id: string;
  question: TQuizQuestionProps;
}

export type ChapterErrorBookProps = {
  chapterErrorBook: ErrorBookQuestion[];
  chapterName: string;
};
