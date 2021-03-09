import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/shared/models/stores/store';
import { IUser } from '../../../../shared/models/user/user';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

  formData$: Observable<[IUser[], IStore[], IShoppingList]> =
    this.shoppingListService.getFormData(false, this.router.snapshot.params.id);
  private snackbar: MatSnackBarRef<SimpleSnackBar>;
  private SNACKBAR_VISIBILITY_DURATION = 5000;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: ActivatedRoute,
    private snackbarService: MatSnackBar
    ) {
  }

  ngOnInit(): void {
  }

  onFormSubmit(list: IShoppingList) {
    this.shoppingListService.updateList(this.router.snapshot.params.id, list)
        .then(() => {
          this.snackbar = this.snackbarService.open('Zaktualizowano pomyślnie', 'OK', {duration: this.SNACKBAR_VISIBILITY_DURATION});
        })
        .catch(() => {
          this.snackbar = this.snackbarService.open('Coś poszło nie tak :(', 'OK', {duration: this.SNACKBAR_VISIBILITY_DURATION});
        });
  }

}
