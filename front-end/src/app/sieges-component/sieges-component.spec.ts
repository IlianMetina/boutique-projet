import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiegesComponent } from './sieges-component';

describe('SiegesComponent', () => {
  let component: SiegesComponent;
  let fixture: ComponentFixture<SiegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiegesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
