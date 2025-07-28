import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfosComponent } from './account-infos-component';

describe('AccountInfosComponent', () => {
  let component: AccountInfosComponent;
  let fixture: ComponentFixture<AccountInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
