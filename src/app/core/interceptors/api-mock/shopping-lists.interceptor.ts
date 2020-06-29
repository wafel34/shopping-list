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

  private lists = [
    {
      id: 2345667,
      date: new Date(2020, 3, 20, 12),
      name: 'First shopping list',
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
  },
  {
    id: 1234567,
    date: new Date(2020, 3, 11, 12),
    name: 'Second shopping list',
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
        store: 'Lidl'
      },
      {
        name: 'Piwo',
        id: '235656',
        quantity: 1,
        status: 'for_buying',
        description: null,
        store: 'Lidl'
      },
      {
        name: 'Tort',
        id: '1454366',
        quantity: 1,
        status: 'for_buying',
        description: null,
        store: 'Auchan'
      }
  ]
}
]

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.method);
    if (request.url.startsWith('shopping-lists/') && request.method === "GET") {
      return of(new HttpResponse({status: 200, body: this.lists.find(list => list.id === Number(request.url.split('/')[1]))}));
    }

    if (request.url.startsWith('shopping-lists/') && request.method === "DELETE") {
      console.log('hjeeee')
      const index = this.lists.findIndex(list => list.id === Number(request.url.split('/')[1]))
      const removed = this.lists.splice(index, index + 1);
      console.log(removed);
      console.log(this.lists)
      return of(new HttpResponse({status: 200, body: ''}));
    }

    if (request.url === 'shopping-lists/' && request.method === "POST") {
      return of(new HttpResponse({status: 200, body: 'ok'}));
    }

    if (request.url.endsWith('shopping-lists') && request.method === "GET") {
      return of(new HttpResponse({status: 200, body: this.lists}));
    }
  }
}
