import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardBox } from 'src/app/interfaces/board-box';
import { Player } from 'src/app/interfaces/player';
import { BoardDataHelperService } from 'src/app/services/board-data-helper/board-data-helper.service';
import { PlayerDataHelperService } from 'src/app/services/player-data-helper/player-data-helper.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  boardSubs!:any;
  boardState!: Array<Array<BoardBox>>;
  playerSubs!: any;
  players!: Array<Player>;
  isPlaying!: 'x'|'o';
  isGameOver = false;
  gameOverMessage!: string;
  turnNumber = 1;
  started!: 'x'|'o';
  
  constructor(
    private readonly board: BoardDataHelperService,
    private readonly playersState: PlayerDataHelperService,
    readonly router: Router
  ) { 
  }

  ngOnInit(): void {
    this.boardSubs = this.board.boardState$.subscribe((next)=>this.boardState = next);
    this.playerSubs = this.playersState.players$.subscribe((next)=>this.players = next);
    this.isPlaying= this.players[0]?.symbol;
    this.started = this.isPlaying;
  }

  ngOnDestroy(): void {
    this.board.cleanBoard();
    this.boardSubs.unsubscribe();
    this.playersState.cleanData();
    this.playerSubs.unsubscribe();
  }

  updateBoard(position: Array<number>){
    this.board.updateBoard(position, this.isPlaying)
    this.isGameOver = this.checkDiagonals(position) || this.checkRowColumn(position);
    if(this.isGameOver){
      this.handleGameOver(this.isPlaying);
      return
    } else if(this.turnNumber === 9){
      this.isGameOver = true;
      this.gameOverMessage = "<h1>Nobody wins!</h1>";
      return
    }
    this.turnNumber = this.turnNumber+1;
    this.isPlaying = this.isPlaying === 'x'? 'o':'x';
  }

  checkDiagonals(lastPosition: Array<number>){
    const row = lastPosition[0];
    const column = lastPosition[1];
    if((column === 2 && row === 0) || (column === 0 && row === 2) ||(column === 1 && row === 1) ){
      let diagonal = [];
      for(let i=0;i<=2; i++){
        diagonal.push(this.boardState[2-i][i]);
      }
      if(diagonal.filter(element=>element.value === this.isPlaying).length ===3){
        return true
      }
      if((column === 2 && row === 0) || (column === 0 && row === 2)){
        return false
      }
    }
    if((column === 0 && row === 0) || (column === 2 && row === 2) ||(column === 1 && row === 1) ){
      let diagonal = [];
      for(let i=0;i<=2; i++){
        diagonal.push(this.boardState[i][i]);
      }
      if(diagonal.filter(element=>element.value === this.isPlaying).length === 3){
        return true
      }
      else{
        return false
      }
    }
    else{
      return false
    }

  }

  checkRowColumn(position: Array<number>):boolean{
    const row = this.boardState[position[0]];
    let column = [];
    for(let i=0; i<=2; i++){
      column.push(this.boardState[i][position[1]]);
    }
    if(
      (row.filter(element => element.value === this.isPlaying).length === 3) ||
    (column.filter(element => element.value === this.isPlaying).length === 3)){
      return true
    }else {
      return false
    }
  };

  handleGameOver(latestSymbol: 'x'|'o'): void{
    const winner = this.players[0]?.symbol === latestSymbol? this.players[0].name:this.players[1].name;
    this.playersState.updateScore(latestSymbol);
    this.gameOverMessage = 
        `<h1> ${winner} Wins!</h1>
        <h2>Score:</h2>
        <h3>${this.players[0].name}:${this.players[0].score}</h3>
        <h3>${this.players[1].name}:${this.players[1].score}</h3>`
  }

  newGame(): void{
    this.turnNumber = 1;
    this.gameOverMessage = '';
    this.board.cleanBoard();
    this.isPlaying = this.started === 'x'? 'o':'x';
    this.started = this.isPlaying;
    this.isGameOver = false;
  }

  goHome():void{
    this.router.navigate([''])
  }

}
