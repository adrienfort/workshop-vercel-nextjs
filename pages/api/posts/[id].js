import { posts } from "../resources";

export default function handler(req, res) {
  const { id } = req.query;
  const { method } = req;
  let post;
  let postIndex;

  switch (method) {
    case "GET":
      post = posts.filter((e) => e.id === Number(id));
      if (!post) {
        res.status(404).send("Post not found");
        break;
      }
      res.status(200).send({ post: post });
      break;
    case "PUT":
      postIndex = posts.map((post) => post.id).indexOf(Number(id));
      if (postIndex === -1) {
        res.status(404).send("Post not found");
        break;
      }
      const { title, content } = req.body;
      if (title) {
        posts[postIndex].title = title;
      }
      if (content) {
        posts[postIndex].content = content;
      }
      res.status(200).send(`Post ${id} updated`);
      break;
    case "DELETE":
      postIndex = posts.map((post) => post.id).indexOf(Number(id));
      if (postIndex === -1) {
        res.status(200).send("Post not found");
        break;
      }
      posts.splice(postIndex, 1);
      res.status(200).send("Post deleted");
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
