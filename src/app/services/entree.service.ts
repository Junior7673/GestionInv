import { Observable } from "rxjs";
import { EntreeInterface } from "../interfaces/entree.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProduitService } from "./produit-service";

@Injectable()
export class EntreeService {

    apiUrl = 'http://localhost:8080/entree';

    constructor(private http: HttpClient,
        private produitService: ProduitService
    ) { }
    

    getAll(): Observable<EntreeInterface[]> {
        return this.http.get<EntreeInterface[]>(this.apiUrl);
    }

    getAllWithNomProduit(): Promise<EntreeInterface[]> {
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
            next: (entrees) => {
              const entreesAvecNom = entrees.map(e => ({
                ...e,
                nomprod: mapProduit.get(e.produitId) ?? 'Inconnu'
              }));
              resolve(entreesAvecNom);
            },
            error: err => reject(err)
          });
        },
        error: err => reject(err)
      });
    });
  }



    getById(id: number): Promise<EntreeInterface> {
     return new Promise<EntreeInterface>((resolve, reject) => {
       this.http.get(`${this.apiUrl}/${id}`).subscribe(
            (res: any)=>{
            resolve(<EntreeInterface>res);
            },
            (error: any)=>{
            reject(error);
            }
        )
        });
    }

    create(fournisseur: EntreeInterface): Promise<EntreeInterface> {
      return new Promise<EntreeInterface>((resolve, reject)=>{
        this.http.post<EntreeInterface>(this.apiUrl, fournisseur).subscribe(
            (res:any)=>{
            resolve(<EntreeInterface> res);
            },
            (error:any)=>{
            reject(error);
            }
        );
        });
    }

    update(entree: EntreeInterface): Promise<EntreeInterface>{
          return new Promise<EntreeInterface>((resolve, reject)=>{
            this.http.put<EntreeInterface>(`${this.apiUrl}`, entree).subscribe(
              (res:any)=>{
                resolve(<EntreeInterface> res);
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