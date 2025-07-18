import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CategorieService } from '../../services/categorie-service';
import { CategorieInterface } from '../../interfaces/categorie-interface';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';

@Component({
  selector: 'app-categorie-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './categorie-component.html',
  styleUrls: ['./categorie-component.css']
})
export class CategorieComponent implements OnInit{
   categorieForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      nomcat: ['', Validators.required, noSpecialCharactersValidator],
      descriptioncat: ['', Validators.required, noSpecialCharactersValidator]
    });
  }
  onSubmit(): void {
    if (this.categorieForm.valid) {
      const categorie: CategorieInterface  = this.categorieForm.value;
      this.categorieService.create(categorie).then((categorie:CategorieInterface)=>{
          alert('Catégorie créé avec succès !');
          this.categorieForm.reset();
      }).catch((err)=>{
          alert('Erreur lors de la création !');
            console.log(err);
          });
    }
}
goBack(): void {
  window.history.back();
}


}
