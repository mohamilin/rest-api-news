import Fastify, { FastifyInstance } from 'fastify';
import newsRoutes from '../route';

describe('Describe for routes news / article of news', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(newsRoutes);
  });

  it('should create', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/',
      payload: {
        title: 'Article Data Satu Oke',
        slug: 'sdsdsadsds',
        content: 'dsdhsbdjhsgdjhsfgjhfgjkfdgsdf',
        topicIds: [
          'be950600-997d-404c-ba63-db31d67a6d67',
          'b418f3a5-98ec-4dd6-bef3-a5555617485b',
        ],
      },
    });

    const result = response.json();

    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Successfuly Created');
    expect(result.data).toHaveProperty('id');
    expect(result.data).toHaveProperty('title');
    expect(result.data).toHaveProperty('slug');
    expect(result.data).toHaveProperty('content');
    expect(result.data).toHaveProperty('status');
  });

  it('should get all news', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    const result = response.json();

    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Successfuly Get All');
    expect(result.data[0]).toHaveProperty('id');
    expect(result.data[0]).toHaveProperty('title');
    expect(result.data[0]).toHaveProperty('slug');
    expect(result.data[0]).toHaveProperty('content');
    expect(result.data[0]).toHaveProperty('status');
    expect(result.data[0]).toHaveProperty('topics');
  });

  it('should get by id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/a483ab5c-04ae-4486-ac54-1118c2dcd304',
    });

    const result = response.json();

    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Successfuly get by id');
    expect(result.data).toHaveProperty('id');
    expect(result.data).toHaveProperty('title');
    expect(result.data).toHaveProperty('slug');
    expect(result.data).toHaveProperty('content');
    expect(result.data).toHaveProperty('status');
    expect(result.data).toHaveProperty('topics');
  });
});
