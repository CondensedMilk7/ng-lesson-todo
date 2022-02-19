import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from './item.model';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  items: Item[];

  itemsUpdated$ = new Subscription();

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
    });

    this.itemsUpdated$ = this.itemsService.itemsUpdated$.subscribe((items) => {
      this.items = items;
    });
  }

  ngOnDestroy(): void {
    this.itemsUpdated$.unsubscribe();
  }
}
