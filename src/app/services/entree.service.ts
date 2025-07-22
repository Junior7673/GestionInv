import { Observable } from "rxjs";
import { EntreeInterface } from "../interfaces/entree.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProduitService } from "./produit-service";

@Injectable()
export class EntreeService {

  apiUrl = 'http://localhost:8080/entree';

  constructor(private http: HttpClient) { }

  getAll(): Promise<EntreeInterface[]> {
    return new Promise<EntreeInterface[]>((resolve, reject) => {
      this.http.get(`${this.apiUrl}`).subscribe(
        (res: any)=>{
          resolve(<EntreeInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
    });
  }

  search(term: string): Promise<EntreeInterface[]> {
    return new Promise<EntreeInterface[]>((resolve, reject) => {
      this.http.get(`${this.apiUrl}/search/${term}`).subscribe(
        (res: any)=>{
          resolve(<EntreeInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
    });
  }

  filterByPeriod(startDate: string, endDate: string): Promise<EntreeInterface[]> {
    return new Promise<EntreeInterface[]>((resolve, reject) => {
      this.http.post(`${this.apiUrl}/period`, {date1: startDate, date2: endDate}).subscribe(
        (res: any)=>{
          resolve(<EntreeInterface[]>res);
        },
        (error: any)=>{
          reject(error);
        }
      );
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