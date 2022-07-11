import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Output() newItem = new EventEmitter<string>();

  onNewItem(inputElement: HTMLInputElement) {
    const newItemDesc = inputElement.value;
    if (newItemDesc) {
      this.newItem.emit(newItemDesc);
      inputElement.value = '';
    }
  }
}
