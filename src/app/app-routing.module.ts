import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)}, 
  {path:'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path:'cadastro',loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
