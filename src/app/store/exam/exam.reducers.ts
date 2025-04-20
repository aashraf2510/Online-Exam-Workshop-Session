import { ExamModalState, ExamState } from './exam.state';
import { createReducer, on } from '@ngrx/store';
import * as ExamActions from './exam.actions';

export const examInitialState: ExamState = {
  examModal: {
    isOpen: false,
  },
  exam: [],
};

export const examReducer = createReducer(
  examInitialState,
  on(ExamActions.toggleModal, (state, { isOpen }) => ({
    ...state,
    examModal: {
      ...state.examModal,
      isOpen,
    },
  }))
);
