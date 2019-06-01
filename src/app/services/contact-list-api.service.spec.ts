import { TestBed } from '@angular/core/testing';

import { ContactListApiService } from './contact-list-api.service';

describe('ContactListApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactListApiService = TestBed.get(ContactListApiService);
    expect(service).toBeTruthy();
  });
});
