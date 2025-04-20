import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionState } from './question.state';

export const selectQuestionState =
  createFeatureSelector<QuestionState>('question');

export const selectQuestionsList = createSelector(
  selectQuestionState,
  (state) => state.questions
);

// export const selectAnsweredQuestionsList = createSelector(
//   selectQuestionState,
//   (state) => state.questions
// );

export const selectCurrentQuestion = createSelector(
  selectQuestionState,
  (state) => state.currentQuestion
);

export const selectNumberOfCorrect = createSelector(
  selectQuestionState,
  (state) => state.numberOfCorrect
);

export const selectNumberOfWrong = createSelector(
  selectQuestionState,
  (state) => state.numberOfWrong
);

export const selectNumberOfQuestions = createSelector(
  selectQuestionState,
  (state) => state.numberOfQuestions
);
