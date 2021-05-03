import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public erro = false;

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
  ) {}

  ngOnInit(): void {
    this.recuperarCursos();
  }

  async recuperarCursos() {
    this.cursos = await this.service.findByCursos();
  }

  async cadastrarUsuario() {
    if(this.form.invalid){
      this.erro = true;
      return;
    }
    await this.service.cadastrarUsuario(this.popularUsuario())
  }

  popularUsuario(): Usuario {
    let u: Usuario = new Usuario;

    u.nome = this.form.controls.nome.value;
    u.username = this.form.controls.username.value;
    u.senha = this.form.controls.senha.value;
    u.dataNascimento = this.form.controls.dataNascimento.value;
    u.periodo = this.form.controls.periodo.value
    // var idCurso = this.form.controls.curso.value;
    // var nomeCurso;
    // this.cursos.forEach(c =>{
    //   if(c.id === idCurso){
    //     nomeCurso = c.nomeCurso;
    //   }
    // })

    // alert(idCurso+"/"+nomeCurso);
    u.curso = this.form.controls.curso.value;
    alert(JSON.stringify(u));
    return u;
  }

}
