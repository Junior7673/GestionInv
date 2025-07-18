import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { LoginInterface } from '../../interfaces/login-interface';
import { noSpecialCharactersValidator } from '../../MesRestriction/noSpecialCharactersValidator';
import { passwordStrengthValidator } from '../../MesRestriction/passwordStrengthValidator';

@Component({
  selector: 'app-register-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
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
      nomUtilisateur: ['',Validators.required, noSpecialCharactersValidator],
      motDePasse: ['', Validators.required, passwordStrengthValidator],
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
        },
        error: () => this.errorMessage = "Erreur lors de l'inscription."
      });
    }
  }
}
