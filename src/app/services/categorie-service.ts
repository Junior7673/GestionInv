import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategorieInterface } from '../interfaces/categorie-interface';

@Injectable({
  providedIn: 'root'
})

export class CategorieService {
  static getById(categorieId: number) {
    throw new Error('Method not implemented.');
  }
    private apiUrl = 'http://localhost:8080/categorie';


  constructor(private http: HttpClient) { }
  getAll(): Promise<CategorieInterface[]> {
    return new Promise<CategorieInterface[]>((resolve, reject)=>{
      this.http.get(`${this.apiUrl}`).subscribe(
        (res: any)=>{
          resolve(<CategorieInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      )
    });
  }

  //On ajoute une méthode pour rechercher une catégorieh
  //en fonction du nom de la catégorie ou peut importe comment tu l'as appele
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

  getById(id: number): Promise<CategorieInterface> {
    return new Promise<CategorieInterface>((resolve, reject) => {
      this.http.get(`${this.apiUrl}/${id}`).subscribe(
        (res: any)=>{
          resolve(<CategorieInterface>res);
        },
        (error: any)=>{
          reject(error);
        }
      )
    });
  }

  /*create({ categorie }: { categorie: CategorieInterface; }): Observable<CategorieInterface> {
    return this.http.post<CategorieInterface>(`${this.apiUrl}/add`, categorie);
  }*/
  create(categorie: CategorieInterface): Promise<CategorieInterface> {
    return new Promise<CategorieInterface>((resolve, reject)=>{
        this.http.post<CategorieInterface>(this.apiUrl+'/add', categorie).subscribe(
          (res:any)=>{
            resolve(<CategorieInterface> res);
          },
          (error:any)=>{
            reject(error);
          }
        );
      });
     }

  update(categorie: CategorieInterface): Promise<CategorieInterface>{
    return new Promise<CategorieInterface>((resolve, reject)=>{
      this.http.put<CategorieInterface>(`${this.apiUrl}`, categorie).subscribe(
        (res:any)=>{
          resolve(<CategorieInterface> res);
        },
        (error)=>{
          reject(error);
        }
      );
    });
  }

  delete(id: number): Promise<void> {
    return new Promise<void>((resolve, reject)=>{
      return this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(
        (res:any)=>{
          resolve();
        },
        (error)=>{
          reject(error);
        }
      );
    });
  }
  
}
