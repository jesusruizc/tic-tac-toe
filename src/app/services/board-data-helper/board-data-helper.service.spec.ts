import { TestBed } from '@angular/core/testing';

import { BoardDataHelperService } from './board-data-helper.service';

describe('BoardDataHelperService', () => {
  let service: BoardDataHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardDataHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
