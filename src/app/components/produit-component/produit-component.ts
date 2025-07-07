import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../produit-interface';
import { ProduitService } from '../../services/produit-service';

@Component({
  selector: 'app-produit-component',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,    
    FormsModule],
  templateUrl: './produit-component.html',
  styleUrls: ['./produit-component.css'] })
  
export class ProduitComponent implements OnInit{
  produitForm!: FormGroup;
  categorie: any[] = [];
  fournisseur: any[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private http: HttpClient){}

   ngOnInit(): void {
    this.produitForm = this.fb.group({
      nomprod: ['', Validators.required],
      prixprod: [0, Validators.required],
      stockprod: [0, Validators.required],
      seuilAlerteprod: [0, Validators.required],
      categorieId: ['', Validators.required],
      fournisseurId: ['', Validators.required]
    });

     // Charger catégories et fournisseurs
    this.http.get<any[]>('http://localhost:8080/categorie').subscribe(data => this.categorie = data);
    this.http.get<any[]>('http://localhost:8080/fournisseur').subscribe(data => this.fournisseur = data);
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const produit: Produit  = this.produitForm.value;
      this.produitService.creerProduit(produit).subscribe({
        next: (res: any) => {
          alert('Produit créé avec succès !');
          this.produitForm.reset();
        },
        error: (err: { message: string; }) => {
          alert('Erreur lors de la création : ' + err.message);
        }
      });
    }
  }

}
