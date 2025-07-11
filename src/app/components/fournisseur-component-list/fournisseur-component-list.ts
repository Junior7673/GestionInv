import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FournisseurInterface } from '../../interfaces/fournisseur-interface';
import { FournisseurService } from '../../services/fournisseur-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur-component-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './fournisseur-component-list.html',
  styleUrl: './fournisseur-component-list.css'
})
export class FournisseurComponentList implements OnInit {
  fournisseurForm!: FormGroup;

  fournisseurs: FournisseurInterface[] = [];

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerFournisseur();
  }

  chargerFournisseur(): void {
    this.fournisseurService.getAll().subscribe({
      next: data => this.fournisseurs = data,
      error: err => alert('Erreur lors du chargement : ' + err.message)
    });
  }

  supprimerFournisseur(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.fournisseurService.delete(id).subscribe({
        next: () => {
          alert('Fournisseur supprimée avec succès.');
          this.chargerFournisseur();
        },
        error: err => alert('Erreur lors de la suppression : ' + err.message)
      });
    }
  }

  modifierFournisseur(id: number): void {
    this.router.navigate(['fournisseur/' + id]);
  }

}
