import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortieInterface } from '../../../interfaces/sortie.interface';
import { SortieService } from '../../../services/sortie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateTools } from '../../../tools/date.tools';

@Component({
  selector: 'app-list-sortie-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-sortie-component.html',
  styleUrl: './list-sortie-component.css'
})
export class ListSortieComponent {
  sorties: SortieInterface[] = [];
  periodForm: FormGroup = new FormGroup({});
  term: string = '';

  constructor(
    private sortieService: SortieService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initPeriodForm();
    this.initSortie();
  }

  initSortie(): void {
    this.sortieService.getAll()
    .then(data => this.sorties = data)
    .catch(err => {
      console.error('Erreur lors du chargement des sorties :', err);
      alert('Erreur de chargement des sorties');
    });
  }

  initPeriodForm(){
    const dateString = DateTools.getString(new Date());
    this.periodForm = this.fb.group({
      startDate: [dateString],
      endDate: [dateString]
    });
  }

  searchSortie(){
    this.sortieService.search(this.term).then(
      (res)=>{
        this.sorties = res;
      },
      (err)=>{
        console.log(err);
        alert("Une erreur est survenue !");
      }
    )
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
      this.sortieService.filterByPeriod(startDate, endDate)
      .then(data => this.sorties = data)
      .catch(err => console.error('Erreur de recherche des entrées :', err));
    }
  }
  
  updateSortie(id: number): void {
    this.router.navigate(['sortie/' + id]);
  }

  removeSortie(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.sortieService.delete(id).then(() => {
        alert('Sortie supprimée avec succès.');
        this.initSortie();
      }).catch((error) => {
        console.log(error);
        alert("Une erreur est survenue !");
      });
    }
  }
   
  goToNewSortie(): void {
    this.router.navigate(['sortie']);
  }
}
