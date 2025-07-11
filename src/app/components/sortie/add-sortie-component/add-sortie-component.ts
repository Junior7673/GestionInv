import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SortieService } from '../../../services/sortie.service';
import { SortieInterface } from '../../../interfaces/sortie.interface';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { ProduitService } from '../../../services/produit-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sortie-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-sortie-component.html',
  styleUrl: './add-sortie-component.css'
})
export class AddSortieComponent implements OnInit{
  fb = inject(FormBuilder);
  sortieService = inject(SortieService);
  produitService = inject(ProduitService);
  router = inject(Router);
  //
  sortieForm: FormGroup = new FormGroup({});
  produits : ProduitInterface[] = [];
  produitSelected : ProduitInterface = {
    id: 0,
    nomprod: '',
    prixprod: 0,
    stockprod: 0,
    seuilAlerteprod: 0,
    categorieId: '',
    fournisseurId: ''
  };

  ngOnInit(): void {
    this.initSortieForm();
  }

  initSortieForm(){
    this.sortieForm = this.fb.group({
      produitId: ['', Validators.required],
      produitText: [''],
      stock: [0, Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.sortieForm.valid) {

      if(this.produitSelected.id == 0){
        alert('Veuillez choisir un produit !');
        return;
      }

      if(this.sortieForm.value['stock'] > this.produitSelected.stockprod){
        alert('Stock insuffisant !');
        return;
      }

      const stockrestant = this.produitSelected.stockprod - this.sortieForm.value['stock'];

      if(stockrestant < this.produitSelected.seuilAlerteprod){
        alert('Seuil de stock atteint !');
        return;
      }

      const sortie: SortieInterface  = this.sortieForm.value;
      this.sortieService.create(sortie).then((sortie: SortieInterface)=>{
        alert('Sortie créé avec succès !');
        this.sortieForm.reset();
      }).catch((err)=>{
        alert('Erreur lors de la création !');
          console.log(err);
      });
    }else{
      alert("Veuillez saisir les champs obligatoires !");
    }
  }

  searchProduit(){
    const term = this.sortieForm.value['produitText'];
    if(term != ""){
      this.produitService.searchByName(term).then((liste)=>{
        this.produits = liste;
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.produits = [];
    }
  }

  pickProduit(prod: ProduitInterface){
    this.produitSelected = prod;
    this.sortieForm.patchValue({produitText: prod.nomprod});
    this.sortieForm.patchValue({produitId: prod.id});
    this.produits = [];
  }

  goBack(){
    this.router.navigate(['sorties']);
  }

}
