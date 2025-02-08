import pool from "../db.js";


export const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createPost = async (req, res) => {  
  try {
    const { title, image, content, category } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (title, image, content, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, image, content, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, content, category } = req.body;
    const result = await pool.query(
      "UPDATE posts SET title = $1, image = $2, content = $3, category = $4 WHERE id = $5 RETURNING *",
      [title, image, content, category, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};