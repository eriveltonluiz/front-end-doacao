import { Filho } from 'src/app/model/filho';
import { Material } from './material';
export class FilhoMaterial {
    filho: Filho;
    material: Material;
    quantidadeDesejada: number;
    quantidadeDoada?: number;
    statusDoacao: string;
}
