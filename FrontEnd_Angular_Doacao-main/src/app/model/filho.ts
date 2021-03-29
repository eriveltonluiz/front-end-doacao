import { Escola } from 'src/app/model/escola';
import { Pai } from 'src/app/model/pai';
export class Filho {
    id: number
    nome: string;
    relato: string;
    dataNascimento: String;
    cpf: string;
    pai: Pai;
    escola: Escola;
}
