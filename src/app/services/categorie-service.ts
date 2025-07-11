import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategorieInterface } from '../interfaces/categorie-interface';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {
    private apiUrl = 'http://localhost:8080/categorie';


  constructor(private http: HttpClient) { }
  getAll(): Observable<CategorieInterface[]> {
    return this.http.get<CategorieInterface[]>(this.apiUrl);
  }

  //donc tu vois il faut ajouter une méthode pour rechercher une catégorieh
  //en fonction du nom de la catégorie ou peut importe comment tu l'as appeléh
  searchbyName(term: string){
    return new Promise<CategorieInterface[]>((resolve, reject) => {
      //créer un endpoint 'search' dans ton backend qui renvoie une liste catégorie selon la clause
      //where nom_categorie like '%term%' limit 10
      this.http.post(`${this.apiUrl}/search`, {nomcat: term}).subscribe(
        (res: any)=>{
          if(Array.isArray(res)){
            resolve(<CategorieInterface[]>res);
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

  getById(id: number): Observable<CategorieInterface> {
    return this.http.get<CategorieInterface>(`${this.apiUrl}/${id}`);
  }

  create({ categorie }: { categorie: CategorieInterface; }): Observable<CategorieInterface> {
    return this.http.post<CategorieInterface>(`${this.apiUrl}/add`, categorie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
