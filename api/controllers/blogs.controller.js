const { Blogs } = require('../models/blogs.model');

// GET method
const getBlog = (req, res) => {
  res.json(req.blog);
};

// GET method
const getBlogs = async (req, res) => {
  const { category } = req.query;

  try {
    const blogs = !category
      ? await Blogs.find().exec()
      : await Blogs.find({ category }).exec();

    if (!blogs) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST method
const createBlog = async (req, res) => {
  const { title, intro, photo, labels, description, category } = req.body;
  const blog = new Blogs({
    title,
    intro,
    photo,
    labels,
    description,
    category
  });

  try {
    const response = await blog.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE method
const removeBlog = async (req, res) => {
  const { blog } = req;

  try {
    await blog.remove();
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT method
const updateBlog = async (req, res) => {
  const { blog, body } = req;

  try {
    blog.date = Date.now();

    Object.keys(body).forEach(key => {
      blog[key] = body[key];
    });

    await blog.save(err => {
      if (err) {
        throw new Error(err.message);
      }
      res.status(200).json(blog);
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
};

// middleware
async function findBlogById(req, res, next) {
  let blog;
  const { id } = req.params;

  try {
    blog = await Blogs.findById(id).exec();

    if (!blog) {
      return res.status(400).json({ message: 'Blog not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.blog = blog;
  next();
}

module.exports = {
  getBlog,
  getBlogs,
  createBlog,
  removeBlog,
  findBlogById,
  updateBlog
};
