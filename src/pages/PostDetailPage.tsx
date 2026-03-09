import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPost } from "../services/postService"

function PostDetailPage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const post = getPost(Number(id))

    if (!post) return <div>post not found</div>

    const handleDelete = () => {

        deletePost(post.id)

        navigate("/")
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <button><Link to={`/edit/${post.id}`}>수정하기</Link></button>
            <button onClick={handleDelete}>삭제하기</button>
        </div>
    )
}

export default PostDetailPage