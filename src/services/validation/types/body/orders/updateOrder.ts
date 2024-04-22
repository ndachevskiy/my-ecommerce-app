import { OrderStatus } from "../../../../../repositories/types/common/enums/orderStatus"

export type UpdateOrderRequestBody = {
    status?: OrderStatus;
    items?: Array<{
      productId: string;
      quantity: number;
    }>;
  };