import { useState } from "react"
import { createPost } from "../services/postService"
import { useNavigate } from "react-router-dom"
import { QueryClient, useMutation } from "@tanstack/react-query"

function PostCreatePage() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const createMutation = useMutation({
      mutationFn: createPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"]} )
      }
    })

  const handleSubmit = () => {
    createMutation.mutate({
      id: Date.now(),
      title,
      content
    })
    navigate("/")
  }

  return (
    <div>

      <h1>글 작성</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="title"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="content"
      />

      <button onClick={handleSubmit}>
        저장
      </button>

    </div>
  )
}

export default PostCreatePage