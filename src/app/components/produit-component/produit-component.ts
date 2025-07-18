import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitInterface } from '../../interfaces/produit-interface';
import { ProduitService } from '../../services/produit-service';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../services/categorie-service';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { FournisseurService } from '../../services/fournisseur-service';
import { FournisseurInterface } from '../../interfaces/fournisseur-interface';
import { HttpClient } from '@angular/common/http';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';

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
  categorie: any[] = [];
  fournisseur: any[] = [];

  listeCategories : CategorieInterface[] = [];
  listeFournisseurs : FournisseurInterface[]=[];
  //

  //Injecter un service en angular
  categorieService = inject(CategorieService);
  fournisseurservice = inject(FournisseurService);

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private http: HttpClient){}

   ngOnInit(): void {
    this.initProduitForm();

     // Charger catégories et fournisseurs
     // tu ne peux pas écrire le chargement de ces éléments là de cette manière
     // parce que si ta bdd contient 1000 catégorie et 500 founisseurs tu les chargent tous en même temps 
     // pour rien parce que l'utilisateur vas rechercher une catégorie et un founirsseur en particulier
     // le navigateur du pauvre utilisateur vas ce mettre à ramer il vas croire que son ordi est gaté
     // il faut plutot en charger avec un maximum ET uniquement si l'utilisateur se met à chercher la catégorie ou le fournisseur
    // de plus on ne met jamais l'url de ton serveur dans un component. seulement dans le service

    //this.http.get<any[]>('http://localhost:8080/categorie').subscribe(data => this.categorie = data);
    //this.http.get<any[]>('http://localhost:8080/fournisseur').subscribe(data => this.fournisseur = data);
  }

  initProduitForm(){
    this.produitForm = this.fb.group({
      nomprod: ['', Validators.required, noSpecialCharactersValidator],
      prixprod: [0, Validators.required, noSpecialCharactersValidator],
      stockprod: [0, Validators.required, noSpecialCharactersValidator],
      seuilAlerteprod: [0, Validators.required, noSpecialCharactersValidator],
      categorieId: ['', Validators.required, noSpecialCharactersValidator],
      categorieTerm: [''], 
      fournisseurId: ['', Validators.required, noSpecialCharactersValidator],
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

  //là quand l'utilisateur tape dans le champs texte on recherche les catégories correspondantes
  //et on affiche une petite liste
  async searchCategory(){
    const term = this.produitForm.value['categorieTerm'];
    if(term != ""){
      // ici le code javascript dans await sera traité en multithread
      // et c'est possible parce que c'est un Promise qu'on retourne
      // dans toutes tes méthodes tu retourne un Observable et c'est pas possible avec
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

  // ici on utilise pas await. si on veut que le code s'exécute dans le même thread que le code javascript
  // et surtout pour capturer les éventuelles erreurs sans try catch
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

  //quand l'utilisateur clique sur une catégorie on l'as sélectionne
  pickCategory(cat: CategorieInterface){
    this.produitForm.patchValue({'categorieId': cat.id});
    this.produitForm.patchValue({'categorieTerm': cat.nomcat});
    //et on efface la liste
    this.listeCategories = [];
  }

  pickFournisseur(fourni: FournisseurInterface){
    this.produitForm.patchValue({'fournisseurId': fourni.id});
    this.produitForm.patchValue({'fournisseurTerm': fourni.nomfourni});
    //et on efface la liste
    this.listeFournisseurs = [];
  }
  goBack(): void {
  window.history.back();
}

}
