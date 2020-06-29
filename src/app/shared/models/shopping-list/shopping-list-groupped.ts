import { IShoppingListItem } from './shopping-list-item';

export interface IShoppingListGroupped {
    groups: Array<{
        group: String,
        items: IShoppingListItem[]
    }>
}
