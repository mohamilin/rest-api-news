import _ from 'lodash';
import prisma from 'src/utilities/prisma';
import {
  newArticleNewsInput,
  Params,
  inputUpdateNews,
  queryNews,
} from './schema';

export async function create(input: newArticleNewsInput) {
  const { title, slug, content, topicIds } = input;
  const inputTopicIdOnNews = topicIds.map((i) => ({
    assignedAt: new Date(),
    topics: {
      connect: {
        id: i,
      },
    },
  }));

  const articleNew = await prisma.news.create({
    data: {
      title: title,
      slug: slug,
      content: content,
      topics: {
        create: inputTopicIdOnNews,
      },
    },
  });

  return articleNew;
}

export async function getAll(query: queryNews) {
  const { status, topic } = query;

  const articleNews = await prisma.news.findMany({
    where: {
      AND: [
        {
          AND: [
            {
              status: {
                equals: status ? status : undefined,
              },
            },
            {
              topics: {
                some: {
                  topics : {
                    title: {
                      equals : topic? topic : undefined
                    }
                  }
                }
              }
            }
          ]
        },
        {
          status: { in: ['draft', 'published'] },
        },
      ],
      
    },
    include: {
      topics: {include: {topics: true}}
    },
  });

  return articleNews;
}

export async function getById(id: Params) {
  const topic = await prisma.news.findFirst({
    where: { id: id.newsId, status: { in: ['draft', 'published'] } },
    include: {
      topics: { include: { topics: true } },
    },
  });

  return topic;
}

export async function updateNews(id: Params, input: inputUpdateNews) {
  input.slug = _.kebabCase(input.title);
  const { title, slug, content, status, topicIds } = input;
  const inputTopicIdOnNews: any[] = topicIds.map((i) => ({
    topicId_newsId: {
      topicId: i,
      newsId: id.newsId,
    },
  }));

  const updatTopic = await prisma.news.update({
    where: { id: id.newsId },
    data: {
      title,
      slug,
      content,
      status,
      topics: {
        connect: inputTopicIdOnNews,
      },
    },
  });

  return updatTopic;
}

export async function deleteNews(id: Params) {
  const updatTopic = await prisma.news.update({
    where: { id: id.newsId },
    data: {
      status: 'deleted',
    },
  });

  return updatTopic;
}
