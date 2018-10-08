export interface IPayment {
  id?: number;
  amount?: number;
}

export const defaultValue: Readonly<IPayment> = {};
