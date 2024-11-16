import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuizAnswerProps } from "../../../types/types";
import { AppDispatch } from "../store";

export interface DailyQuizProps {
  dailyQuizzes: Array<{
    topicName: string | null;
    attemptedQuestions: TQuizAnswerProps[];
  }>;
}

const loadAttemptedQuestionsFromStorage = async () => {
  try {
    const attemptedQuestions = await AsyncStorage.getItem(
      "attemptedQuestionsFromDailyQuiz"
    );
    return attemptedQuestions ? JSON.parse(attemptedQuestions) : [];
  } catch (error) {
    console.error("Failed to load attemptedQuestions", error);
    return [];
  }
};

const initialState: DailyQuizProps = {
  dailyQuizzes: [],
};

const dailyQuizSlice = createSlice({
  name: "daily_quiz",
  initialState,
  reducers: {
    dailyQuizAttemptedQuestions: (
      state,
      action: PayloadAction<DailyQuizProps["dailyQuizzes"][0]>
    ) => {
      const currentTopic = state.dailyQuizzes.find(
        (quiz) => quiz.topicName === action.payload.topicName
      );

      if (currentTopic) {
        currentTopic.attemptedQuestions.push(
          ...action.payload.attemptedQuestions
        );

        state.dailyQuizzes.push(currentTopic);
      } else {
        state.dailyQuizzes.push(action.payload);
      }
      AsyncStorage.setItem(
        "attemptedQuestionsFromDailyQuiz",
        JSON.stringify(state.dailyQuizzes)
      );
    },

    filterCompletedTopics: (
      state,
      action: PayloadAction<{ topicName: string }>
    ) => {
      state.dailyQuizzes = state.dailyQuizzes.filter(
        (quiz) => quiz.topicName !== action.payload.topicName
      );
      AsyncStorage.setItem(
        "attemptedQuestionsFromDailyQuiz",
        JSON.stringify(state.dailyQuizzes)
      );
    },

    clearAttemptedQuestions: (state) => {
      state.dailyQuizzes = [];
      AsyncStorage.removeItem("attemptedQuestionsFromDailyQuiz");
    },

    initializeQuizzes: (
      state,
      action: PayloadAction<DailyQuizProps["dailyQuizzes"]>
    ) => {
      state.dailyQuizzes = action.payload;
    },
  },
});

export const {
  clearAttemptedQuestions,
  dailyQuizAttemptedQuestions,
  initializeQuizzes,
  filterCompletedTopics,
} = dailyQuizSlice.actions;

export default dailyQuizSlice.reducer;

export const loadDailyQuizzes = () => async (dispatch: AppDispatch) => {
  const attemptedQuestions = await loadAttemptedQuestionsFromStorage();
  if (attemptedQuestions.length > 0) {
    dispatch(initializeQuizzes(attemptedQuestions));
  } else {
    dispatch(initializeQuizzes([]));
  }
};
