import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {take} from 'rxjs/operators';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { IStore } from 'src/app/shared/models/stores/store';
import {IUser} from '../../../../shared/models/user/user';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.scss']
})
export class ShoppingListAddComponent implements OnInit {
  formData$: Observable<[IUser[], IStore[], IShoppingList]> =
    this.shoppingListService.getFormData(true);


  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {

  }

  onFormSubmit(list: IShoppingList) {
    this.shoppingListService.createList(list)
      .pipe(take(1))
      .subscribe((entry) => {
        console.log(entry);
      });
  }

}
