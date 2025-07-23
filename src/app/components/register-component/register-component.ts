/*import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { LoginInterface } from '../../interfaces/login-interface';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';
import { passwordStrengthValidator } from '../../MesRestriction/passwordStrengthValidator';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
 registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nomUtilisateur: ['', [Validators.required, noSpecialCharactersValidator]],
      motDePasse: ['', [Validators.required, passwordStrengthValidator]],
      role: ['UTILISATEUR', Validators.required] // par défaut
    });
  }
   onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: LoginInterface = this.registerForm.value;
      this.authService.register(newUser).subscribe({
        next: () => {
          this.successMessage = "Inscription réussie ! Vous pouvez vous connecter.";
          this.registerForm.reset({ role: 'UTILISATEUR' });
          this.router.navigate(['/login']); // ou '/' selon ta homepage réelle
        },
        error: () => this.errorMessage = "Erreur lors de l'inscription."
      });
    }
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LoginInterface } from '../../interfaces/login-interface';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';
import { passwordStrengthValidator } from '../../MesRestriction/passwordStrengthValidator';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      nomUtilisateur: ['', [Validators.required, noSpecialCharactersValidator]],
      motDePasse: ['', [Validators.required, passwordStrengthValidator]],
      role: ['UTILISATEUR', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: LoginInterface = this.registerForm.value;
      this.authService.register(newUser).subscribe({
        next: () => {
          this.successMessage = "Inscription réussie ! Vous pouvez vous connecter.";
          this.registerForm.reset({ role: 'UTILISATEUR' });
          this.router.navigate(['/login']);
        },
        error: () => this.errorMessage = "Erreur lors de l'inscription."
      });
    } else {
      this.errorMessage = "Formulaire invalide. Veuillez vérifier les champs.";
    }
  }

  get nomUtilisateur() {
    return this.registerForm.get('nomUtilisateur');
  }

  get motDePasse() {
    return this.registerForm.get('motDePasse');
  }

  get role() {
    return this.registerForm.get('role');
  }
}
