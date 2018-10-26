export interface ICheckPayment {
  id?: number;
  name?: string;
  bankId?: string;
}

export const defaultValue: Readonly<ICheckPayment> = {};
