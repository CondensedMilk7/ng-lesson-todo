import { Component, Input } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() item: Item;

  constructor(private itemsService: ItemsService) {}

  onDeleteItem() {
    this.itemsService.deleteItem(this.item.key).subscribe();
  }

  onItemDone() {
    this.itemsService
      .updateItem({ ...this.item, done: !this.item.done })
      .subscribe();
  }
}
