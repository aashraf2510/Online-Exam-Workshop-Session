import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamState } from './exam.state';

// Selector to access the root state of the exam feature from the global store
export const selectExamState = createFeatureSelector<ExamState>('exam');

export const selectExamModal = createSelector(
  selectExamState,
  (state) => state.isExamModalOpen
);

export const selectExamStatus = createSelector(
  selectExamState,
  (state) => state.examStatus
);
