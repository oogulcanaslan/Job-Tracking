const router = require("express").Router();

const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {

  const post = await Post.findById(req.params.id);

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);


  } catch (err) {
    res.status(500).json(err);
  }
});



//DELETE POST
router.delete("/:id", async (req, res) => {

  const post = await Post.findById(req.params.id);

  try {
    await post.delete();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }

});



//GET ALL POSTS
router.get("/", async (req, res) => {


  const catName = req.query.cat;
  console.log(catName);

  try {
    let posts;
    if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;


