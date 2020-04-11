import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class ShoppingListsInterceptor implements HttpInterceptor {

  private list = {
    status: 'created',
    items: [
      {
        name: 'Mydlo',
        id: '12345',
        quantity: 1,
        status: 'for_buying',
        description: null,
        store: 'Biedronka'
      },
      {
        name: 'Chleb',
        id: '234456',
        quantity: 1,
        status: 'for_buying',
        description: 'Swiezy!',
        store: 'Biedronka'
      },
      {
        name: 'Wino',
        id: '235656',
        quantity: 1,
        status: 'for_buying',
        description: null,
        store: 'Lidl'
      },
      {
        name: 'Telewiyor',
        id: '153656',
        quantity: 1,
        status: 'for_buying',
        description: null,
        store: 'Auchan'
      }
    ]
  }

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === 'shopping-lists/' && request.method === "GET") {
      return of(new HttpResponse({status: 200, body: this.list}));
    }
    if (request.url === 'shopping-lists/' && request.method === "POST") {
      console.log('hello from post')
      return of(new HttpResponse({status: 200, body: 'ok'}));
    }
  }
}
