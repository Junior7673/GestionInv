import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProduitComponent } from './components/produit-component/produit-component';

@Component({
  selector: 'app-root', 
  imports: [ProduitComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] })

export class App {
  protected title = 'inventaire';
}
