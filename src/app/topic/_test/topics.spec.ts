import Fastify, { FastifyInstance } from 'fastify';
import topicRoutes from '../../topic/route';

describe('Describe for routes news / article of news', () => {
  let server: FastifyInstance;
  let resultTopic: any;
  let topicServer: any;

  beforeAll(async () => {
    server = Fastify();
    topicServer = server.register(topicRoutes);
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
    const response = await topicServer.inject({
        method: 'POST',
        url: '/topics',
        payload: {
          title: 'Article Data Satu Oke',
          slug: 'sdsdsadsds',
        },
      });
      
      const result = response.json();
      
      expect(result.success).toEqual(true);
      expect(result.message).toEqual('Successfuly created');
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('title');
      expect(result.data).toHaveProperty('slug');
  });

  it('should create - failed', async () => {
    const response = await topicServer.inject({
        method: 'POST',
        url: '/topics',
        payload: {
          title: 123231,
          slug: 'sdsdsadsds',
        },
      });
      
      const result = response.json();
      
      expect(result.success).toEqual(false);
  });

  it('should get all - success', async () => {
    const response = await topicServer.inject({
        method: 'GET',
        url: '/topics',
      });
      
      const result = response.json();
      
      expect(result.success).toEqual(true);
      expect(result.message).toEqual('Successfuly get all topic');
      expect(result.data[0]).toHaveProperty('id');
      expect(result.data[0]).toHaveProperty('title');
      expect(result.data[0]).toHaveProperty('slug');
  });

  it('should get by id - failed', async () => {
    const response = await topicServer.inject({
        method: 'GET',
        url: '/topics/topic=1232',
      });
      
      const result = response.json();
      
      expect(result.success).toEqual(false);
  });

  it('should get by id - success', async () => {
    const response = await topicServer.inject({
        method: 'GET',
        url: `/topics/${resultTopic.data.id}`,
      });
      
      const result = response.json();
      
      expect(result.success).toEqual(true);
  });

  it('should get by id - not found', async () => {
    const response = await topicServer.inject({
        method: 'GET',
        url: `/topics/a483ab5c-04ae-4486-ac54-1118c2dcd305`,
      });
      
      const result = response.json();      
      expect(result.success).toEqual(false);
  });

  it('should update - success', async () => {
    const response = await topicServer.inject({
      method: 'PUT',
      url: `/topics/${resultTopic.data.id}`,
      payload: {
        title: "Data News",
      }
    });

    const result = response.json();        
    expect(result.success).toEqual(true);
  });

  it('should update - not found id', async () => {
    const response = await topicServer.inject({
      method: 'PUT',
      url: `/topics/c7db6039-d33b-4bf8-90f7-93e576197191`,
      payload: {
        title: "Data News",
      }
    });

    const result = response.json();        
    expect(result.success).toEqual(false);
  });

  it('should update - error', async () => {
    const response = await topicServer.inject({
      method: 'PUT',
      url: '/topics/a483ab5c-04ae-4486-ac54-1118c2dcd305sfsfsdf2333',
      payload: {
        title: 12132323,
      }
    });

    const result = response.json();
    expect(result.success).toEqual(false);
  });

  /**
   * Delete
   */

  it('should Delete - success', async () => {
    const response = await topicServer.inject({
      method: 'DELETE',
      url: `/topics/${resultTopic.data.id}`,
    });

    const result = response.json();        
    expect(result.success).toEqual(true);
  });

  it('should Delete - not found id', async () => {
    const response = await topicServer.inject({
      method: 'DELETE',
      url: `/topics/c7db6039-d33b-4bf8-90f7-93e576197191`,
    });

    const result = response.json();        
    expect(result.success).toEqual(false);
  });

  it('should Delete - error', async () => {
    const response = await topicServer.inject({
      method: 'DELETE',
      url: '/topics/a483ab5c-04ae-4486-ac54-1118c2dcd305sfsfsdf2333',
    });

    const result = response.json();
    expect(result.success).toEqual(false);
  });
});
