import { IShoppingListItem } from './shopping-list-item';

export interface IShoppingListGroupped {
    status: string;
    groups: Array<{
        group: String,
        items: IShoppingListItem[]
    }>
}
