export interface ImageData {
  id: string;
  url: string;
  urlBiggest: string;
  description: string;
  created: string;
  author: string;
  tags: string[];
}

export interface ImageFullData extends ImageData {
  alt_description: string;
  topic_submissions: object[];
  created_at: string;
  user: {
    username: string;
  };
  urls: {
    regular: string;
    full: string;
  };
}
