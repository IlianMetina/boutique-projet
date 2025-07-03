import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangementsComponent } from './rangements-component';

describe('RangementsComponent', () => {
  let component: RangementsComponent;
  let fixture: ComponentFixture<RangementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
