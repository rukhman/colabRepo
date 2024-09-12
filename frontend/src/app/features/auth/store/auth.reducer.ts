import { createReducer, on } from '@ngrx/store';
import { saveJWTTocken } from './auth.actions';

interface InitialState {
  JWTTocken: number | null;
}

export const initialState: InitialState = {
  JWTTocken: null,
};

export const authReducer = createReducer(
  initialState,
  on(saveJWTTocken, (state) => ({ ...state, JWTTocken: 1 }))
);
