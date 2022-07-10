import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  baseUrl = environment.baseUrl;
  items: Item[] = [];

  itemsUpdated$ = new Subject<Item[]>();

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<Item[]>(this.baseUrl).pipe(
      tap((items) => {
        this.items = items;
      })
    );
  }

  addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    return this.httpClient.post<Item>(this.baseUrl, newItem).pipe(
      tap((item) => {
        if (item) {
          this.items.push(item);
          this.itemsUpdated$.next(this.items);
        }
      })
    );
  }

  deleteItem(id: number) {
    return this.httpClient.delete(this.baseUrl + id).pipe(
      tap(() => {
        const itemIndex = this.items.map((item) => item.id).indexOf(id);
        this.items.splice(itemIndex, 1);
        this.itemsUpdated$.next(this.items);
      })
    );
  }

  updateItem(item: Item) {
    return this.httpClient
      .patch(this.baseUrl + item.id, {
        description: item.description,
        done: item.done,
      })
      .pipe(
        tap(() => {
          const itemIndex = this.items.map((item) => item.id).indexOf(item.id);
          this.items[itemIndex] = item;
          this.itemsUpdated$.next(this.items);
        })
      );
  }
}
