import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeAgmarComponent } from './operative-agmar.component';

describe('OperativeAgmarComponent', () => {
  let component: OperativeAgmarComponent;
  let fixture: ComponentFixture<OperativeAgmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperativeAgmarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperativeAgmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
