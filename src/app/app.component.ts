import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from './item.model';
import { TodoActions } from './store/actions';
import { TodoSelectors } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items$ = this.store.select(TodoSelectors.selectItems);
  loading$ = this.store.select(TodoSelectors.selectLoading);
  error$ = this.store.select(TodoSelectors.selectError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodoActions.getItems());
  }

  onNewItem(description: string) {
    this.store.dispatch(TodoActions.addItem({ description }));
  }

  onDelete(key: string) {
    this.store.dispatch(TodoActions.deleteItem({ key }));
  }

  onUpdateItem(item: Item) {
    this.store.dispatch(TodoActions.updateItem({ item }));
  }
}
