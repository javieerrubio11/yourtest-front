import { TestBed, inject } from '@angular/core/testing';

import { QuiestionService } from './quiestion.service';

describe('QuiestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuiestionService]
    });
  });

  it('should be created', inject([QuiestionService], (service: QuiestionService) => {
    expect(service).toBeTruthy();
  }));
});
