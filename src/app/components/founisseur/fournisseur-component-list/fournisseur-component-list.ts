import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FournisseurInterface } from '../../../interfaces/fournisseur-interface';
import { FournisseurService } from '../../../services/fournisseur-service';
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
  term: string = '';
  fournisseurs: FournisseurInterface[] = [];

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFournisseur();
  }

  initFournisseur(): void {
    this.fournisseurService.getAll().then((fournisseurs) => {
      this.fournisseurs = fournisseurs;
    }).catch((error) => {
      console.log(error);
    });
  }

  searchFournisseur(){
    this.fournisseurService.searchByName(this.term).then((fournisseurs) => {
      this.fournisseurs = fournisseurs;
    }).catch((error) => {
      console.log(error);
    });
  }

  removeFournisseur(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.fournisseurService.delete(id).then(() => {
        alert('Fournisseur supprimée avec succès.');
        this.initFournisseur();
      }).catch((error) => {
        console.log(error);
        alert("Une erreur est survenue !");
      });
    }
  }

  updateFournisseur(id: number): void {
    this.router.navigate(['fournisseur/' + id]);
  }
   
  goToNewFournisseur(): void {
    this.router.navigate(['fournisseur']);
  }

}
