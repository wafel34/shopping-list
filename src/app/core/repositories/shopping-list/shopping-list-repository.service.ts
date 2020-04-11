import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListRepositoryService {
 
  constructor(private httpService: HttpClient) { }

  getList(id: string): Observable<IShoppingList> {
    return this.httpService.get<IShoppingList>(`shopping-lists/${id}`);
  }

}