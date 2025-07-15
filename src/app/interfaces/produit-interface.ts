export interface ProduitInterface {
  id?: number;
  nomprod: string;
  prixprod: number;
  stockprod: number;
  seuilAlerteprod: number;
  categorieId: number;
  fournisseurId: number;
  nomcat?: string; 
  nomfourni?: string;

}
