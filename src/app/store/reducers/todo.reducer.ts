import { createReducer, on } from '@ngrx/store';
import { TodoActions, TodoApiActions } from '../actions';
import { TodoState } from '../state';

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
  })),

  // Delete Item
  on(TodoActions.deleteItem, (state) => ({ ...state, loading: true })),
  on(TodoApiActions.deleteItemSuccessful, (state, { key }) => ({
    ...state,
    items: state.items.splice(
      state.items.findIndex((item) => item.key === key)
    ),
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
      if (i.key === item.key) {
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
