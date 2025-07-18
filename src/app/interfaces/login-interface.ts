export interface LoginInterface{
      id?: number;
      nomUtilisateur: string;
      motDePasse: string;

      role?: 'ADMIN' | 'UTILISATEUR'; // facultatif pour l'inscription

}