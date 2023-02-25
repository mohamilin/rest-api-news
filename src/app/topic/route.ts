import { FastifyInstance } from 'fastify';

import {
  createHandler,
  deleteHandler,
  getAllHandler,
  getByIdHandler,
  updateHandler,
} from './controller';

async function topicRoutes(server: FastifyInstance) {
  server.post('/topics', createHandler);

  server.get('/topics', getAllHandler);
  server.get('/topics/:topicId', getByIdHandler);
  server.put('/topics/:topicId', updateHandler);
  server.delete('/topics/:topicId', deleteHandler);
}

export default topicRoutes;
