export type newArticleNewsInput = {
  title: string;
  slug: string;
  content: string;
  topicIds: string[];
};

type newsId = string;

export type Params = {
  newsId: newsId;
};

enum statuss {
  draft = 'draft',
  published = 'published',
  deleted = 'deleted',
}

export type inputUpdateNews = {
  title: string;
  slug: string;
  status?: statuss;
  content: string;
  topicIds: string[];
};
