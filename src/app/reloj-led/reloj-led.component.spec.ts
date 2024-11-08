import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojLedComponent } from './reloj-led.component';

describe('RelojLedComponent', () => {
  let component: RelojLedComponent;
  let fixture: ComponentFixture<RelojLedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojLedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
