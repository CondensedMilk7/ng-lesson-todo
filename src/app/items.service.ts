import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<Item[]>(this.baseUrl);
  }

  addItem(newItemDesc: string) {
    const newItem = {
      description: newItemDesc,
      done: false,
    };
    return this.httpClient.post<Item>(this.baseUrl, newItem);
  }

  deleteItem(id: number) {
    return this.httpClient.delete(this.baseUrl + id).pipe(
      map(() => {
        return id;
      })
    );
  }

  updateItem(item: Item) {
    return this.httpClient.patch<Item>(this.baseUrl + item.id, {
      description: item.description,
      done: item.done,
    });
  }
}
