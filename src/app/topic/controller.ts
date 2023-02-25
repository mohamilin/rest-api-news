import { FastifyRequest, FastifyReply } from 'fastify';
import { Params, newTopicInput, inputUpdateTopic } from './schema';
import { create, deleteTopic, getAll, getById, updateTopic } from './service';

export async function createHandler(
  request: FastifyRequest<{ Body: newTopicInput }>,
  reply: FastifyReply
) {
  const body = request.body;
  try {
    const topic = await create(body);
    return reply.code(201).send({ success: true, message: 'Successfuly created', data: topic });
  } catch (e) {
    return reply.code(500).send({ success: false, message: 'Server Error', error: e});
  }
}

export async function getAllHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const topics = await getAll();
    return reply.code(200).send({ success: true, message: 'Successfuly get all topic', data: topics });
  } catch (e) {
    return reply.code(500).send({ success: false, message: 'Server Error', error: e});
  }
}

export async function getByIdHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  try {
    const { topicId } = request.params;
    const topic = await getById({ topicId });
    if (!topic) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }
    return reply
      .code(200)
      .send({ success: true, message: 'Successfuly get by id', data: topic });
  } catch (e) {
    return reply
      .code(500)
      .send({ success: false, message: 'Server Error', error: e });
  }
}

export async function updateHandler(
  request: FastifyRequest<{ Params: Params; Body: inputUpdateTopic }>,
  reply: FastifyReply
) {
  try {
    const topicId = request.params;
    const body = request.body;
    const topic = await getById(topicId);

    if (!topic) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }

    const updateDataTopic = await updateTopic(topicId, body);
    return reply
      .code(200)
      .send({
        success: true,
        message: 'Successfuly updated',
        data: updateDataTopic,
      });
  } catch (e) {
    return reply.code(500).send({ success: false, message: 'Server Error', error: e});
  }
}

export async function deleteHandler(
  request: FastifyRequest<{ Params: Params; Body: inputUpdateTopic }>,
  reply: FastifyReply
) {
  try {
    const { topicId } = request.params;
    const topic = await getById({topicId});

    if (!topic) {
      return reply
        .code(404)
        .send({ success: false, message: 'Data not found' });
    }

    const deleteDataTopic = await deleteTopic({ topicId });
    return reply
      .code(200)
      .send({ success: true, message: 'Successfuly deleted', data: deleteDataTopic });
  } catch (e) {
    return reply.code(500).send({ success: false, message: 'Server Error', error: e});
  }
}
