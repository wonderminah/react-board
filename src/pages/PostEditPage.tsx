import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPost, updatePost } from "../services/postService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

function PostEditPage() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(Number(id))
  })

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })

  const handleSubmit = () => {
    if (!post) return

    updateMutation.mutate({
      id: post.id,
      title,
      content
    })
    navigate(`/posts/${post.id}`)
  }

  if (!post) {
    return <div>post not found</div>

  } else {
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
}

export default PostEditPage