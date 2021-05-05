import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Curso} from './../models/Curso';
import {Usuario} from './../models/Usuario';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  private URL_BASE: string = 'http://localhost:8080'; 

  constructor(
    private http: HttpClient
  ) { }

  async findByCursos(){
    let endpoint = this.URL_BASE + '/cursos';
    return this.http.get<Curso[]>(endpoint).toPromise();
  }

  async cadastrarUsuario(usuario: Usuario){
    let endpoint = this.URL_BASE + '/usuarios';
    usuario.dataNascimento = moment(usuario.dataNascimento).format('yyyy-MM-DD')
    return this.http.post<Usuario>(endpoint,usuario).toPromise();
  }

  async realizarLogin(usuario: Usuario){
    let endpoint = this.URL_BASE+'/usuarios';
    return this.http.put<boolean>(endpoint,usuario).toPromise();
  }
}
