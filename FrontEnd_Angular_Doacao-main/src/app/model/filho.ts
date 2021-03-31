import { Escola } from 'src/app/model/escola';
import { Pai } from 'src/app/model/pai';
export class Filho {
    id: number
    nome: string;
    relato: string;
    dataNascimento: String;
    cpf: string;
    urlFoto: string;
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    pai: Pai = new Pai();
    escola: Escola = new Escola();
}
