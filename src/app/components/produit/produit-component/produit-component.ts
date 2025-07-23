import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { ProduitService } from '../../../services/produit-service';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../../services/categorie-service';
import { CategorieInterface } from '../../../interfaces/categorie-interface';
import { FournisseurService } from '../../../services/fournisseur-service';
import { FournisseurInterface } from '../../../interfaces/fournisseur-interface';
import { noSpecialCharactersValidator } from '../../../MesRestriction/noSpecialCharactersValidator';

@Component({
  selector: 'app-produit-component',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    CommonModule,    
    FormsModule],
  templateUrl: './produit-component.html',
  styleUrls: ['./produit-component.css'] })
  
export class ProduitComponent implements OnInit{
  produitForm!: FormGroup;
  categorie: CategorieInterface[] = [];
  fournisseur: FournisseurInterface[] = [];

  listeCategories : CategorieInterface[] = [];
  listeFournisseurs : FournisseurInterface[]=[];
  //

  //Injecter un service en angular
  categorieService = inject(CategorieService);
  fournisseurservice = inject(FournisseurService);

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService){}

   ngOnInit(): void {
    this.initProduitForm();
  }

  initProduitForm(){
    this.produitForm = this.fb.group({
      nomprod: ['', [Validators.required, noSpecialCharactersValidator]],
      prixprod: [0, [Validators.required, Validators.min(0)]],
      stockprod: [0, [Validators.required, Validators.min(0)]],
      seuilAlerteprod: [0, [Validators.required, Validators.min(0)]],
      categorieId: ['', Validators.required],
      categorieTerm: [''], 
      fournisseurId: ['', Validators.required],
      fournisseurTerm: ['']
    });
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const produit: ProduitInterface  = this.produitForm.value;
      this.produitService.creerProduit(produit).then((produit:ProduitInterface)=>{
        alert('Produit créé avec succès !');
        this.produitForm.reset();
      }).catch((err)=>{
        alert('Erreur lors de la création !');
          console.log(err);
      });
    }
  }

  async searchCategory(){
    const term = this.produitForm.value['categorieTerm'];
    if(term != ""){
      const liste = await this.categorieService.searchbyName(term);
      this.listeCategories = liste;
    }
  }

  async searchFournisseur(){
    const term = this.produitForm.value['fournisseurTerm'];
    if(term !=""){
      const liste = await this.fournisseurservice.searchByName(term);
      this.listeFournisseurs = liste;
    }
  }

  noAsyncSearchCategory(){
    const term = this.produitForm.value['categorieTerm'];
    if(term != ""){
      this.categorieService.searchbyName(term).then(
        (liste: CategorieInterface[])=>{
          this.listeCategories = liste;
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      );
    }else{
      this.listeCategories = [];
    }
  }

  noAsyncSearchFournisseur(){
    const term = this.produitForm.value['fournisseurTerm'];
    this.fournisseurservice.searchByName(term).then(
      (liste: FournisseurInterface[])=>{
        this.listeFournisseurs = liste;
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  pickCategory(cat: CategorieInterface){
    this.produitForm.patchValue({'categorieId': cat.id});
    this.produitForm.patchValue({'categorieTerm': cat.nomcat});
    this.listeCategories = [];
  }

  pickFournisseur(fourni: FournisseurInterface){
    this.produitForm.patchValue({'fournisseurId': fourni.id});
    this.produitForm.patchValue({'fournisseurTerm': fourni.nomfourni});
    this.listeFournisseurs = [];
  }

  goBack(): void {
    window.history.back();
  }

}
