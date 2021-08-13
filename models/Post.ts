import { Schema, model } from 'mongoose'

export interface Post {
  userId: string
  desc: string
  img: string
  likes: []
}

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Post = model<Post>('Post', postSchema)

export default Post
