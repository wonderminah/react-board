import type { Post } from "../types/Post";
import { mockPosts } from "../data/mockPosts";

let posts: Post[] = [...mockPosts]

export function createPost(post: Post) {
    posts.push(post)
}

export function getPosts() {
    return posts
}

export function getPost(id: number) {
    return posts.find(p => p.id ===id)
}

export function updatePost(updatePost: Post) {
    posts = posts.map(post =>
        post.id === updatePost.id ? updatePost : post
    )
}

export function deletePost(id: number) {
    posts = posts.filter(p => p.id !== id)
}