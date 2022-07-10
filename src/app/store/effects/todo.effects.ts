import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ItemsService } from 'src/app/items.service';
import { TodoActions, TodoApiActions } from '../actions';

@Injectable()
export class TodoEffects {
  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.getItems),
      mergeMap(() =>
        this.itemsService.getItems().pipe(
          map((items) => TodoApiActions.getItemsSuccessful({ items })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to get items!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  addItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.addItem),
      mergeMap(({ description }) =>
        this.itemsService.addItem(description).pipe(
          map((item) => TodoApiActions.addItemSuccessful({ item })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to add item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.deleteItem),
      mergeMap(({ id }) =>
        this.itemsService.deleteItem(id).pipe(
          map((id) => TodoApiActions.deleteItemSuccessful({ id })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to delete item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.updateItem),
      mergeMap(({ item }) =>
        this.itemsService.updateItem(item).pipe(
          map((item) => TodoApiActions.updateItemSuccessful({ item })),
          catchError((err: HttpErrorResponse) =>
            of(
              TodoApiActions.getItemsFailed({
                error: `Failed to update item!: Server responded with: ${err.message}`,
              })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private itemsService: ItemsService) {}
}
