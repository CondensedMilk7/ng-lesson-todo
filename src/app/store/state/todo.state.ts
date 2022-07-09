import { Item } from 'src/app/item.model';

export interface TodoState {
  items: Item[];
  loading: boolean;
  error: string;
}
