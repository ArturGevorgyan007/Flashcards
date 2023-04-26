import { TestBed } from '@angular/core/testing';

import { FlashCardServiceService } from './flash-card-service.service';

describe('FlashCardServiceService', () => {
  let service: FlashCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
