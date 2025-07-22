import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntreeService } from '../../../services/entree.service';
import { ProduitService } from '../../../services/produit-service';
import { Router } from '@angular/router';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { EntreeInterface } from '../../../interfaces/entree.interface';
import { DateTools } from '../../../tools/date.tools';

@Component({
  selector: 'app-add-entree-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-entree-component.html',
  styleUrl: './add-entree-component.css'
})
export class AddEntreeComponent implements OnInit{
  fb = inject(FormBuilder);
  entreeService = inject(EntreeService);
  produitService = inject(ProduitService);
  router = inject(Router);
  //
  today = DateTools.getString(new Date());
  entreeForm: FormGroup = new FormGroup({});
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
    this.initEntreeForm();
  }

  initEntreeForm(){
    this.entreeForm = this.fb.group({
      produitId: [0, Validators.required],
      produitText: [''],
      stock: [0, Validators.required],
      date: [DateTools.getString(new Date()), Validators.required]
    });
  }

  onSubmit(){
    if(this.entreeForm.valid) {

      if(this.produitSelected.id == 0){
        alert('Veuillez choisir un produit !');
        return;
      }

      const dateSortie = new Date(this.entreeForm.value['date']);
      if(dateSortie > new Date() || dateSortie < new Date('1900-01-01')){
        alert('Date d\'entrée invalide !');
        return;
      }

      const entree: EntreeInterface  = this.entreeForm.value;
      this.entreeService.create(entree).then((entree: EntreeInterface)=>{
        alert('Entrée créé avec succès !');
        this.entreeForm.reset();
      }).catch((err)=>{
        alert('Erreur lors de la création !');
          console.log(err);
      });
    }else{
      alert("Veuillez saisir les champs obligatoires !");
    }
  }

  searchProduit(){
    const term = this.entreeForm.value['produitText'];
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
    this.entreeForm.patchValue({produitText: prod.nomprod});
    this.entreeForm.patchValue({produitId: prod.id});
    this.produits = [];
  }

 
goBack(): void {
  window.history.back();
}
}
