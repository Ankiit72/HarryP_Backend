import Post from "../models/Post.js"; 


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createPost = async (req, res) => {
  try {
    const { title, image, content, category, house } = req.body;
    const post = await Post.create({ title, image, content, category, house });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.update(req.body); 
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};