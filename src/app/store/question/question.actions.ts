import { createAction, props } from '@ngrx/store';
import { QuestionDataState } from './question.state';

export const loadQuestionsOfExam = createAction(
  '[Question] Load Questions Of Exam',
  props<{ examId: string }>()
);

export const setQuestions = createAction(
  '[Question] Set Questions',
  props<{ questions: QuestionDataState[] }>()
);

export const setCurrentQuestion = createAction(
  '[Question] Set Current Question',
  props<{ question: QuestionDataState }>()
);

export const addAnsweredQuestions = createAction(
  '[Question] Add Answered Question',
  props<{ question: QuestionDataState }>()
);

export const updateQuestion = createAction(
  '[Question] Update Question',
  props<{ questionId: string; selectedAnswer: string }>()
);

export const onNext = createAction(
  '[Question] Next Question',
  props<{ currIndex: number }>()
);

export const onBack = createAction(
  '[Question] Prev Question',
  props<{ currIndex: number }>()
);

export const setCorrectQuestions = createAction(
  '[Question] Set Correct Questions',
  props<{ questionsList: QuestionDataState[] }>()
);

export const setWrongQuestions = createAction(
  '[Question] Set Wrong Questions',
  props<{ questions: QuestionDataState[] }>()
);

export const resetQuestionState = createAction('[Question] Reset State');
