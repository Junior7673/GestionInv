import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FournisseurInterface } from '../interfaces/fournisseur-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  apiUrl = 'http://localhost:8080/fournisseur';

constructor(private http: HttpClient) { }
  getAll(): Observable<FournisseurInterface[]> {
    return this.http.get<FournisseurInterface[]>(this.apiUrl);
  }

  /*getById(id: number): Observable<FournisseurInterface> {
    return this.http.get<FournisseurInterface>(`${this.apiUrl}/${id}`);
  }*/
 getById(id: number): Promise<FournisseurInterface> {
     return new Promise<FournisseurInterface>((resolve, reject) => {
       this.http.get(`${this.apiUrl}/${id}`).subscribe(
         (res: any)=>{
           resolve(<FournisseurInterface>res);
         },
         (error: any)=>{
           reject(error);
         }
       )
     });
   }

  searchByName(term: string){
    return new Promise<FournisseurInterface[]>((resolve, reject) => {
      this.http.post(`${this.apiUrl}/search`, {nomfourni: term}).subscribe(
        (res: any)=>{
          if(Array.isArray(res)){
            resolve(<FournisseurInterface[]>res);
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

  /*create(fournisseur: FournisseurInterface): Observable<FournisseurInterface> {
    return this.http.post<FournisseurInterface>(this.apiUrl, fournisseur);
  }*/
  create(fournisseur: FournisseurInterface): Promise<FournisseurInterface> {

      return new Promise<FournisseurInterface>((resolve, reject)=>{
       this.http.post<FournisseurInterface>(this.apiUrl+'/add', fournisseur).subscribe(
         (res:any)=>{
           resolve(<FournisseurInterface> res);
         },
         (error:any)=>{
           reject(error);
         }
       );
     });
    }

  update(fournisseur: FournisseurInterface): Promise<FournisseurInterface>{
      return new Promise<FournisseurInterface>((resolve, reject)=>{
        this.http.put<FournisseurInterface>(`${this.apiUrl}`, fournisseur).subscribe(
          (res:any)=>{
            resolve(<FournisseurInterface> res);
          },
          (error)=>{
            reject(error);
          }
        );
      });
    }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
