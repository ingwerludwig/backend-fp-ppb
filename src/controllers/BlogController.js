const BlogService = require("../services/BlogService");
const ImageService = require("../services/ImageService");
const RequestValidator = require("../utils/request");
const ResponseClass = require("../utils/response");

const getAllBlogs = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const order = req.query.order ? req.query.order : "DESC";
    const sort = req.query.sort ? req.query.sort : "createdAt";
    const options = {
      limit: limit,
      order: [[sort, order]],
    };
    const blogs = await BlogService.getAllBlogs(options);
    res.status(blogs.code).json(blogs);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ResponseClass.ErrorResponse(500, "Internal Server Error"));
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    res.status(blog.code).json(blog);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ResponseClass.ErrorResponse(500, "Internal Server Error"));
  }
};

const deleteBlog = async (req, res) => {
  try {
    const permanent = req.query.permanent ? req.query.permanent : false;
    if (permanent) {
      const blog = await BlogService.getBlogById(req.params.id);
      if (blog.data === null) {
        return res
          .status(404)
          .json(
            new ResponseClass.ErrorResponse(
              (code = 404),
              (message = "Blog not found")
            )
          );
      }
      if (blog.data.image) {
        const filename = ImageService.getFilename(blog.data.image);
        const deleteImage = await ImageService.deleteFromGcs(filename);
        if (deleteImage.code !== 200 && deleteImage.code !== 404) {
          return res.status(deleteImage.code).json(deleteImage);
        }
      }
    }
    const deleteBlog = await BlogService.deleteBlog(req.params.id, permanent);
    res.status(deleteBlog.code).json(deleteBlog);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ResponseClass.ErrorResponse(500, "Internal Server Error"));
  }
};

const updateBlog = async (req, res) => {
  try {
    if (req.files) {
      const blog = await BlogService.getBlogById(req.params.id);
      if (blog.data === null) {
        return res
          .status(404)
          .json(
            new ResponseClass.ErrorResponse(
              (code = 404),
              (message = "Blog not found")
            )
          );
      }
      if (blog.data.image) {
        const filename = ImageService.getFilename(blog.data.image);
        const deleteImage = await ImageService.deleteFromGcs(filename);
        if (deleteImage.code !== 200 && deleteImage.code !== 404) {
          return res.status(deleteImage.code).json(deleteImage);
        }
        const uploadImage = await ImageService.uploadToGcs(req.files[0], "Blog");

        if (uploadImage.code !== 200) {
          return res.status(uploadImage.code).json(uploadImage);
        }
        req.body.image = uploadImage.data;
      }
      
      
    }
    const updateBlog = await BlogService.updateBlog(req.params.id, req.body);
    res.status(updateBlog.code).json(updateBlog);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ResponseClass.ErrorResponse(500, "Internal Server Error"));
  }
};

const createBlog = async (req, res) => {
  try {
    const validate = RequestValidator.verifyRequest(req.body, [
      "title",
      "content",
    ]);
    if (validate !== true) {
      return res.status(400).json(validate);
    }
    // if (!req.files) {
    //   return res.status(400).json(new ResponseClass(400, "Image is required"));
    // }

    const requestBody = req.body;
    if(req.body.files){
      const uploadImage = await ImageService.uploadToGcs(req.files[0], "Blog");
      if (uploadImage.code !== 200) {
        return res.status(uploadImage.code).json(uploadImage);
      }
      requestBody.image = uploadImage.data;
    }
  
    const createBlog = await BlogService.createBlog(requestBody);
    res.status(createBlog.code).json(createBlog);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ResponseClass.ErrorResponse(500, "Internal Server Error"));
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
  createBlog,
};
