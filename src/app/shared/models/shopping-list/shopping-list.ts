import { IShoppingListItem } from './shopping-list-item';

export interface IShoppingList {
    id: string;
    date: number;
    name: string;
    users: string[];
    stores: {name: string, store_id: string, items: IShoppingListItem[]}[]
}
