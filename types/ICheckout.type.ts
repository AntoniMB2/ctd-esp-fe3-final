export type ICheckout = {
  customer: ICustomer;
  card: ICard;
  orderData: IOrderData;
};

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddress;
}

export interface IAddress {
  address2: string;
  ciudad: string;
  departamento: string;
  provincia: string;
  codigoPostal: string;
}

export interface ICard {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface IOrderData {
  nombre: string;
  cantidad: number;
  total: number;
  imagen: string;
}