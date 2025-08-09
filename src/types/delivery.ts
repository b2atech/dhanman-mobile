export interface DeliveryCompany {
  
  deliveryCompanyId: number;
  deliveryCompanyName: string;
  deliveryCompanyCategoryId: number;
  deliveryCompanyCategoryName: string;
  deliveryCompanyIcon: string;
}

export interface DeliveryCompaniesResponse {
  cursor: string;
  items: DeliveryCompany[];
}
