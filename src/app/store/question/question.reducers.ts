import { createReducer, on } from '@ngrx/store';
import { QuestionState } from './question.state';
import * as QuestionActions from './question.actions';

export const questionInitialState: QuestionState = {
  currentQuestion: null,
  questions: [],
  numberOfCorrect: 0,
  numberOfWrong: 0,
  numberOfQuestions: 0,
  wrongQuestions: [],
};

export const questionReducer = createReducer(
  questionInitialState,
  on(QuestionActions.setQuestions, (state, { questions }) => ({
    ...state,
    questions,
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

  on(QuestionActions.onNext, (state, { currIndex }) => ({
    ...state,
    currentQuestion: state.questions[currIndex + 1],
  })),

  on(QuestionActions.onBack, (state, { currIndex }) => ({
    ...state,
    currentQuestion: state.questions[currIndex - 1],
  })),

  on(QuestionActions.resetQuestionState, () => questionInitialState)
);
