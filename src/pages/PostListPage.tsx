import { Link } from "react-router-dom"
import { getPosts } from "../services/postService"
import { useQuery } from "@tanstack/react-query"

function PostListPage() {

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  })

  if (!posts) return <div>loading...</div>

  return (
    <div>
      <h1>게시판</h1>

      <Link to="/create">글쓰기</Link>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default PostListPage