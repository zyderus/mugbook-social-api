import express from 'express'
import Post from '../models/Post'
import User from '../models/User'
const router = express.Router()

// Create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // @ts-ignore
    if (post.userId === req.body.userId) {
      await post?.updateOne({ $set: req.body })
      res.status(200).json('Post updated')
    } else {
      res.status(403).json('You can update your post only')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // @ts-ignore
    if (post.userId === req.body.userId) {
      await post?.deleteOne()
      res.status(200).json('Post deleted')
    } else {
      res.status(403).json('You can delete your post only')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// Like / dislike post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // @ts-ignore
    if (!post?.likes.includes(req.body.userId)) {
      await post?.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json('Post liked')
    } else {
      await post?.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json('Post disliked')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// get timeline posts
router.get('/timeline/show', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const userPosts = await Post.find({ userId: currentUser?._id })
    const friendPosts: any = await Promise.all(
      currentUser!.following!.map((friendId: any) => {
        return Post.find({ userId: friendId })
      })
    )
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
