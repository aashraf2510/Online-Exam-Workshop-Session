import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  token: null,
  rememberMe: false,
};

export const tokenReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, rememberMe }) => ({
    ...state,
    token,
    rememberMe,
  }))
);
