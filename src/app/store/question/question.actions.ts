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

// Reset State
export const resetQuestionState = createAction(
  '[Question] Reset Question Sate'
);
