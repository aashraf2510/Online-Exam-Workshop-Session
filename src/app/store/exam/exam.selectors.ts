import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamState } from '../exam/exam.state';

// This line creates a selector to access the root state of the exam feature from the global NgRx store.

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
