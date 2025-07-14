import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitInterface } from '../interfaces/produit-interface';
import { CategorieService } from './categorie-service';
import { FournisseurService } from './fournisseur-service';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/produit';


  constructor(private http: HttpClient,
    private categorieService: CategorieService,
    private fournisseurService: FournisseurService,
  ) {}

  getById(id: number): Promise<ProduitInterface> {
       return new Promise<ProduitInterface>((resolve, reject) => {
         this.http.get(`${this.apiUrl}/${id}`).subscribe(
           (res: any)=>{
             resolve(<ProduitInterface>res);
           },
           (error: any)=>{
             reject(error);
           }
         )
       });
     }

//Charger la liste des noms Categories et Produits
getAllNoms(): Promise<ProduitInterface[]> {
  return new Promise((resolve, reject) => {
    // Charger toutes les catégories
    this.categorieService.getAll().subscribe({
      next: (categories) => {
        const mapCategorie = new Map<string, string>();
        categories.forEach(cat => {
          if (cat.id != null) {
            mapCategorie.set(cat.id.toString(), cat.nomcat);
          }
        });

        // Charger tous les fournisseurs
        this.fournisseurService.getAll().subscribe({
          next: (fournisseurs) => {
            const mapFournisseur = new Map<string, string>();
            fournisseurs.forEach(f => {
              if (f.id != null) {
                mapFournisseur.set(f.id.toString(), f.nomfourni);
              }
            });

            // Charger tous les produits
            this.getAll().subscribe({
              next: (produits) => {
                const produitsAvecNoms = produits.map(prod => {
                  const nomCategorie = prod.categorieId != null ? mapCategorie.get(prod.categorieId.toString()) ?? 'Inconnue' : 'Non catégorisé';
                  const nomFournisseur = prod.fournisseurId != null ? mapFournisseur.get(prod.fournisseurId.toString()) ?? 'Inconnu' : 'Non défini';

                  return {
                    ...prod,
                    nomcat: nomCategorie,
                    nomfourni: nomFournisseur
                  };
                });
                resolve(produitsAvecNoms);
              },
              error: err => reject(err)
            });

          },
          error: err => reject(err)
        });
      },
      error: err => reject(err)
    });
  });
}




  getAll(): Observable<ProduitInterface[]> {
        return this.http.get<ProduitInterface[]>(this.apiUrl);
  }

  creerProduit(data: ProduitInterface): Promise<ProduitInterface> {
    return new Promise<ProduitInterface>((resolve, reject)=>{
      this.http.post<ProduitInterface>(this.apiUrl+'/add', data).subscribe(
        (res:any)=>{
          resolve(<ProduitInterface> res);
        },
        (error:any)=>{
          reject(error);
        }
      );
    });
  }

  getProduits(): Observable<ProduitInterface[]> {
    return this.http.get<ProduitInterface[]>(this.apiUrl);
  }

   searchByName(term: string){
      return new Promise<ProduitInterface[]>((resolve, reject) => {
        this.http.post(`${this.apiUrl}/search`, {nomprod: term}).subscribe(
          (res: any)=>{
            if(Array.isArray(res)){
              resolve(<ProduitInterface[]>res);
            }else{
              reject(res);
            }
          },
          (error: any)=>{
            reject(error);
          }
        )
      });
    }

  getProduitById(id: number): Observable<ProduitInterface> {
    return this.http.get<ProduitInterface>(`${this.apiUrl}/${id}`);
  }

  update(produit: ProduitInterface): Promise<ProduitInterface>{
        return new Promise<ProduitInterface>((resolve, reject)=>{
          this.http.put<ProduitInterface>(`${this.apiUrl}`, produit).subscribe(
            (res:any)=>{
              resolve(<ProduitInterface> res);
            },
            (error)=>{
              reject(error);
            }
          );
        });
      }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
