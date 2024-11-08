import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojMarcadorComponent } from './reloj-marcador.component';

describe('RelojMarcadorComponent', () => {
  let component: RelojMarcadorComponent;
  let fixture: ComponentFixture<RelojMarcadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojMarcadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojMarcadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
