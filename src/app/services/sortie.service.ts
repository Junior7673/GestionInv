import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortieInterface } from "../interfaces/sortie.interface";
import { Observable } from "rxjs";

@Injectable()
export class SortieService{
    apiUrl = 'http://localhost:8080/sortie';

    constructor(private http: HttpClient) { }

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