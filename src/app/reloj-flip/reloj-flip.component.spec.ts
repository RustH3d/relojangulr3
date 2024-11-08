import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojFlipComponent } from './reloj-flip.component';

describe('RelojFlipComponent', () => {
  let component: RelojFlipComponent;
  let fixture: ComponentFixture<RelojFlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojFlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
