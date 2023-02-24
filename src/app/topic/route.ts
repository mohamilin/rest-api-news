import { FastifyInstance } from 'fastify';

import {
  createHandler,
  deleteHandler,
  getAllHandler,
  getByIdHandler,
  updateHandler,
} from './controller';

async function topicRoutes(server: FastifyInstance) {
  server.post('/', createHandler);

  server.get('/', getAllHandler);
  server.get('/:topicId', getByIdHandler);
  server.put('/:topicId', updateHandler);
  server.delete('/:topicId', deleteHandler);
}

export default topicRoutes;
