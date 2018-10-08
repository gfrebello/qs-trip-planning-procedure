export interface IPaycheck {
  id?: number;
  name?: string;
  bankId?: string;
}

export const defaultValue: Readonly<IPaycheck> = {};
