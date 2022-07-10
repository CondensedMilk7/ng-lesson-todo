import { Item } from 'src/app/item.model';

export class TodoUtils {
  public static removeItem(items: Item[], key: string) {
    const result = [...items];
    const itemindex = result.findIndex((i) => i.key === key);
    result.splice(itemindex, 1);
    return result;
  }
}
