import { createAction, props } from '@ngrx/store';
import { exmStatus } from './exam.state';

export const toggleModal = createAction('[Exam] ToggleModal');

export const updateExamStatus = createAction(
  '[Exam] Update Exam Status',
  props<{ status: exmStatus }>()
);

export const resetExamState = createAction('[Exam] Reset Exam State');
