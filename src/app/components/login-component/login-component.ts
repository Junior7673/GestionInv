import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../interfaces/login-interface';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';
import { passwordStrengthValidator } from '../../MesRestriction/passwordStrengthValidator';

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
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
      nomUtilisateur: ['', [Validators.required, noSpecialCharactersValidator]],
      motDePasse: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginInterface = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => this.router.navigate(['/produits']),
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
