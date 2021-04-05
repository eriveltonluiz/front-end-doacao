import { Filho } from 'src/app/model/filho';
import { Id } from './id';
import { Material } from './material';
export class FilhoMaterial {
    id: Id = new Id();
    quantidadeDesejada: number;
    quantidadeDoada?: number;
    quantidadeDoadaVariada?: number;
    statusDoacao: string;
}
