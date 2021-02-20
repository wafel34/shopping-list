import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/shared/models/stores/store';
import {IUser} from '../../../../shared/models/user/user';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  formData$: Observable<[IUser[], IStore[], IShoppingList]> =
    this.shoppingListService.getFormData(false, this.router.snapshot.params.id);

  constructor(
    private shoppingListService: ShoppingListService,
    private router: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
  }

  onFormSubmit(list: IShoppingList) {
    this.shoppingListService.updateList(this.router.snapshot.params.id, list);
  }

}
