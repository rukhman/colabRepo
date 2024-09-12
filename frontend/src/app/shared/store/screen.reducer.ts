import { createReducer, on } from '@ngrx/store';
import { setScreen } from './screen.actions';

export const initialState = 1;

export const screenReducer = createReducer(
  initialState,
  on(setScreen, (state) => state)
);
