import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/produit';

  constructor(private http: HttpClient) { }

  creerProduit(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
