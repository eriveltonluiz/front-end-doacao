import { Filho } from 'src/app/model/filho';
import { Material } from './material';
export class FilhoMaterial {
    filho: Filho = new Filho();
    material: Material = new Material();
    quantidadeDesejada: number;
    quantidadeDoada?: number;
    statusDoacao: string;
}
