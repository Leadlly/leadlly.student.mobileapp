import { createSlice } from "@reduxjs/toolkit";
import { TStudentOverallReportProps } from "../../../types/types";

export interface overallReportProps {
  report: TStudentOverallReportProps[] | null;
}

const initialState: overallReportProps = {
  report: null,
};

export const overallReportSlice = createSlice({
  name: "overallReport",
  initialState,
  reducers: {
    overallData: (state, action) => {
      state.report = action.payload;
    },
    removeOverallData: (state) => {
      state.report = null;
    },
  },
});

export const { overallData, removeOverallData } = overallReportSlice.actions;

export default overallReportSlice.reducer;
