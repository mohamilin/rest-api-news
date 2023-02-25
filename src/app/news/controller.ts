import { FastifyRequest, FastifyReply } from 'fastify';
import {
  newArticleNewsInput,
  Params,
  inputUpdateNews,
  queryNews,
} from './schema';
import { create, getAll, getById, updateNews, deleteNews } from './service';

export async function createHandler(
  request: FastifyRequest<{ Body: newArticleNewsInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const news = await create(body);
    return reply
      .code(201)
      .send({ success: true, message: 'Successfuly Created', data: news });
  } catch (e) {
    return reply
      .code(500)
      .send({ success: false, message: 'Server Error', error: e });
  }
}

export async function getAllHandler(
  request: FastifyRequest<{ Querystring: queryNews }>,
  reply: FastifyReply
) {
  try {
    const payloadQuery = request.query;

    const news = await getAll(payloadQuery);
    return reply
      .code(201)
      .send({ success: true, message: 'Successfuly Get All', data: news });
  } catch (e) {
    return reply
      .code(500)
      .send({ success: false, message: 'Server Error', error: e });
  }
}

export async function getByIdHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  try {
    const { newsId } = request.params;
    const news = await getById({ newsId });
    if (!news) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }
    return reply
      .code(200)
      .send({ success: true, message: 'Successfuly get by id', data: news });
  } catch (e) {
    return reply
      .code(500)
      .send({ success: false, message: 'Server Error', error: e });
  }
}

export async function updateHandler(
  request: FastifyRequest<{ Params: Params; Body: inputUpdateNews }>,
  reply: FastifyReply
) {
  try {
    const newsId = request.params;
    const body = request.body;
    const news = await getById(newsId);

    if (!news) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }

    const updateDataNews = await updateNews(newsId, body);
    return reply.code(200).send({
      success: true,
      message: 'Successfuly updated',
      data: updateDataNews,
    });
  } catch (e) {
    return reply.code(500).send({ success: false, message: "Server Error", error: e});
  }
}

export async function deleteHandler(
  request: FastifyRequest<{ Params: Params; Body: inputUpdateNews }>,
  reply: FastifyReply
) {
  try {
    const newsId = request.params;
    const news = await getById(newsId);

    if (!news) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }

    await deleteNews(newsId);
    return reply.code(200).send({
      success: true,
      message: 'Successfuly deleted',
      data: '',
    });
  } catch (e) {
    return reply.code(500).send({ success: false, message: 'Server error', error:e});
  }
}
