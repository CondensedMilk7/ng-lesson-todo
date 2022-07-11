import { createReducer, on } from '@ngrx/store';
import { TodoActions, TodoApiActions } from '../actions';
import { TodoState } from '../state';
import { TodoUtils } from '../util/todo.utils';

const initialState: TodoState = {
  items: [],
  loading: false,
  error: '',
};

export const todoReducer = createReducer(
  initialState,

  // Get Items
  on(TodoActions.getItems, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.getItemsSuccessful, (state, { items }) => ({
    ...state,
    items: items,
    loading: false,
  })),
  on(TodoApiActions.getItemsFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Add Item
  on(TodoActions.addItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.addItemSuccessful, (state, { item }) => ({
    ...state,
    items: [item, ...state.items],
    loading: false,
  })),
  on(TodoApiActions.addItemFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Delete Item
  on(TodoActions.deleteItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.deleteItemSuccessful, (state, { id }) => ({
    ...state,
    items: TodoUtils.removeItem(state.items, id),
    loading: false,
  })),
  on(TodoApiActions.deleteItemFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // Update Item
  on(TodoActions.updateItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.updateItemSuccessful, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => {
      if (i.id === item.id) {
        return item;
      } else {
        return i;
      }
    }),
    loading: false,
  })),
  on(TodoApiActions.updateItemFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
