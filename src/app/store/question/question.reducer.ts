import { createReducer, on } from '@ngrx/store';
import { QuestionState } from './question.state';
import * as QuestionActions from './question.actions';
import { stat } from 'fs';

export const questionInitialState: QuestionState = {
  questions: [],
  currentQuestion: null,
  wrongQuestions: [],
  numberOfQuestions: 0,
  numberOfWrongQuestions: 0,
};

export const questionReducer = createReducer(
  questionInitialState,

  on(QuestionActions.loadQuestions, () => questionInitialState),

  on(QuestionActions.setQuestions, (state, { questions }) => ({
    ...state,
    questions: questions,
    numberOfQuestions: questions.length,
  })),

  on(QuestionActions.setCurrentQuestion, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  })),

  on(QuestionActions.resetQuestionState, () => questionInitialState)
);
