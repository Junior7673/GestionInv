import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from "./components/layout/topbar-component/topbar-component";

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TopbarComponent
],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] })

  
export class App {
  protected title = 'inventaire';
}
