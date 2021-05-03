import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.erro = false;
    this.sucess = false;

    let usuario : Usuario = new Usuario();
    usuario.username = this.form.controls.username.value;
    usuario.senha = this.form.controls.senha.value;
    if(this.form.invalid){
      this.mensagem_erro = "Preencha os campos corretamente...";
      this.erro = true;
      return;
    }
    this.erro = false;
    let result = await this.sistemaService.realizarLogin(usuario);
    if(result === true){
      this.sucess = true;
      this.mensagem_sucess = "Usuario logado com sucesso!"
    }else{
      this.erro = true;
      this.mensagem_erro = "Usuario ou senha incorretos!"
    }

  }
}
