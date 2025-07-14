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
  categorie : CategorieInterface = {
    id:0,
    nomcat: '',
    descriptioncat: ''
  };
  categories : CategorieInterface[] = [];
  fournisseur : FournisseurInterface = {
    id: 0,
    nomfourni: '',
    telephonefourni: '',
    adressefourni: ''
  };
  fournisseurs : FournisseurInterface[] = [];
  produit: ProduitInterface = {
    id:0,
    nomprod:"",
    prixprod:0,
    stockprod:0,
    seuilAlerteprod:0,
    categorieId:"",
    fournisseurId:"",
    nomcat:"",
    nomfourni:""
  };

  produitForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initProduit();  
    this.initProduitForm();
  }

  initProduit(){
    const id = Number.parseInt(this.urlId);
    this.produitService.getById(id).then((prod:ProduitInterface)=>{
      this.produit = prod;
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
      nomcat: this.produit.nomcat,
      nomfourni: this.produit.nomfourni,
      categorieId: this.produit.categorieId,
      fournisseurId: this.produit.fournisseurId,
    });
  }

  searchCategorie(){
    const term = this.produitForm.value['nomcat'];
    if(term != ''){
      this.categorieService.searchbyName(term).then((cats)=>{

      }).catch((error)=>)
    }else{
      this.produitForm.patchValue({categorieId: 0});
    }
  }

  update(){
    const formValue: ProduitInterface = this.produitForm.value;
    formValue.id = this.produit.id;
    this.produitService.update(formValue).then(
      (prod: ProduitInterface)=>{
        alert("Produit Modifié avec succès !");
        this.produit = prod;
        this.initProduitForm();
      }
    ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
  }
    
  goBack(): void {
    window.history.back();
  }

}
