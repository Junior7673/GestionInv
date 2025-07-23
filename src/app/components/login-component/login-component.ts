import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../interfaces/login-interface';
@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.fb.group({
      nomUtilisateur: ['', [Validators.required]],
      motDePasse: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginInterface = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => alert("Nom d'utilisateur ou mot de passe incorrect")
      });
    }else{
      alert("Identifiants de connexion invalide !");
    }
  }

  get nomUtilisateur() {
    return this.loginForm.get('nomUtilisateur');
  }

  get motDePasse() {
    return this.loginForm.get('motDePasse');
  }

}
