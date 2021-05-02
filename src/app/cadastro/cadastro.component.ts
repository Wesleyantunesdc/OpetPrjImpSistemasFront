import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../models/Curso';
import { Usuario } from '../models/Usuario';
import {SistemaService} from './../services/sistema.service';
import {Util} from './../util/utilizadades';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required]],
    username: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    periodo: ['', [Validators.required]],
    curso: ['',[]]
  });
  
  cursos: Curso[] = [];
  curso: Curso;
  username: string ='';
  hide = true;
  util: Util;

  constructor(
    private formBuilder: FormBuilder,
    private service: SistemaService,
  ) {
    this.util  = new Util();
   }

  ngOnInit(): void {
    this.recuperarCursos();
  }

  async recuperarCursos(){
    this.cursos = await this.service.findByCursos();
  }

  async cadastrarUsuario(){
    if(this.form.invalid){
      alert("Funcionario preenchido de forma errada!");
      return;
    }
    alert("Passou na validção")
    await this.service.cadastrarUsuario(this.popularUsuario())
  }

  popularUsuario():Usuario{
    let u:Usuario = new Usuario;

    u.nome = this.form.controls.nome.value;
    u.username = this.form.controls.username.value;
    u.senha = this.form.controls.senha.value;
    u.dataNascimento = "2000-12-12";
    u.periodo = this.form.controls.periodo.value
    u.curso = this.form.controls.curso.value;
    alert(u);
    return u;
  }

}
