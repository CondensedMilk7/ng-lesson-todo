import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  baseUrl = environment.baseUrl;
  items: Item[] = [];

  itemsUpdated$ = new Subject<Item[]>();

  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.httpClient.get(`${this.baseUrl}todos.json`).pipe(
      map((response) => {
        if (response) {
          const todoArray = [];
          for (let key in response) {
            todoArray.push({ ...response[key], key: key });
          }
          return todoArray;
        } else {
          return [];
        }
      })
    );
  }

  addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    return this.httpClient.post(`${this.baseUrl}todos.json`, newItem).pipe(
      map((response: { name: string }) => {
        return { ...newItem, key: response.name };
      })
    );
  }

  deleteItem(key: string) {
    return this.httpClient.delete(`${this.baseUrl}todos/${key}.json`).pipe(
      map(() => {
        return key;
      })
    );
  }

  updateItem(item: Item) {
    return this.httpClient
      .patch(`${this.baseUrl}todos/${item.key}.json`, {
        description: item.description,
        done: item.done,
      })
      .pipe(
        map(() => {
          return item;
        })
      );
  }
}
