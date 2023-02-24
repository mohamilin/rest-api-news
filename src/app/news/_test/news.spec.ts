import Fastify, { FastifyInstance } from 'fastify';
import newsRoutes from '../route';
import topicRoutes from '../../topic/route';

describe('Describe for routes news / article of news', () => {
  let server: FastifyInstance;
  let resultTopic: any;

  beforeAll(async () => {
    server = Fastify();
    server.register(newsRoutes);
    const topicServer = server.register(topicRoutes);
    const response = await topicServer.inject({
      method: 'POST',
      url: '/topics',
      payload: {
        title: 'Article Data Satu Oke',
        slug: 'sdsdsadsds',
      },
    });

    resultTopic = response.json();
    
  });

  it('should create - success', async () => {    
    const response = await server.inject({
      method: 'POST',
      url: '/news',
      payload: {
        title: 'Article Data Satu Oke',
        slug: 'sdsdsadsds',
        content: 'dsdhsbdjhsgdjhsfgjhfgjkfdgsdf',
        topicIds: [
          resultTopic.data.id
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

  it('should create - failed', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/news',
      payload: {
        title: 12132323,
        slug: 'sdsdsadsds',
        content: 'dsdhsbdjhsgdjhsfgjhfgjkfdgsdf',
        topicIds: [
          'be950600-997d-404c-ba63-db31d67a6d67',
          'b418f3a5-98ec-4dd6-bef3-a5555617485b',
        ],
      },
    });

    const result = response.json();    
    expect(result.success).toEqual(false);
  });

  it('should get all news', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/news',
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

  it('should get all news - error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `/news/?status=${12322}`,
    });

    const result = response.json();

    expect(result.success).toEqual(false);
  });

  it('should get by id - success', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/news/a483ab5c-04ae-4486-ac54-1118c2dcd304',
    });

    const result = response.json();

    expect(result).toBeDefined();

  });

  it('should get by id - not found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/news/a483ab5c-04ae-4486-ac54-1118c2dcd305',
    });

    const result = response.json();

    expect(result).toBeDefined();
  });

  it('should get by id - error', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/news/a483ab5c-04ae-4486-ac54-1118c2dcd305sfsfsdf2333',
    });

    const result = response.json();

    expect(result.success).toEqual(false);
  });
});
