import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { getPost, updatePost } from "../services/postService"
import { QueryClient, useMutation } from "@tanstack/react-query"

function PostEditPage() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const post = getPost(Number(id))

  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")

  if (!post) return <div>post not found</div>

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })

  const handleSubmit = () => {
    updateMutation.mutate({
      id: post.id,
      title,
      content
    })
    navigate(`/posts/${post.id}`)
  }

  return (
    <div>

      <h1>글 수정</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>
        수정 완료
      </button>

    </div>
  )
}

export default PostEditPage