import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { trigger } from '@angular/animations';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';


@Component({
    selector: 'app-shopping-list-item',
    templateUrl: './shopping-list-item.component.html',
    styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent {
    readonly STATE_VISIBLE = 'visible';
    readonly STATE_HIDDEN = 'hidden';
    private readonly SNACKBAR_VISIBILITY_DURATION = 2500;

    @Input() item: IShoppingListItem;
    @Output() itemRemovedFromList = new EventEmitter<IShoppingListItem>();
    @Output() itemReAddedToTheList = new EventEmitter<IShoppingListItem>();

    animationState: string;
    private snackbar: MatSnackBarRef<SimpleSnackBar>;

    constructor(private snackbarService: MatSnackBar, private cd: ChangeDetectorRef) {
    }

    startAnimation(state: string) {
        if (this.animationState === this.STATE_HIDDEN) {
            return;
        }
        this.animationState = state;

        this.snackbar = this.snackbarService.open(`Zarchiwizowano: ${this.item.name}`, 'Cofnij', { duration: this.SNACKBAR_VISIBILITY_DURATION });
        this.itemRemovedFromList.emit(this.item);
        this.snackbar.onAction().subscribe(() => {
            this.resetAnimation();
            this.cd.detectChanges();
            this.itemReAddedToTheList.emit(this.item);
        });
    }

    resetAnimation() {
        this.animationState = this.STATE_VISIBLE;
    }

}
