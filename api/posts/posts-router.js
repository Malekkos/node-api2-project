// implement your posts router here
const express = require("express")
const Post = require("./posts-model")
const router = express.Router()

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
  const {title, contents} = req.body
  if(!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    })
  } else {
  Post.insert({title, contents})
  .then(({ id }) => {
    return Post.findById(id)
  })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(() => {
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    })
  })
}
})

router.put("/:id", (req,res) => {
  const {title, contents} = req.body
  const id = req.params.id
  if(!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post"
    })  
    } else {
      Post.findById(id)
      .then(post => {
        if(!post) {
          res.status(404).json({
            message: "The post with the specified ID does not exist"
          })
        } else {
          Post.update(id, req.body)
          .then((post) => {
            Post.findById(id)
            .then((post) => {
              res.status(200).json(post)
            })
          })
          .catch(() => {
            res.status(500).json({
              message: "The post information could not be modified"
            })
          })
        }
      })
      

    }
    
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  Post.findById(id)
  .then(post => {
    if(!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      Post.remove(id)
      .then(() => {
        res.status(200).json(post)
      })
      .catch(() => {
        res.status(500).json({
          message: "The post could not be removed"
        })
      })
    }
  })
})

router.get("/:id/comments", (req, res) => {
  const id = req.params.id
  console.log("this is the id", id) //works
  Post.findById(id)
  .then(post => {
    console.log("this is the post", post) //works
    if(!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
    } else {
      Post.findPostComments(post.id)
      .then(comments => {
        console.log(`these are the comments for post number ${post.id}`, comments) //works
        res.status(200).json(comments)
      })
      .catch(() => {
        res.status(500).json({
          message: "The comments information could not be retrieved"
        })
      })
    }
  })
}) // /api/posts/:id/comments


module.exports = router