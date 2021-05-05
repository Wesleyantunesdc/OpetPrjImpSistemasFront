import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Curso } from '../models/Curso';
import { Usuario } from '../models/Usuario';
import { SistemaService } from './../services/sistema.service';
import { Util } from './../util/utilizadades';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  erro:boolean = false;
  sucess:boolean = false;
  mensagem_erro = '';
  mensagem_sucess = '';

  form: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    periodo: ['', [Validators.required]],
    curso: [, [Validators.required]]
  });

  cursos: Curso[] = [];
  username: string = '';
  hide = true;
  util: Util;

  constructor(
    private formBuilder: FormBuilder,
    private service: SistemaService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.recuperarCursos();
  }

  async recuperarCursos() {
    this.cursos = await this.service.findByCursos();
  }

  async cadastrarUsuario() {
    if(this.form.invalid){
      this.msgErro("Preencha o formulario corretamente!");
      return;
    }
    var usuario = await this.service.cadastrarUsuario(this.popularUsuario())
    console.log(usuario)
    if(usuario!=null){
      this.msgSucess("Usuario criado com sucesso!")
      this.router.navigate(['login'],{})
    }else{
      this.msgErro("Houve um erro ao cadastrar o usuario!");
    }
  }

  popularUsuario(): Usuario {
    let u: Usuario = new Usuario;
    u.nome = this.form.controls.nome.value;
    u.username = this.form.controls.username.value;
    u.senha = this.form.controls.senha.value;
    u.dataNascimento = this.form.controls.dataNascimento.value;
    u.periodo = this.form.controls.periodo.value
    u.curso = this.form.controls.curso.value;
    alert(JSON.stringify(u));
    return u;
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
