import { Observable } from "rxjs";
import { EntreeInterface } from "../interfaces/entree.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EntreeService {

    apiUrl = 'http://localhost:8080/entree';

    constructor(private http: HttpClient) { }

    getAll(): Observable<EntreeInterface[]> {
        return this.http.get<EntreeInterface[]>(this.apiUrl);
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

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}