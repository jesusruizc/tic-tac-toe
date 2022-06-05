import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerDataHelperService } from '../services/player-data-helper/player-data-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ArePlayersRegisteredGuard implements CanLoad {
  constructor(
    private readonly playersData: PlayerDataHelperService,
    private readonly router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree {
    return this.playersData.returnValue().length ===2? true: this.router.parseUrl('');
  }
}
