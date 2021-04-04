import { Escola } from 'src/app/model/escola';
import { Pai } from 'src/app/model/pai';
export class Filho {
    id: number
    nome: string;
    dataNascimento: String;
    cpf: string;
    urlFoto: string;
    pai: Pai = new Pai();
    escola: Escola = new Escola();
}
