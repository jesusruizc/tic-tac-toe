import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataHelperService } from 'src/app/services/player-data-helper/player-data-helper.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isModalVisible = false;
  playersForm!: FormGroup;
  firstPlayerSymbol!: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataHelper: PlayerDataHelperService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.buildPlayersForm();
    this.firstPlayerSymbol = this.playersForm.get('playerOne')?.get('symbol')?.valueChanges.subscribe(
      next=>{
        this.setSecondPLayerSymbol(
        next === 'x'? 'o':'x'
        )});
  }

  ngOnDestroy(): void {
    this.firstPlayerSymbol.unsubscribe()
  }

  buildPlayersForm(): void{
    this.playersForm = this.fb.group({
      playerOne: this.fb.group({
        name: this.fb.control('',[Validators.required]),
        symbol: this.fb.control('', [Validators.required])
      }),
      playerTwo: this.fb.group({
        name: this.fb.control('',[Validators.required]),
        symbol: this.fb.control({value:'', disabled: true}, [Validators.required])
      }),
    })
  }

  setSecondPLayerSymbol(symbol: 'x'|'o'): void{
    this.playersForm.get('playerTwo')?.get('symbol')?.setValue(symbol)
  }

  startGame(){
    this.dataHelper.newGame(this.playersForm.getRawValue())
    this.router.navigate(['/play'])
  }

}
