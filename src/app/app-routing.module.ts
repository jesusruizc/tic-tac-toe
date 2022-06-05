import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'play',
    loadChildren: ()=>import('src/app/components/board/board.module').then(m=>m.BoardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
