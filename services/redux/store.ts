import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import PlannerReducer from "./slices/plannerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todaysPlan: PlannerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
