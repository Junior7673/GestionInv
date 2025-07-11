import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitInterface } from '../interfaces/produit-interface';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/produit';

  constructor(private http: HttpClient) { }

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

  updateProduit(id: number, data: ProduitInterface): Observable<ProduitInterface> {
    return this.http.put<ProduitInterface>(`${this.apiUrl}/${id}`, data);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
