import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.scss']
})
export class ShoppingListAddComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onFormSubmit(list: IShoppingList) {
    this.shoppingListService.createList(list)
      .pipe(take(1))
      .subscribe((entry: DocumentReference) => {
      });
  }

}
