import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styleUrls: ['./shopping-list-form.component.scss']
})
export class ShoppingListFormComponent implements OnInit {
  @Input() shoppingList$: Observable<IShoppingList>;
  @Output() formSubmit = new EventEmitter();
  shoppingListForm: FormGroup;
  units: string[] = [
    'szt',
    'kg',
    'g',
    'dg'
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._initForm();
    this._fillForm();
  }

  _initForm() {
    this.shoppingListForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      stores: this.formBuilder.array([
        this._createStore()
      ])
    });
  }

  getStores() {
    return (this.shoppingListForm.get('stores') as FormArray);
  }

  addStore() {
    this.getStores().push(this._createStore());
  }

  getStoreItems(index: number): FormArray {
    return this.shoppingListForm.get(['stores', index, 'items']) as FormArray;
  }

  getStoreItem(storeIndex: number, itemIndex: number): {[key: string]: AbstractControl} {
    return (this.shoppingListForm.get(['stores', storeIndex, 'items', itemIndex]) as FormGroup).controls;
  }

  addProduct(index: number) {
    this.getStoreItems(index).push(this._createStoreItem());
  }

  onSubmit() {
    if (!this.shoppingListForm.valid) {
      return;
    }
    this.formSubmit.emit(this.shoppingListForm.value);
  }

  removeStoreItem(storeIndex: number, itemIndex: number) {
    const storeItems = this.getStoreItems(storeIndex);
    storeItems.removeAt(itemIndex);
  }

  _createStore(): AbstractControl {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      items: this.formBuilder.array([
        this._createStoreItem()
      ])
    });
  }

  _createStoreItem(): AbstractControl {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      quantity: this.formBuilder.control(1),
      unit: this.formBuilder.control('szt'),
      showDescription: this.formBuilder.control(false),
      description: this.formBuilder.control('')
    });
  }

  _fillForm(): void {
    if (!this.shoppingList$) {
      return;
    }
    this.shoppingList$
    .pipe(take(1))
    .subscribe((list: IShoppingList) => {
      const formValue = {
        name: list.name,
        stores: []
      };
      list.stores.forEach((store, index: number) => {
        if (index > 0) {
          this.addStore();
        }
        formValue.stores.push({
          name: store.name,
          items: store.items.map((item: IShoppingListItem, itemIndex: number) => {
            if (itemIndex > 0) {
              this.addProduct(index);

            }
            return {
              name: item.name,
              quantity: item.quantity,
              unit: item.unit,
              showDescription: item.description ? true : false,
              description: item.description || ''
            };
          })
        });
      });


      this.shoppingListForm.setValue(formValue);
    });
  }

}
