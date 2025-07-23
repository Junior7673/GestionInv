import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar-component/topbar-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout-component',
  imports: [TopbarComponent, RouterOutlet],
  templateUrl: './app-layout-component.html',
  styleUrl: './app-layout-component.css'
})
export class AppLayoutComponent {

}
