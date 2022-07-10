import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../state';

export const selectTodo = createFeatureSelector<TodoState>('todo');

export const selectLoading = createSelector(
  selectTodo,
  (state: TodoState) => state.loading
);

export const selectItems = createSelector(
  selectTodo,
  (state: TodoState) => state.items
);

export const selectError = createSelector(
  selectTodo,
  (state: TodoState) => state.error
);
