import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FournisseurInterface } from '../../../interfaces/fournisseur-interface';
import { FournisseurService } from '../../../services/fournisseur-service';

@Component({
  selector: 'app-fournisseur-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './fournisseur-component.html',
  styleUrls: ['./fournisseur-component.css']
})
export class FournisseurComponent implements OnInit{
  fournisseurForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.initFournisseurForm();
  }

  initFournisseurForm(){
    this.fournisseurForm = this.fb.group({
      nomfourni: ['', Validators.required],
      telephonefourni: ['', Validators.required],
      adressefourni: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const fournisseur: FournisseurInterface  = this.fournisseurForm.value;
      this.fournisseurService.create(fournisseur).then((fournisseur)=>{
        alert('Fournisseur créé avec succès !');
        this.fournisseurForm.reset();
      }).catch((err)=>{
        alert('Erreur lors de la création !');
          console.log(err);
      });
    }else{
      alert("Veuillez saisir les champs obligatoires !");
    }
  }
      
  goBack(): void {
  window.history.back();
}
}
