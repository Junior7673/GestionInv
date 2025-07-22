import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortieInterface } from "../interfaces/sortie.interface";
import { Observable } from "rxjs";
import { ProduitService } from "./produit-service";

@Injectable()
export class SortieService{
  apiUrl = 'http://localhost:8080/sortie';

  constructor(private http: HttpClient) { }

  getAll(): Promise<SortieInterface[]> {
    return new Promise<SortieInterface[]>((resolve, reject) => {
      this.http.get(`${this.apiUrl}`).subscribe(
        (res: any)=>{
          resolve(<SortieInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
    });
  }

  search(term: string): Promise<SortieInterface[]> {
    return new Promise<SortieInterface[]>((resolve, reject) => {
      this.http.get(`${this.apiUrl}/search/${term}`).subscribe(
        (res: any)=>{
          resolve(<SortieInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
    });
  }

  filterByPeriod(startDate: string, endDate: string): Promise<SortieInterface[]> {
    return new Promise<SortieInterface[]>((resolve, reject) => {
      this.http.post(`${this.apiUrl}/period`, {date1: startDate, date2: endDate}).subscribe(
        (res: any)=>{
          resolve(<SortieInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
    });
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

  update(sortie: SortieInterface): Promise<SortieInterface>{
    return new Promise<SortieInterface>((resolve, reject)=>{
      this.http.put<SortieInterface>(`${this.apiUrl}`, sortie).subscribe(
        (res:any)=>{
          resolve(<SortieInterface> res);
        },
        (error)=>{
          reject(error);
        }
      );
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

  delete(id: number): Promise<void> {
    return new Promise<void>((resolve, reject)=>{
      this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(
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