import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FournisseurInterface } from '../interfaces/fournisseur-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  [x: string]: any;

constructor(private http: HttpClient) { }
  getAll(): Observable<FournisseurInterface[]> {
    return this.http.get<FournisseurInterface[]>(this.apiUrl);
  }

  getById(id: number): Observable<FournisseurInterface> {
    return this.http.get<FournisseurInterface>(`${this.apiUrl}/${id}`);
  }

  create(fournisseur: FournisseurInterface): Observable<FournisseurInterface> {
    return this.http.post<FournisseurInterface>(this.apiUrl, fournisseur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }}
