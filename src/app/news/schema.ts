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

enum status {
  draft = 'draft',
  published = 'published',
  deleted = 'deleted',
}

export type inputUpdateNews = {
  title: string;
  slug: string;
  status?: status;
  content: string;
  topicIds: string[];
};

export type queryNews = {
  status?: status;
  topic?: string;
}
