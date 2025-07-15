import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitInterface } from '../../interfaces/produit-interface';
import { FournisseurInterface } from '../../interfaces/fournisseur-interface';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { CategorieService } from '../../services/categorie-service';
import { FournisseurService } from '../../services/fournisseur-service';

@Component({
  selector: 'app-produit-component-update',
  imports: [ReactiveFormsModule],
  templateUrl: './produit-component-update.html',
  styleUrl: './produit-component-update.css'
})
export class ProduitComponentUpdate implements OnInit{
  formBuilder = inject(FormBuilder);
  produitService = inject(ProduitService);
  categorieService = inject(CategorieService);
  fournisseurService = inject(FournisseurService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  urlId : string = '';
  categories : CategorieInterface[] = [];
  i_nomcat : string = '';
  fournisseurs : FournisseurInterface[] = [];
  i_nomfourni : string = '';
  produit: ProduitInterface = {
    id:0,
    nomprod:"",
    prixprod:0,
    stockprod:0,
    seuilAlerteprod:0,
    categorieId:0,
    fournisseurId:0,
    nomcat:"",
    nomfourni:""
  };

  produitForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.initProduitForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initProduit();  
  }

  initProduit(){
    const id = Number.parseInt(this.urlId);
    this.produitService.getById(id).then(async (prod:ProduitInterface)=>{
      this.produit = prod;
      console.log(this.produit);
      //
      const categorie = await this.categorieService.getById(this.produit.categorieId);
      this.i_nomcat = categorie.nomcat;
      const fournisseur = await this.fournisseurService.getById(this.produit.fournisseurId);
      this.i_nomfourni = fournisseur.nomfourni;
      //
      this.initProduitForm();
    }).catch((error)=>{
      console.log(error);
    });
  }
  
  initProduitForm(){
    this.produitForm = this.formBuilder.group({
      nomprod: this.produit.nomprod,
      prixprod: this.produit.prixprod,
      stockprod: this.produit.stockprod,
      seuilAlerteprod: this.produit.seuilAlerteprod,
      nomcat: this.i_nomcat,
      nomfourni: this.i_nomfourni,
      categorieId: this.produit.categorieId,
      fournisseurId: this.produit.fournisseurId,
    });
  }

  searchCategorie(){
    const term = this.produitForm.value['nomcat'];
    if(term != ''){
      this.categorieService.searchbyName(term).then((cats)=>{
        this.categories = cats;
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.produitForm.patchValue({categorieId: 0});
    }
  }

  pickCategorie(categorie: CategorieInterface){
    this.produitForm.patchValue({'categorieId': categorie.id});
    this.produitForm.patchValue({'nomcat': categorie.nomcat});
    //et on efface la liste
    this.categories = [];
  }

  searchFournisseur(){
    const term = this.produitForm.value['nomfourni'];
    if(term != ''){
      this.fournisseurService.searchByName(term).then((fournis)=>{
        this.fournisseurs = fournis;
      }).catch((error)=>{
        console.log(error);
      });
    }else{
      this.produitForm.patchValue({fournisseurId: 0});
    }
  }

  pickFournisseur(fournisseur: FournisseurInterface){
    this.produitForm.patchValue({'fournisseurId': fournisseur.id});
    this.produitForm.patchValue({'nomfourni': fournisseur.nomfourni});
    //et on efface la liste
    this.fournisseurs = [];
  }

  update(){
    const formValue: ProduitInterface = this.produitForm.value;
    formValue.id = this.produit.id;
    this.produitService.update(formValue).then(
      (prod: ProduitInterface)=>{
        alert("Produit Modifié avec succès !");
        this.produit = prod;
        this.initProduit();
      }
    ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
  }
    
  goBack(): void {
    window.history.back();
  }

}
