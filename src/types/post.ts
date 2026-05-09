export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostInput = {
  title: string;
  body: string;
};
