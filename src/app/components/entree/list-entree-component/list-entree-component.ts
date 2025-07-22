import { Component } from '@angular/core';
import { EntreeInterface } from '../../../interfaces/entree.interface';
import { EntreeService } from '../../../services/entree.service';
import { Router } from '@angular/router';
import { ProduitInterface } from '../../../interfaces/produit-interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTools } from '../../../tools/date.tools';

@Component({
  selector: 'app-list-entree-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-entree-component.html',
  styleUrl: './list-entree-component.css'
})
export class ListEntreeComponent {
  entrees: EntreeInterface[] = [];
  produit: ProduitInterface[] = [];
  term: string = '';
  periodForm: FormGroup = new FormGroup({});


  constructor(
    private entreeService: EntreeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initPeriodForm();
    this.initEntree();
  }

  initEntree(): void {
    this.entreeService.getAll()
    .then(data => this.entrees = data)
    .catch(err => console.error('Erreur de chargement des entrées :', err));
  }

  initPeriodForm(){
    const dateString = DateTools.getString(new Date());
    this.periodForm = this.fb.group({
      startDate: [dateString],
      endDate: [dateString]
    });
  }

  searchEntree(): void {
    if(this.term != ""){
      this.entreeService.search(this.term)
      .then(data => this.entrees = data)
      .catch(err => console.error('Erreur de recherche des entrées :', err));
    }else{
      this.initEntree();
    }
  }

  checkPeriod(startDate: string, endDate: string){

    if(!startDate || !endDate || startDate == '' || endDate == ''){
      alert('Veuillez saisir une date de debut et une date de fin !');
      return false;
    }

    if(Date.parse(startDate) > Date.parse(endDate)){
      alert('La date de debut est plus grande que la date de fin !');
      return false;
    }

    return true;
  }

  filterByPeriod(){
    const startDate = this.periodForm.value['startDate'];
    const endDate = this.periodForm.value['endDate'];

    if(this.checkPeriod(startDate, endDate)){
      this.entreeService.filterByPeriod(startDate, endDate)
      .then(data => this.entrees = data)
      .catch(err => console.error('Erreur de recherche des entrées :', err));
    }
  }

  updateEntree(id: number): void {
    this.router.navigate(['entree/' + id]);
  }

  removeEntree(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.entreeService.delete(id).then(() => {
        alert('Entree supprimée avec succès.');
        this.initEntree();
      }).catch((error) => {
        console.log(error);
        alert("Une erreur est survenue !");
      });
    }
  }
  
  goToNewEntree(): void {
    this.router.navigate(['entree'])
  }
}
