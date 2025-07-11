import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from '../../services/categorie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurInterface } from '../../interfaces/fournisseur-interface';
import { FournisseurService } from '../../services/fournisseur-service';

@Component({
  selector: 'app-fournisseur-component-update',
  imports: [ReactiveFormsModule],
  templateUrl: './fournisseur-component-update.html',
  styleUrl: './fournisseur-component-update.css'
})
export class FournisseurComponentUpdate implements OnInit{
  formBuilder = inject(FormBuilder);
  fournisseurService = inject(FournisseurService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  urlId : string = '';
  fournisseur: FournisseurInterface = {
    id:0,
    nomfourni:"",
    telephonefourni:"",
    adressefourni:""
  };
  fournisseurForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFournisseurForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initFournisseur();  }

  initFournisseur(){
      const id = Number.parseInt(this.urlId);
      this.fournisseurService.getById(id).then((fourni:FournisseurInterface)=>{
        this.fournisseur = fourni;
        this.initFournisseurForm();
      }).catch((error)=>{
        console.log(error);
      });
    }
  
    initFournisseurForm(){
      this.fournisseurForm = this.formBuilder.group({
        nomfourni: this.fournisseur.nomfourni,
        telephonfournir: this.fournisseur.telephonefourni,
        adressefourni: this.fournisseur.adressefourni,

      });
    }

    update(){
        const formValue: FournisseurInterface = this.fournisseurForm.value;
        formValue.id = this.fournisseur.id;
        this.fournisseurService.update(formValue).then(
          (fourni: FournisseurInterface)=>{
            alert("Fournisseur Modifiée avec succès !");
            this.fournisseur = fourni;
            this.initFournisseur();
          }
        ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
      }
    
      goBack(){
        this.router.navigate(['fournisseurs']);
      }
  

}
