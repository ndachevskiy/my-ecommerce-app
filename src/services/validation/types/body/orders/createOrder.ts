export type CreateOrderRequestBody = {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};
