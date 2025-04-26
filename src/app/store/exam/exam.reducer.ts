import { createReducer, on } from '@ngrx/store';
import { ExamState } from './exam.state';
import * as ExamActions from './exam.actions';
import { stat } from 'node:fs/promises';

export const exmaInitialState: ExamState = {
  examStatus: 'Not Started',
  isExamModalOpen: false,
};

// Initial Status  , associated action
export const examReducer = createReducer(
  exmaInitialState,
  on(ExamActions.toggleModal, (state) => ({
    ...state,
    isExamModalOpen: !state.isExamModalOpen,
  })),

  on(ExamActions.updateExamStatus, (state, { status }) => ({
    ...state,
    examStatus: status,
  }))
);
