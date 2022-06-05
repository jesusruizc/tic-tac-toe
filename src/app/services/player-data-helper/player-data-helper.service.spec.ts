import { TestBed } from '@angular/core/testing';

import { PlayerDataHelperService } from './player-data-helper.service';

describe('PlayerDataHelperService', () => {
  let service: PlayerDataHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerDataHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
