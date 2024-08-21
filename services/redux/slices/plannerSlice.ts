import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDayProps } from "../../../types/types";

export interface PlannerProps {
  plan: TDayProps | null;
  loading: boolean;
}

const initialState: PlannerProps = {
  plan: null,
  loading: true,
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    setTodaysPlan: (state, action: PayloadAction<TDayProps>) => {
      state.plan = action.payload;
      state.loading = false;
    },
    removeTodaysPlan: (state) => {
      state.plan = null;
      state.loading = false;
    },
  },
});

export const { setTodaysPlan, removeTodaysPlan } = plannerSlice.actions;

export default plannerSlice.reducer;
