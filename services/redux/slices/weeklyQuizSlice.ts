import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TQuizAnswerProps } from "../../../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from "../store";

export interface WeeklyQuizProps {
  quizzes: Array<{
    questionId: string;
    quizId: string;
    topic: { name: string };
    question: TQuizAnswerProps;
  }>;
  loading: boolean;
  saving: boolean;
}

const initialState: WeeklyQuizProps = {
  quizzes: [],
  loading: true,
  saving: false,
};

// Function to load quizzes from AsyncStorage
const loadQuizzesFromStorage = async () => {
  try {
    const storedQuizzes = await AsyncStorage.getItem("leadlly_weekly_quiz");
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  } catch (error) {
    console.error("Failed to load quizzes from AsyncStorage", error);
    return [];
  }
};

export const weeklyQuizSlice = createSlice({
  name: "weeklyQuiz",
  initialState,
  reducers: {
    weeklyQuizData: (state, action: PayloadAction<WeeklyQuizProps['quizzes'][0]>) => {
      const existingQuestionIndex = state.quizzes.findIndex(
        (quiz) => quiz.questionId === action.payload.questionId
      );

      if (existingQuestionIndex !== -1) {
        state.quizzes[existingQuestionIndex] = action.payload;
      } else {
        state.quizzes.push(action.payload);
      }

      AsyncStorage.setItem("leadlly_weekly_quiz", JSON.stringify(state.quizzes));
    },
    clearWeeklyData: (state) => {
      state.quizzes = [];
      state.loading = false;
      state.saving = false;
      AsyncStorage.removeItem("leadlly_weekly_quiz");
    },
    initializeQuizzes: (state, action: PayloadAction<WeeklyQuizProps['quizzes']>) => {
      state.quizzes = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.saving = action.payload;
    },
  },
});

export const { 
  weeklyQuizData, 
  clearWeeklyData, 
  initializeQuizzes, 
  setLoading, 
  setSaving, 
} = weeklyQuizSlice.actions;

export default weeklyQuizSlice.reducer;

export const loadQuizzes = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const quizzes = await loadQuizzesFromStorage();
  if (quizzes.length > 0) {
    dispatch(initializeQuizzes(quizzes));
  } else {
    dispatch(setLoading(false));
  }
};
