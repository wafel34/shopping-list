import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user/user';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss']
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists$: Observable<IShoppingList[]> = this.authService.user$.pipe(
    switchMap((user: IUser) => this.shoppingListService.getShoppingLists(user.uid))
  );

  constructor(
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onListRemove(listId: string) {
    // this.shoppingListService.removeList(listId)
    // .subscribe(() => {})
  }

}
