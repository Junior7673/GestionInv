import { AbstractControl, ValidationErrors } from '@angular/forms';

export function telephoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toString().trim();

  if (!value || value === '') {
    return null; // laisse passer si champ vide (géré par required ailleurs)
  }

  // Accepte :
  // - chiffres seuls
  // - espaces
  // - préfixe international avec +
  const regex = /^\+?[0-9 ]{8,20}$/;

  if (!regex.test(value)) {
    return { invalidTelephone: true };
  }

  return null;
}
