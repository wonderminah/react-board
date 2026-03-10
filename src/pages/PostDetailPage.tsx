import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPost, getPosts } from "../services/postService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

function PostDetailPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: post } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPost(Number(id))
    })

    const handleDelete = () => {
        if (!post) return
        deleteMutation.mutate(post.id)
    }

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            navigate("/")
        }
    })

    if (!post) {
        return <div>post not found</div>

    } else {
        return (
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>

                <button><Link to={`/edit/${post.id}`}>수정하기</Link></button>
                <button onClick={handleDelete}>삭제하기</button>
            </div>
        )
    }
}

export default PostDetailPage