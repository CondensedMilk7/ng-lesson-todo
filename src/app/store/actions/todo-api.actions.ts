import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/item.model';

export const getItemsSuccessful = createAction(
  '[Todo Api] Get Items Successful',
  props<{ items: Item[] }>()
);

export const getItemsFailed = createAction(
  '[Todo Api] Get Items Failed',
  props<{ error: string }>()
);

export const addItemSuccessful = createAction(
  '[Todo Api] Add Item Successful',
  props<{ item: Item }>()
);

export const addItemFailed = createAction(
  '[Todo Api] Add Item Failed',
  props<{ error: string }>()
);

export const updateItemSuccessful = createAction(
  '[Todo Api] Update Item Successful',
  props<{ item: Item }>()
);

export const updateItemFailed = createAction(
  '[Todo Api] Update Item Failed',
  props<{ error: string }>()
);

export const deleteItemSuccessful = createAction(
  '[Todo Api] Delete Item Successful',
  props<{ id: number }>()
);

export const deleteItemFailed = createAction(
  '[Todo Api] Delete Item Failed',
  props<{ error: string }>()
);
