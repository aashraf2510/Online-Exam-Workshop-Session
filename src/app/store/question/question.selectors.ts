import {
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { QuestionState } from './question.state';

export const selectQuestionState =
  createFeatureSelector<QuestionState>('question');

export const selectQuestions = createSelector(
  selectQuestionState,
  (state) => state.questions
);

export const selectCurrentQuestion = createSelector(
  selectQuestionState,
  (state) => state.currentQuestion
);

export const selectNumberOfQuestions = createSelector(
  selectQuestionState,
  (state) => state.numberOfQuestions
);
