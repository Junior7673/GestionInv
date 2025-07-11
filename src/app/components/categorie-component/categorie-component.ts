import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      nomcat: ['', Validators.required],
      descriptioncat: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.categorieForm.valid) {
      const categorie = this.categorieForm.value;
      this.http.post('http://localhost:8080/categorie/add', categorie).subscribe({
        next: () => {
          alert('Catégorie ajoutée avec succès !');
          this.categorieForm.reset();
        },
        error: err => {
          alert('Erreur : ' + err.message);
        }
      });
  }
}
goBack(): void {
  window.history.back();
}


}
