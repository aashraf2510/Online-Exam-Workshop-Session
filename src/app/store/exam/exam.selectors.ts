import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamState } from '../exam/exam.state';

export const selectExamState = createFeatureSelector<ExamState>('exam');

export const examModal = createSelector(
  selectExamState,
  (state) => state.examModal
);
export const examData = createSelector(selectExamState, (state) => state);
