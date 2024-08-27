import { createSlice } from "@reduxjs/toolkit";
import { TStudentReportProps } from "../../../types/types";

export interface weeklyReportProps {
  report: TStudentReportProps | null;
}

const initialState: weeklyReportProps = {
  report: null,
};

const weeklyReportSlice = createSlice({
  name: "weeklyReport",
  initialState,
  reducers: {
    weeklyData: (state, action) => {
      state.report = action.payload;
    },
    removeWeeklyData: (state) => {
      state.report = null;
    },
  },
});

export const { weeklyData, removeWeeklyData } = weeklyReportSlice.actions;

export default weeklyReportSlice.reducer;
