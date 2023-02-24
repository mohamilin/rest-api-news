import { FastifyInstance } from "fastify";

import {createHandler, deleteHandler, getAllHandler, getByIdHandler, updateHandler} from './controller';

async function newsRoutes(server: FastifyInstance) {
    server.post(
        "/",
        createHandler
    )

    server.get('/', getAllHandler)
    server.get('/:newsId', getByIdHandler)
    server.put('/:newsId', updateHandler);
    server.delete('/:newsId', deleteHandler)


}

export default newsRoutes;