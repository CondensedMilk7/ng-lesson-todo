import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  onNewItem(inputElement: HTMLInputElement) {
    const newItemDesc = inputElement.value;
    if (newItemDesc) {
      this.itemsService.addItem(inputElement.value);
      inputElement.value = '';
    }
  }
}
