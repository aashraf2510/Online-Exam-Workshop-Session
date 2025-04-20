import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamState } from '../exam/exam.state';

export const selectExamState = createFeatureSelector<ExamState>('exam');

export const selectExamStatus = createSelector(
  selectExamState,
  (state) => state.examStatus
);

export const selectExamModal = createSelector(
  selectExamState,
  (state) => state.isExamModalOpen
);

// export const examData = createSelector(selectExamState, (state) => state);
