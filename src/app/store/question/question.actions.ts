// Load Questions from API

import { createAction, props } from '@ngrx/store';
import { QuestionAdapt } from '../../core/interfaces/question.interface';

// Load Questions
export const loadQuestions = createAction(
  '[Question] Load Questions',
  props<{ examId: string }>()
);

export const setQuestions = createAction(
  '[Question] Set Questions',
  props<{ questions: QuestionAdapt[] }>()
);

export const setCurrentQuestion = createAction(
  '[Question] Set Current Question',
  props<{ question: QuestionAdapt }>()
);

export const updateQuestion = createAction(
  '[Question] Update Question',
  props<{ questionId: string; selectedAnswer: string }>()
);

export const onNext = createAction(
  '[Question] On Next',
  props<{ currentIndex: number }>()
);

export const onBack = createAction(
  '[Question] On Back',
  props<{ currentIndex: number }>()
);

export const setWrongQuestions = createAction('[Question] Set Wrong Questions');

// Reset State
export const resetQuestionState = createAction(
  '[Question] Reset Question Sate'
);
