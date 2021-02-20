import {Injectable} from '@angular/core';
import {ShoppingListRepositoryService} from '../../repositories/shopping-list/shopping-list-repository.service';
import {BehaviorSubject, Observable, of, zip} from 'rxjs';
import {IShoppingList} from 'src/app/shared/models/shopping-list/shopping-list';
import {IShoppingListItem} from 'src/app/shared/models/shopping-list/shopping-list-item';
import {switchMap, take} from 'rxjs/operators';
import {IGoogleUser} from '../../../shared/models/user/google-user';
import {IUser} from '../../../shared/models/user/user';
import {IStore} from '../../../shared/models/stores/store';
import {AuthService} from '../auth/auth.service';
import {ContactsRepositoryService} from '../../repositories/contacts/contacts-repository.service';
import {StoresService} from '../stores/stores.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private singleList = new BehaviorSubject<IShoppingList>(null);

  readonly singleList$ = this.singleList.asObservable();

  constructor(
    private shoppingListRepository: ShoppingListRepositoryService,
    private authService: AuthService,
    private contactsService: ContactsRepositoryService,
    private storesService: StoresService
  ) {
  }

  getFormData(newForm: boolean, listId?: string): Observable<[IUser[], IStore[], IShoppingList]> {
    const shoppingList$ = newForm ? of(null) : this.getSingleList(listId);

    return this.authService.user$.pipe(
      switchMap(user => {
        return zip(
          this.contactsService.getUserContacts(user.uid),
          this.storesService.getStores(),
          shoppingList$
        );
      })
    );
  }

  getSingleList(id: string): Observable<IShoppingList> {
    const result = this.shoppingListRepository.getList(id);

    result.subscribe(list => this.setSingleListValue(list));

    return result;
  }

  archiveListItem(item: IShoppingListItem) {
  }

  getShoppingLists(userName: string): Observable<IShoppingList[]> {
    return this.shoppingListRepository.getLists(userName);
  }

  createList(list: IShoppingList): Observable<void> {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user: IGoogleUser) => this.shoppingListRepository.createList(user.uid, list))
    );
  }

  removeList(id: string) {
    return this.shoppingListRepository.removeList(id);
  }

  updateList(id: string, list: IShoppingList) {
    return this.shoppingListRepository.updateList(id, list);
  }

  private setSingleListValue(value) {
    this.singleList.next(value);
  }
}
