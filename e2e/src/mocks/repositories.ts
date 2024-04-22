import { v4 as uuidv4 } from 'uuid'

export const mockProductRepository = {
    findByParams: jest.fn().mockImplementation(({ filter }) => {
      const products = [
        { id: 'cafe1e28-0edf-4cb2-a97c-dc58145c7d61', name: 'Laptop Pro' },
        { id: '2c7d9b7b-1ebd-4b9b-9a29-b13faf2e6c33', name: 'Smartphone Plus' }
      ];
      return Promise.resolve(
        products.filter((product) => filter.includes(product.id))
      );
    }),
    create: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
    findByID: jest.fn().mockResolvedValue(undefined),
    createMany: jest.fn().mockResolvedValue([])
  };
  

  export const mockItemRepository = {
    createMany: jest.fn().mockImplementation((items) => {
      return Promise.resolve(
        items.map((item) => ({
          id: 'item-' + Math.random().toString(36).substr(2, 9),
          quantity: item.quantity,
          productId: item.productId,
          orderId: item.orderId,
        }))
      );
    }),
    create: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
    findByID: jest.fn().mockResolvedValue(undefined),
    findByParams: jest.fn().mockResolvedValue([])
  };
  

export const mockOrderRepository = {
    create: jest.fn().mockImplementation((order) => {
      return Promise.resolve({
        ...order,
        id: 'order-' + Math.random().toString(36).substr(2, 9),
        createTime: new Date().toISOString(),
      });
    }),
    update: jest.fn().mockImplementation((id, changes) => {
      const initialOrder = {
        id: id,
        createTime: new Date().toISOString(),
        createdBy: {
          data: { id: '302a8334-ce5d-4f8c-b74d-c82bfe8eebe4' },
          self: "/api/v1/customers/302a8334-ce5d-4f8c-b74d-c82bfe8eebe4"
        },
        status: 'Processed',
        itemsIds: [
          {
            data: { id: "existing-item-id" },
            self: "/api/v1/items/existing-item-id"
          }
        ]
      };
    
      const newItems = changes.items?.map(item => ({
        data: { id: uuidv4() },
        self: `/api/v1/items/${uuidv4()}`
      }));
    
      return Promise.resolve({
        ...initialOrder,
        ...changes,
        itemsIds: newItems || initialOrder.itemsIds.map(item => item.self) // Меняем на массив строк
      });
    }),
    
    delete: jest.fn().mockResolvedValue(undefined),
    findByID: jest.fn().mockImplementation((id) => id),
    findByParams: jest.fn().mockResolvedValue([]),
    createMany: jest.fn().mockResolvedValue([])
  };
  
