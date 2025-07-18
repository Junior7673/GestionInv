import { Pipe, PipeTransform } from '@angular/core';
import { FournisseurInterface } from '../interfaces/fournisseur-interface';

@Pipe({
  name: 'fournisseurFilter',
  standalone: true
})
export class FournisseurFilterPipe implements PipeTransform {

  transform(fournisseurs: FournisseurInterface[], search: string): FournisseurInterface[] {
    if (!search) return fournisseurs;
    const lower = search.toLowerCase();
    return fournisseurs.filter(f => 
      f.nomfourni.toLowerCase().includes(lower) ||
      f.telephonefourni.toLowerCase().includes(lower) ||
      f.adressefourni.toLowerCase().includes(lower)
    );
  }

}
