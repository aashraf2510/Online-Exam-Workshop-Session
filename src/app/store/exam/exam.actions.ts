import { createAction, props } from '@ngrx/store';

export const toggleModal = createAction(
  '[Exam] ToggleModal',
  props<{ isOpen: boolean }>()
);
