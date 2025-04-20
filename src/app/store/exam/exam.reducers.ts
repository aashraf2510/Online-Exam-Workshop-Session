import { ExamState } from './exam.state';
import { createReducer, on } from '@ngrx/store';
import * as ExamActions from './exam.actions';

export const examInitialState: ExamState = {
  exam: [],
  examStatus: 'Not Started',
  isExamModalOpen: false,
};

export const examReducer = createReducer(
  examInitialState,
  on(ExamActions.updateExamStatus, (state, { status }) => ({
    ...state,
    examStatus: status,
  })),

  on(ExamActions.toggleModal, (state) => ({
    ...state,
    isExamModalOpen: !state.isExamModalOpen,
  })),

  on(ExamActions.resetExamStatus, () => examInitialState)
);
