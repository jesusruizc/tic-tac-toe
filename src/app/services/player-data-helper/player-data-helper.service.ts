import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataHelperService {
  private players = new BehaviorSubject<Array<Player>>([])
  players$ = this.players.asObservable()
  constructor() { }

  newGame(formValue: any){
    const playerOne = {
      name: formValue.playerOne.name as string,
      score: 0,
      symbol: formValue.playerOne.symbol
    } as Player;

    const playerTwo = {
      name: formValue.playerTwo.name as string,
      score: 0,
      symbol: formValue.playerTwo.symbol
    } as Player;
    
    this.players.next([playerOne,playerTwo])
    }

  updateScore(symbol: 'x' | 'o'):void{
    if(this.players.value[0].symbol === symbol){
      this.players.next(
        [
          {...this.players.value[0],
          score: this.players.value[0].score+1},
          this.players.value[1]
        ])
    }else{
      this.players.next(
        [
          this.players.value[0],
          {...this.players.value[1],
            score: this.players.value[1].score+1},
        ])
    }
  }

  cleanData():void{
    this.players.next([])
  }

  returnValue(): Array<Player>{
    return this.players.value
  }
  }


