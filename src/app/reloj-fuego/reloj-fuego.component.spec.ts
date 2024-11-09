import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojFuegoComponent } from './reloj-fuego.component';

describe('RelojFuegoComponent', () => {
  let component: RelojFuegoComponent;
  let fixture: ComponentFixture<RelojFuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojFuegoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojFuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
