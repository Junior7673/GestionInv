import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitInterface } from '../../interfaces/produit-interface';

@Component({
  selector: 'app-produit-component-update',
  imports: [ReactiveFormsModule],
  templateUrl: './produit-component-update.html',
  styleUrl: './produit-component-update.css'
})
export class ProduitComponentUpdate implements OnInit{
  formBuilder = inject(FormBuilder);
  produitService = inject(ProduitService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  urlId : string = '';
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
    this.initProduitForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initProduit();  }

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
        fournisseurId: this.produit.fournisseurId
      });
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
