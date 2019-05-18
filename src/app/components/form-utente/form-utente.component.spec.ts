import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUtenteComponent } from './form-utente.component';

describe('FormUtenteComponent', () => {
  let component: FormUtenteComponent;
  let fixture: ComponentFixture<FormUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
