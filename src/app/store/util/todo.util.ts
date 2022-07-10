import { Item } from 'src/app/item.model';

export class TodoUtils {
  public static removeItem(items: Item[], id: number) {
    const result = [...items];
    const itemindex = result.findIndex((i) => i.id === id);
    result.splice(itemindex, 1);
    return result;
  }
}
