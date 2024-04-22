import supertest from 'supertest';
import { createContext } from "../../../src/app/domain/context/createContext";
import { generateTestToken } from '../utils/auth';
import { config } from '../config';
import { setupServerRoutes } from '../utils/setupServerRoutes';
import { mockOrderRepository, mockProductRepository, mockItemRepository } from '../mocks/repositories';


describe('Order E2E Tests', () => {
  let request;
  let context;

  beforeAll(async () => {
    context = await createContext();

    context.repositories.orderRepository = mockOrderRepository;
    context.repositories.itemRepository = mockItemRepository;
    context.repositories.productRepository = mockProductRepository;

    setupServerRoutes(context, config as unknown);
    
    request = supertest(context.services.server.getServerInstance());
  });

  it('should create an order correctly', async () => {
    const token = 'Bearer ' + generateTestToken(config);
    const orderPayload = {
      items: [
        { productId: "cafe1e28-0edf-4cb2-a97c-dc58145c7d61", quantity: 2 },
        { productId: "2c7d9b7b-1ebd-4b9b-9a29-b13faf2e6c33", quantity: 1 }
      ]
    };

    const response = await request.post('/api/v1/orders')
      .send(orderPayload)
      .set('Authorization', token)
      .set('Service', 'test')
      .set('Transaction-ID', 'test')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
        data: {
          id: expect.any(String),
          createTime: expect.any(String),
          createdBy: expect.objectContaining({
            data: {
              id: expect.any(String)
            },
            self: expect.stringContaining('/api/v1/customers/')
          }),
          status: "Pending",
          itemsIds: expect.arrayContaining([
            {
              data: {
                id: expect.any(String)
              },
              self: expect.stringContaining('/api/v1/items/')
            }
          ])
        },
        links: expect.objectContaining({
          self: expect.stringContaining('/api/v1/orders/'),
          update: expect.objectContaining({
            href: expect.stringContaining('/api/v1/orders/'),
            method: "PATCH"
          }),
          delete: expect.stringContaining('/api/v1/orders/')
        })
      });
  });

  it('should update an order correctly', async () => {
    const orderId = 'bc9a17d1-d76e-4285-b142-1c3b841e69af'; 
    const token = 'Bearer ' + generateTestToken(config);
    const updatePayload = {
      status: 'Processed',
      items: [
        { productId: "cafe1e28-0edf-4cb2-a97c-dc58145c7d61", quantity: 3 },
        { productId: "2c7d9b7b-1ebd-4b9b-9a29-b13faf2e6c33", quantity: 2 }
      ]
    };

    const response = await request.patch(`/api/v1/orders/${orderId}`)
      .send(updatePayload)
      .set('Authorization', token)
      .set('Service', 'test')
      .set('Transaction-ID', 'test')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
        data: {
          id: expect.any(String),
          status: 'Processed',
          itemsIds: expect.arrayContaining([
            {
              data: { id: expect.any(String) },
              self: expect.stringContaining('/api/v1/items/')
            }
          ])
        },
        links: {
          self: expect.stringContaining(`/api/v1/orders/${orderId}`),
          update: {
            href: expect.stringContaining(`/api/v1/orders/${orderId}`),
            method: "PATCH"
          },
          delete: expect.stringContaining(`/api/v1/orders/${orderId}`)
        }
      });      
      
  });
});



