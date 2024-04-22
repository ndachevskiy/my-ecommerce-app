import { OrderStatus } from '../enums/orderStatus';

export type Order = {
  id: string;
  createTime: string | Date;
  createdBy: string;
  status: OrderStatus;
  itemsIds: string[];
};
