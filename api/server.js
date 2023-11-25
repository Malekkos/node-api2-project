// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express()

const Post = require("./posts/posts-model")
// /api/posts will be seperated





server.get("/api/posts", (req, res) => {
  // console.log(req)
    Post.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(() => {
      res.status(500).json({
        message: "The posts information could not be retrieved"
      })
    })
}) // /api/posts

server.get // /api/posts/:id

server.post // /api/posts

server.put // /api/posts/:id

server.delete // /api/posts/:id

server.get // /api/posts/:id/comments

module.exports = server