import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojZenComponent } from './reloj-zen.component';

describe('RelojZenComponent', () => {
  let component: RelojZenComponent;
  let fixture: ComponentFixture<RelojZenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojZenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojZenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
