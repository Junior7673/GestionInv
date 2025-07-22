import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../../../services/categorie-service';
import { CategorieInterface } from '../../../interfaces/categorie-interface';
import { noSpecialCharactersValidator } from '../../../MesRestriction/noSpecialCharactersValidator';

@Component({
  selector: 'app-categorie-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './categorie-component.html',
  styleUrls: ['./categorie-component.css']
})
export class CategorieComponent implements OnInit{
   categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.initCategorieForm();
  }

  initCategorieForm(){
    this.categoryForm = this.fb.group({
      nomcat: ['', Validators.required],
      descriptioncat: ['']
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categorie: CategorieInterface  = this.categoryForm.value;
      this.categorieService.create(categorie).then((val)=>{
        alert('Catégorie créé avec succès !');
        this.categoryForm.reset();
      }).catch((err)=>{
        alert('Erreur lors de la création !');
        console.log(err);
      });
    }else{
      alert("Veuillez remplir les champs obligatoires !");
    }
  }
goBack(): void {
  window.history.back();
}


}
