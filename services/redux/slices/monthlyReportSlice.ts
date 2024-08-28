import { createSlice } from "@reduxjs/toolkit";
import { TStudentReportProps } from "../../../types/types";

export interface monthlyReportProps {
  report: TStudentReportProps | null;
}

const initialState: monthlyReportProps = {
  report: null,
};

export const monthlyReportSlice = createSlice({
  name: "monthlyReport",
  initialState,
  reducers: {
    monthlyData: (state, action) => {
      state.report = action.payload;
    },
    removeMonthlyData: (state) => {
      state.report = null;
    },
  },
});

export const { monthlyData, removeMonthlyData } = monthlyReportSlice.actions;

export default monthlyReportSlice.reducer;
