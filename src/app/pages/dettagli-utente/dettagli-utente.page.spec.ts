import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliUtentePage } from './dettagli-utente.page';

describe('DettagliUtentePage', () => {
  let component: DettagliUtentePage;
  let fixture: ComponentFixture<DettagliUtentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliUtentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
