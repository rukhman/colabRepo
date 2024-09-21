import { createReducer, on } from '@ngrx/store';
import { saveJWTTocken } from './auth.actions';

export interface AuthState {
  JWTTocken: number | null;
}

export const initialState: AuthState = {
  JWTTocken: null,
};

export const authReducer = createReducer(
  initialState,
  on(saveJWTTocken, (state) => ({ ...state, JWTTocken: 1 }))
);
