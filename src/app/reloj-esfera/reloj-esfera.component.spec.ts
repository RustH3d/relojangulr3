import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojEsferaComponent } from './reloj-esfera.component';

describe('RelojEsferaComponent', () => {
  let component: RelojEsferaComponent;
  let fixture: ComponentFixture<RelojEsferaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojEsferaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojEsferaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
