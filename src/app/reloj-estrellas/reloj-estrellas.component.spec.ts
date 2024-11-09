import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojEstrellasComponent } from './reloj-estrellas.component';

describe('RelojEstrellasComponent', () => {
  let component: RelojEstrellasComponent;
  let fixture: ComponentFixture<RelojEstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojEstrellasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
