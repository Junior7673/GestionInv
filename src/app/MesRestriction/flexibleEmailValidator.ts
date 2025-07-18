import { AbstractControl, ValidationErrors } from '@angular/forms';

export function flexibleEmailValidator(control: AbstractControl): ValidationErrors | null {
  const regex = /^[a-zA-Z]+[0-9]{2}@gmail(\.com)?$/; // accepte @gmail et @gmail.com
  const inputEmail = control.value?.trim();

  const valid = regex.test(inputEmail);
  return valid ? null : { invalidEmail: true };
}

/*

<div *ngIf="categorieForm.get('email')?.hasError('invalidEmail') && categorieForm.get('email')?.touched">
  <p class="error-message">
    Format d’adresse invalide. Utilise : prenomnomXX@gmail ou prenomnomXX@gmail.com
  </p>
</div>
*/ 