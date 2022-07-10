import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/item.model';

export const addItem = createAction(
  '[Todo Page] Add Item',
  props<{ description: string }>()
);

export const deleteItem = createAction(
  '[Todo Page] Delete Item',
  props<{ id: number }>()
);

export const updateItem = createAction(
  '[Todo Page] Update Item',
  props<{ item: Item }>()
);

export const getItems = createAction('[Todo Page] Get Items');
