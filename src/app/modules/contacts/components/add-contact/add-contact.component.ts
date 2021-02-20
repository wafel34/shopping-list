import { Component, OnInit } from '@angular/core';
import {ContactsRepositoryService} from '../../../../core/repositories/contacts/contacts-repository.service';
import {debounceTime, switchMap, take} from 'rxjs/operators';
import {IUser} from '../../../../shared/models/user/user';
import {Observable, Subject} from 'rxjs';
import {$e} from 'codelyzer/angular/styles/chars';
import {AuthService} from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  private searchValue$ = new Subject<string>();
  user$: Observable<IUser> = this.authService.user$;
  users$: Observable<IUser[]>;

  constructor(private contactsRepository: ContactsRepositoryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.searchValue$
      .pipe(
        debounceTime(500),
        switchMap((searchValue: string) => {
          return this.contactsRepository.getUsers(searchValue);
        })
      );
  }

  onInput($event: {target: HTMLInputElement}) {
    this.searchValue$.next($event.target.value);
  }

  addContact(loggedIn: string, addedContactUid: string) {
    this.contactsRepository.addContact(loggedIn, addedContactUid);
  }
}
