import { Curso } from './Curso'

export class Usuario{
    public id: number;
    public nome: string;
    public username: string;
    public senha: string;
    public dataNascimento: string;
    public periodo: number;
    public curso?: Curso; 

    constructor(){
        this.id = null;
        this.nome = "";
        this.username = "";
        this.senha = "";
        this.dataNascimento = "2000-12-12";
        this.periodo = 1;

    }
}