import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeublesComponent } from './meubles-component';

describe('MeublesComponent', () => {
  let component: MeublesComponent;
  let fixture: ComponentFixture<MeublesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeublesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeublesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
