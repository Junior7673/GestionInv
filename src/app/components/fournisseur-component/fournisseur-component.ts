import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fournisseur-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './fournisseur-component.html',
  styleUrls: ['./fournisseur-component.css']
})
export class FournisseurComponent implements OnInit{
  fournisseurForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fournisseurForm = this.fb.group({
      nomfourni: ['', Validators.required],
      telephonefourni: ['', Validators.required],
      adressefourni: ['', [Validators.required, Validators.email]],

    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const fournisseur = this.fournisseurForm.value;
      this.http.post('http://localhost:8080/fournisseur', fournisseur).subscribe({
        next: () => {
          alert('Fournisseur ajouté avec succès !');
          this.fournisseurForm.reset();
        },
        error: err => {
          alert('Erreur : ' + err.message);
        }
      });
    }
  }
}
