const blogsRoute = require('express').Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  findBlogById,
  removeBlog,
  updateBlog 
} = require('../controllers/blogs.controller');

/**
 * @swagger
 * /blogs:
 *  get:
 *    tags:
 *      - blogs
 *    responses:
 *      '200':
 *        description: A list of blogs
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Blog'
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - blogs
 *    description: Create new blog
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Blog'
 *    responses:
 *      '201':
 *        description: Created blog
 *        schema:
 *          $ref: '#/definitions/Blog'
 *      '400':
 *        description: Bad request error
 */  

blogsRoute.route('/blogs')
.get(getBlogs)
.post(createBlog)

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *    tags:
 *      - blogs
 *    description: Get blog by Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A single blog
 *        schema:
 *          $ref: '#/definitions/Blog'
 *      '400':
 *        description: Blog not found
 *      '500':
 *        description: Error message
 *  put:
 *    tags:
 *      - blogs
 *    description: Update selected blog 
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        required: true
 *        description: Update product fields
 *        schema:
 *          $ref: '#/definitions/Blog'
 *    responses:
 *      '200':
 *        description: Updated blog
 *        schema:
 *          $ref: '#/definitions/Blog'
 *      '400':
 *        description: Blog not found
 *      '500':
 *        description: Error message
 *      '503':
 *        description: Service unavailable
 *  delete:
 *    tags:
 *      - products
 *    description: Removes single blog
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Removed blog
 *        schema:
 *          $ref: '#/definitions/Blog'
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 */

blogsRoute.route('/blogs/:id')
  .get(findBlogById, getBlog)
  .put(findBlogById, updateBlog)
  .delete(findBlogById, removeBlog)

module.exports = blogsRoute;