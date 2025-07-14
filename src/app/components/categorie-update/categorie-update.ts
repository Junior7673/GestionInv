import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from '../../services/categorie-service';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-update',
  imports: [ReactiveFormsModule],
  templateUrl: './categorie-update.html',
  styleUrl: './categorie-update.css'
})
export class CategorieUpdate implements OnInit{
  formBuilder = inject(FormBuilder);
  categorieService = inject(CategorieService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  urlId : string = '';
  categorie: CategorieInterface = {
    id:0,
    nomcat:"",
    descriptioncat:""
  };
  categorieForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initCategorieForm();
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.initCategorie();
  }

  initCategorie(){
    const id = Number.parseInt(this.urlId);
    this.categorieService.getById(id).then((cat:CategorieInterface)=>{
      this.categorie = cat;
      this.initCategorieForm();
    }).catch((error)=>{
      console.log(error);
    });
  }

  initCategorieForm(){
    this.categorieForm = this.formBuilder.group({
      nomcat: this.categorie.nomcat,
      descriptioncat: this.categorie.descriptioncat
    });
  }

  update(){
    const formValue: CategorieInterface = this.categorieForm.value;
    formValue.id = this.categorie.id;
    this.categorieService.update(formValue).then(
      (cat: CategorieInterface)=>{
        alert("Catégorie Modifiée avec succès !");
        this.categorie = cat;
        this.initCategorieForm();
      }
    ).catch((error)=>{alert("Une erreur est survenue !");console.log(error);})
  }

  
goBack(): void {
  window.history.back();
}
}
