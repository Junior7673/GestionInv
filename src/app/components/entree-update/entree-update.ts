import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntreeService } from '../../services/entree.service';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntreeInterface } from '../../interfaces/entree.interface';
import { ProduitInterface } from '../../interfaces/produit-interface';
import { SortieInterface } from '../../interfaces/sortie.interface';

@Component({
  selector: 'app-entree-update',
  imports: [ReactiveFormsModule],
  templateUrl: './entree-update.html',
  styleUrl: './entree-update.css'
})
export class EntreeUpdate implements OnInit{

  ngOnInit(): void {
    this.initEntreeForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initEntree();  
  }

  formBuilder = inject(FormBuilder);
  entreeService = inject(EntreeService);
  produitService = inject(ProduitService);
  
  route = inject(ActivatedRoute);
  router = inject(Router);

  
    urlId : string = '';
      entree: EntreeInterface = {
        id:0,
        stock:0,
        date: new Date(),
        nomprod:"",
        produitId:0,
      };

      
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
    
    
        initEntree(){
            const id = Number.parseInt(this.urlId);
            this.entreeService.getById(id).then((entree:EntreeInterface)=>{
              this.entree = entree;
              this.initEntreeForm();
            }).catch((error)=>{
              console.log(error);
            });
          }
        
          initEntreeForm(){
            this.entreeForm = this.formBuilder.group({
              stock: this.entree.stock,
              date: this.entree.date,
              nomprod: this.entree.nomprod,
              produitId: this.entree.produitId
            });
          }

          
    searchProduit(){
    const term = this.entreeForm.value['nomprod'];
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
      const formValue: EntreeInterface = this.entreeForm.value;
       formValue.id = this.entree.id;
          this.entreeService.update(formValue).then((entree: EntreeInterface)=>{
                  alert("Entree Modifiée avec succès !");
                  this.entree = entree;
                  this.initEntreeForm();
                }
              ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
            }
          
            
          goBack(): void {
            window.history.back();
          }


}
