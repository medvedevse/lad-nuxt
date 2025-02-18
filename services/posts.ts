export interface IPost {
  id: number;
  title: string;
  body: string;
}

export const getPosts = async () =>
  await useFetch<IPost[]>(import.meta.env.VITE_BASE_API_URL + "/posts");

export const getPost = async (id: number) =>
  await useFetch<IPost>(import.meta.env.VITE_BASE_API_URL + `/posts/${id}`);
