import { Pipe, PipeTransform } from '@angular/core';
import { CategorieInterface } from '../interfaces/categorie-interface';

@Pipe({
  name: 'categorieFilter',
    standalone: true
})
export class CategorieFilterPipe implements PipeTransform {

  transform(categories: CategorieInterface[], searchTerm: string): CategorieInterface[] {
  if (!categories || !searchTerm) {
      return categories;
    }

    return categories.filter(cat =>
      cat.nomcat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
