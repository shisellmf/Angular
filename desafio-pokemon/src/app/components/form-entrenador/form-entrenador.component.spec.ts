import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntrenadorComponent } from './form-entrenador.component';

describe('FormEntrenadorComponent', () => {
  let component: FormEntrenadorComponent;
  let fixture: ComponentFixture<FormEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntrenadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
