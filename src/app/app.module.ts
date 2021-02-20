import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListsModule } from './modules/shopping-lists/shopping-lists.module';
import { ContactsModule } from './modules/contacts/contacts.module';

import { APP_ROUTES } from './app.routes';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDM6_xjtCiBzXHhTpOjFJKDqZb0ebZhEKo',
  authDomain: 'shopping-lists-5e24c.firebaseapp.com',
  databaseURL: 'https://shopping-lists-5e24c.firebaseio.com',
  projectId: 'shopping-lists-5e24c',
  storageBucket: 'shopping-lists-5e24c.appspot.com',
  messagingSenderId: '1033770670547',
  appId: '1:1033770670547:web:e06fa150fbdd96c3b83726',
  measurementId: 'G-TGMFHL2FG3'
};

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    ShoppingListsModule,
    ContactsModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    HammerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
