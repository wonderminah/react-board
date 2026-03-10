import type { Post } from "../types/Post";
import { mockPosts } from "../data/mockPosts";

const API_URL = "http://localhost:3001/posts"

// json CRUD
export async function createPost(post: Post): Promise<Post> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })

  return res.json()
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_URL)
  return res.json()
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${API_URL}/${id}`)
  return res.json()
}

export async function updatePost(post: Post): Promise<Post> {
  const res = await fetch(`${API_URL}/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })

  return res.json()
}

export async function deletePost(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
}