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
  planner: Boolean;
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
    availed?: Boolean;
    active?: Boolean;
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
export type FormType = UseFormReturn<
	{
		phoneNumber: string;
		schedule: string;
		gender?: 'Male' | 'Female' | 'Other' | undefined;
		class?: '11th' | '12th' | undefined;
		course?: 'Jee' | 'Neet' | undefined;
	},
	any,
	undefined
>;