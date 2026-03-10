import type { Post } from "../types/Post";
import { mockPosts } from "../data/mockPosts";

const STORAGE_KEY = "posts"
let posts: Post[] = loadPosts()

// json CRUD
export async function createPost(post: Post) {
    posts.push(post)
    savePosts(posts)
}

export function getPosts() {
    return posts
}

export function getPost(id: number) {
    return posts.find(p => p.id ===id)
}

export async function updatePost(updatePost: Post) {
    posts = posts.map(post =>
        post.id === updatePost.id ? updatePost : post
    )
    savePosts(posts)
}

export async function deletePost(id: number) {
    posts = posts.filter(p => p.id !== id)
    savePosts(posts)
}

// localStorage CRUD
function loadPosts(): Post[] {

  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored) {
    return JSON.parse(stored)
  }

  return mockPosts
}

function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

