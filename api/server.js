// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express()

const Post = require("./posts/posts-model")
// /api/posts will be seperated

server.get("/api/posts", (req, res) => {
    Post.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({
        message: "The posts information could not be retrieved"
      })
    })
})

server.get("/api/posts/:id", (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if(!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      res.status(200).json(post)
    }
  })
  .catch(() => {
    res.status(500).json({
      message: "The post information could not be retrieved"
    })
  })
})

server.post("/api/posts", (req, res) => {
  console.log(req.body)
    Post.insert(req.body)
}) // /api/posts

server.put // /api/posts/:id

server.delete // /api/posts/:id

server.get // /api/posts/:id/comments

module.exports = server