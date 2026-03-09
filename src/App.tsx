import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostListPage from "./pages/PostListPage"
import PostDetailPage from "./pages/PostDetailPage"
import PostCreatePage from "./pages/PostCreatePage"
import PostEditPage from "./pages/PostEditPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage/>} />
        <Route path="/create" element={<PostCreatePage/>} />
        <Route path="/edit/:id" element={<PostEditPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
