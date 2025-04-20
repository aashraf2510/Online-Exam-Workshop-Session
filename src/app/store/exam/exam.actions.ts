import { createAction, props } from '@ngrx/store';
import { examStatus } from './exam.state';

export const toggleModal = createAction('[Exam] ToggleModal');

export const updateExamStatus = createAction(
  '[Exam] Update Exam Status',
  props<{ status: examStatus }>()
);

export const resetExamStatus = createAction('[Exam] Reset Exam Status');
