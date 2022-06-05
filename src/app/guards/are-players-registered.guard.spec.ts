import { TestBed } from '@angular/core/testing';

import { ArePlayersRegisteredGuard } from './are-players-registered.guard';

describe('ArePlayersRegisteredGuard', () => {
  let guard: ArePlayersRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArePlayersRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
