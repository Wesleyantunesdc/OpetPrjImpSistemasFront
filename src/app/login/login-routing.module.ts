import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'acesso',loadChildren:()=>import('./../acesso/acesso.module').then(m => m.AcessoModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
