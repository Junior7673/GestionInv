import { Component } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', 
  imports: [
    
    RouterOutlet,
    HttpClientModule,
    CommonModule
],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] })

export class App {
  protected title = 'inventaire';
}
