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

  
  getAll(): Promise<ProduitInterface[]> {
  return new Promise((resolve, reject) => {
    this.http.get(`${this.apiUrl}`).subscribe(
      async (res: any) => {
        const categories = await this.categorieService.getAll();
        const fournisseurs = await this.fournisseurService.getAll();

        const enrichis = res.map((prod: ProduitInterface) => {
          const cat = categories.find(c => c.id === prod.categorieId);
          const four = fournisseurs.find(f => f.id === prod.fournisseurId);
          return {
            ...prod,
            nomcat: cat?.nomcat ?? '',
            nomfourni: four?.nomfourni ?? ''
          };
        });

        resolve(enrichis);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
}


  filterByCategory(categorieId: number): Promise<ProduitInterface[]> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/filter/categorie`, {categorieId : categorieId}).subscribe(
        (res: any)=>{
          resolve(<ProduitInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      )
    });
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
