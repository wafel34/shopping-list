import { IShoppingListItem } from './shopping-list-item';

export interface IShoppingList {
    id: number;
    date: Date;
    name: string;
    items: IShoppingListItem[];
}
