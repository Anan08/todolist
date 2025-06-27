import { BrowserRouter, Route, Routes } from "react-router"
import Todo from "./pages/todo"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todo" element={<Todo/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
