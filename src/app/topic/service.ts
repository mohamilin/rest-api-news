import _ from 'lodash';
import prisma from 'src/utilities/prisma';
import { newTopicInput, Params, inputUpdateTopic } from './schema';

export async function create(input: newTopicInput) {
  input.slug = _.kebabCase(input.title);
  const topic = await prisma.topic.create({
    data: input,
  });

  return topic;
}

export async function getAll() {
  const topics = await prisma.topic.findMany();

  return topics;
}

export async function getById(id: Params) {    
  const topic = await prisma.topic.findFirst({
    where: { id: id.topicId },
    include: {
      articles: {include: {article:true}},
    },
  });

  return topic;
}

export async function updateTopic(id: Params, input: inputUpdateTopic) {
  input.slug = _.kebabCase(input.title);
  const updatTopic = await prisma.topic.update({
    where: { id: id.topicId },
    data: input,
  });

  return updatTopic;
}

export async function deleteTopic(id: Params) {
  const topic = await prisma.topic.delete({
    where: { id: id.topicId },
  });

  return topic;
}
