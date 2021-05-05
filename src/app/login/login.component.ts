import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { SistemaService } from '../services/sistema.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide:boolean =  true;
  erro:boolean = false;
  sucess:boolean = false;
  mensagem_erro = '';
  mensagem_sucess = '';

  form: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required]],
    senha:['',[Validators.required]]
  })

  constructor(
    private router: Router,
    private sistemaService: SistemaService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  async efetuarLogin(){
    let usuario : Usuario = new Usuario();
    usuario.username = this.form.controls.username.value;
    usuario.senha = this.form.controls.senha.value;

    if(this.form.invalid){
      this.msgErro("Preencha os campos corretamente...");
      return;
    }

    let result = await this.sistemaService.realizarLogin(usuario);

    if(result === true){
      this.msgSucess("Usuario logado com sucesso!");
      this.router.navigate(['acesso'],{})
    }else{
      this.msgErro("Usuario ou senha incorretos!");
    }

  }

  msgErro(erro: string){
    this.erro = true;
    this.mensagem_erro = erro;
    setTimeout(()=>{
      this.erro = false
    }, 4000)
  }

  msgSucess(sucess: string){
    this.sucess = true;
    this.mensagem_sucess = sucess;
    setTimeout(()=>{
      this.sucess = false
    }, 4000) 
  }
}
