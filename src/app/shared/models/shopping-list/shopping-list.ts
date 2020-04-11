import { IShoppingListItem } from './shopping-list-item';

export interface IShoppingList {
    status: string;
    items: IShoppingListItem[];
}
