import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  items: Item[] = [
    { description: 'დავურეკო ბებოს', done: false },
    { description: 'ვუყურო ფილმს', done: true },
    { description: 'ავაგო Angular აპლიკაცია', done: false },
    { description: 'გავასეირნო ძაღლი', done: true },
    { description: 'დავალაგო სახლი', done: true },
  ];

  addItem(newItemDesc: string) {
    this.items.unshift({ description: newItemDesc, done: false });
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  finishItem(index: number) {
    this.items[index].done = !this.items[index].done;
  }
}
