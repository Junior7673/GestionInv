import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header-component/header-component";
import { FooterComponent } from "./components/footer-component/footer-component";

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] })

  
export class App {
  protected title = 'inventaire';
}
