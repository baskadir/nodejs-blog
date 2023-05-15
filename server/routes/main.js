const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Routes

// GET- Home
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express & MongoDb",
    };

    let perPage = 6;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// GET- Post by id
router.get("/post/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Post.findById({ _id: id });

    const locals = {
      title: data.title,
      description: "Simple blog created with NodeJs, Express & MongoDb",
    };

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// POST- Post search term
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple blog created with NodeJs, Express & MongoDb",
    };

    let searchTerm = req.body.searchTerm;
    const searchWithoutSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchWithoutSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchWithoutSpecialChar, "i") } },
      ],
    });

    res.render("search", { data, locals });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
