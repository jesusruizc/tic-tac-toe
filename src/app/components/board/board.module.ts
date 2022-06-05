import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    NzModalModule,
    NzButtonModule
  ]
})
export class BoardModule { }
