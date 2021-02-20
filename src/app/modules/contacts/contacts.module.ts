import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';



@NgModule({
  declarations: [ContactsPageComponent, AddContactComponent, ContactsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ContactsModule { }
