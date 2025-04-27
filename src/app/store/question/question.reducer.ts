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

  on(
    QuestionActions.updateQuestion,
    (state, { questionId, selectedAnswer }) => ({
      ...state,
      questions: state.questions.map((q) =>
        q._id === questionId ? { ...q, selectedAnswer } : q
      ),
    })
  ),

  on(QuestionActions.onNext, (state, { currentIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentIndex + 1],
  })),

  on(QuestionActions.onBack, (state, { currentIndex }) => ({
    ...state,
    currentQuestion: state.questions[currentIndex - 1],
  })),

  on(QuestionActions.setWrongQuestions, (state) => ({
    ...state,
    wrongQuestions: state.questions.filter(
      (q) => q.correct != q.selectedAnswer
    ),
    numberOfWrongQuestions: state.questions.filter(
      (q) => q.correct != q.selectedAnswer
    ).length,
  })),

  on(QuestionActions.resetQuestionState, () => questionInitialState)
);
