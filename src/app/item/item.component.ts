import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Item;
  @Output() delete = new EventEmitter<string>();
  @Output() updateItem = new EventEmitter<Item>();

  onDeleteItem() {
    this.delete.emit(this.item.key);
  }

  onItemDone() {
    this.updateItem.emit({ ...this.item, done: !this.item.done });
  }
}
