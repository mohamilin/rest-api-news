import { FastifyInstance } from "fastify";

import {createHandler, deleteHandler, getAllHandler, getByIdHandler, updateHandler} from './controller';

async function newsRoutes(server: FastifyInstance) {
    server.post(
        "/news",
        createHandler
    )

    server.get('/news', getAllHandler)
    server.get('/news/:newsId', getByIdHandler)
    server.put('/news/:newsId', updateHandler);
    server.delete('/news/:newsId', deleteHandler)


}

export default newsRoutes;