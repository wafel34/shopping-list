import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingList } from 'src/app/shared/models/shopping-list/shopping-list';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { IShoppingListItem } from 'src/app/shared/models/shopping-list/shopping-list-item';
import { EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { IStore } from 'src/app/shared/models/stores/store';
import { IUser } from '../../../../shared/models/user/user';
import { UNITS } from '../../../../config/units';

@Component({
    selector: 'app-shopping-list-form',
    templateUrl: './shopping-list-form.component.html',
    styleUrls: ['./shopping-list-form.component.scss']
})
export class ShoppingListFormComponent implements OnInit {
    @Input() formData$: Observable<[IUser[], IStore[], IShoppingList]>;
    @Output() formSubmit = new EventEmitter();
    contacts: IUser[] = [];
    stores: IStore[] = [];
    units: string[] = UNITS;
    shoppingList: IShoppingList;
    shoppingListForm: FormGroup;

    formDataLoaded = false;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.formData$
            .subscribe(([contacts, stores, shoppingList]) => {
                console.log(contacts);
                this.formDataLoaded = true;
                this.contacts = contacts;
                this.stores = stores;
                this.shoppingList = shoppingList;
                this._initForm();
                this._fillForm();
            });
    }

    _initForm() {
        this.shoppingListForm = this.formBuilder.group({
            name: this.formBuilder.control(new Date().toLocaleDateString(), [Validators.required]),
            assignee: this.formBuilder.control(''),
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

    getStoreItem(storeIndex: number, itemIndex: number): { [key: string]: AbstractControl } {
        return (this.shoppingListForm.get(['stores', storeIndex, 'items', itemIndex]) as FormGroup).controls;
    }

    addProduct(index: number) {
        this.getStoreItems(index).push(this._createStoreItem());
    }

    displayFn(uid) {
        console.log(this.contacts);
        if (!this.contacts) {
            return '';
        }
        const userInfo = this.contacts.find(contact => contact.uid === uid);

        return userInfo ? userInfo.displayName : '';
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
            name: this.formBuilder.control('', [Validators.required]),
            items: this.formBuilder.array([
                this._createStoreItem()
            ])
        });
    }

    _createStoreItem(): AbstractControl {
        return this.formBuilder.group({
            name: this.formBuilder.control('', [Validators.required]),
            quantity: this.formBuilder.control(1, [Validators.required]),
            unit: this.formBuilder.control('szt', [Validators.required]),
            showDescription: this.formBuilder.control(false),
            description: this.formBuilder.control('')
        });
    }

    _fillForm(): void {
        if (!this.shoppingList) {
            return;
        }
        const list = this.shoppingList;
        const formValue = {
            name: list.name,
            assignee: list.assignee,
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
                        showDescription: !!item.description,
                        description: item.description || ''
                    };
                })
            });
        });


        this.shoppingListForm.setValue(formValue);
    }

}
