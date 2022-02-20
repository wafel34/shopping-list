import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShoppingListsPageComponent } from './shopping-lists-page.component';

describe('ShoppingListsPageComponent', () => {
  let component: ShoppingListsPageComponent;
  let fixture: ComponentFixture<ShoppingListsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
