import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardBox } from 'src/app/interfaces/board-box';

@Injectable({
  providedIn: 'root'
})
export class BoardDataHelperService {
  private boardState = new BehaviorSubject<Array<Array<BoardBox>>>(this.newBoard());
  boardState$ = this.boardState.asObservable();

  constructor() { }

  newBoard(): Array<Array<BoardBox>>{
    const newBox = ()=>({
      checked: false,
      value: ''
    } as BoardBox);
    return [
      [newBox(), newBox(), newBox()],
      [newBox(), newBox(), newBox()],
      [newBox(), newBox(), newBox()]
    ]
  }

  cleanBoard():void {
    this.boardState.next(this.newBoard())
  }

  updateBoard(position: Array<number>, value: 'x'|'o'): void{
    let board = this.boardState.value;
    board[position[0]][position[1]].value = value;
    board[position[0]][position[1]].checked = true;
    this.boardState.next(board);
  }

  
}
