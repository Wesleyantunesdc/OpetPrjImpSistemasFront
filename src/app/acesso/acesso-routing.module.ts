import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AcessoComponent} from './acesso.component'

const routes: Routes = [
  {path:'', component:AcessoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcessoRoutingModule { }
