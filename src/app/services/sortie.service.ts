import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortieInterface } from "../interfaces/sortie.interface";
import { Observable } from "rxjs";
import { ProduitService } from "./produit-service";

@Injectable()
export class SortieService{
    apiUrl = 'http://localhost:8080/sortie';

    constructor(private http: HttpClient,
        private produitService: ProduitService
    ) { }

    getAll(): Observable<SortieInterface[]> {
        return this.http.get<SortieInterface[]>(this.apiUrl);
    }


    getById(id: number): Promise<SortieInterface> {
     return new Promise<SortieInterface>((resolve, reject) => {
       this.http.get(`${this.apiUrl}/${id}`).subscribe(
            (res: any)=>{
            resolve(<SortieInterface>res);
            },
            (error: any)=>{
            reject(error);
            }
        )
        });
    }

    getAllWithNomProduit(): Promise<SortieInterface[]> {
    return new Promise((resolve, reject) => {
      this.produitService.getAll().subscribe({
        next: (produits) => {
          const mapProduit = new Map<number, string>();
          produits.forEach(p => {
            if (p.id != null) {
              mapProduit.set(p.id, p.nomprod);
            }
          });

          this.getAll().subscribe({
            next: (sorties) => {
              const sortiesAvecNom = sorties.map(s => ({
                ...s,
                nomprod: mapProduit.get(s.produitId) ?? 'Inconnu'
              }));
              resolve(sortiesAvecNom);
            },
            error: err => reject(err)
            });
        },
        error: err => reject(err)
      });
    });
  }


    create(sortie: SortieInterface): Promise<SortieInterface> {
      return new Promise<SortieInterface>((resolve, reject)=>{
        this.http.post<SortieInterface>(this.apiUrl, sortie).subscribe(
            (res:any)=>{
            resolve(<SortieInterface> res);
            },
            (error:any)=>{
            reject(error);
            }
        );
        });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}