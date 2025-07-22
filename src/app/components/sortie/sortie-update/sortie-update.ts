import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SortieService } from '../../../services/sortie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SortieInterface } from '../../../interfaces/sortie.interface';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { ProduitService } from '../../../services/produit-service';

@Component({
  selector: 'app-sortie-update',
  imports: [ReactiveFormsModule],
  templateUrl: './sortie-update.html',
  styleUrl: './sortie-update.css'
})
export class SortieUpdate implements OnInit{
  formBuilder = inject(FormBuilder);
  sortieService = inject(SortieService);
  produitService = inject(ProduitService);
  
  route = inject(ActivatedRoute);
  router = inject(Router);

  urlId : string = '';
    sortie: SortieInterface = {
      id:0,
      stock:0,
      date: new Date(),
      nomprod:"",
      produitId:0,
    };

     sortieForm: FormGroup = new FormGroup({});
      produits : ProduitInterface[] = [];
      produitSelected : ProduitInterface = {
        id: 0,
        nomprod: '',
        prixprod: 0,
        stockprod: 0,
        seuilAlerteprod: 0,
        categorieId: 0,
        fournisseurId: 0
      };

  ngOnInit(): void {
    this.initSortieForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initSortie(); 
  }

  initSortie(){
      const id = Number.parseInt(this.urlId);
      this.sortieService.getById(id).then((sortie:SortieInterface)=>{
        this.sortie = sortie;
        this.initSortieForm();
      }).catch((error)=>{
        console.log(error);
      });
    }
    
  initSortieForm(){
    this.sortieForm = this.formBuilder.group({
      stock: this.sortie.stock,
      date: this.sortie.date,
      produitText: this.sortie.nomprod,
      produitId: this.sortie.produitId
    });
  }

  searchProduit(){
    const term = this.sortieForm.value['nomprod'];
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

  update(){
    const formValue: SortieInterface = this.sortieForm.value;
    formValue.id = this.sortie.id;
    this.sortieService.update(formValue).then(
      (sortie: SortieInterface)=>{
        alert("Sortie Modifiée avec succès !");
        this.sortie = sortie;
        this.initSortieForm();
      }
    ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
  }
        
  goBack(): void {
    window.history.back();
  }
}
