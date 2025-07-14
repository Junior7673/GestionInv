export interface ProduitInterface {
  id?: number;
  nomprod: string;
  prixprod: number;
  stockprod: number;
  seuilAlerteprod: number;
  categorieId: string;
  fournisseurId: string;
  nomcat?: string; 
  nomfourni?: string;

}
