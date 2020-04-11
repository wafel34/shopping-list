export interface IShoppingListItem {
    id: string;
    store: string;
    status: string;
    name: string;
    quantity: number;
    description: string | null;
}
