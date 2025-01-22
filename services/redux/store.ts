import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import PlannerReducer from "./slices/plannerSlice";
import WeeklyQuizReducer from "./slices/weeklyQuizSlice";
import DailyQuizReducer from "./slices/dailyQuizSlice";
import unreadMessagesReducer from "./slices/unreadMessageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todaysPlan: PlannerReducer,
    weeklyQuizzes: WeeklyQuizReducer,
    dailyQuizzes: DailyQuizReducer,
    unreadMessages: unreadMessagesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
