const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

const adminLayout = "../views/layouts/admin";

// GET - Admin login page
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple blog created with NodeJs, Express & MongoDb",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// POST - Admin Check login
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      res.send("You are logged in");
    } else {
      res.send("Wrong username or password");
    }

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
