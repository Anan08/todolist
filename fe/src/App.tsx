import { BrowserRouter, Route, Routes } from "react-router"
import Todo from "./pages/todo"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import ProtectedRoute from "./middleware/ProtectedRoute"
import PublicRoute from "./middleware/PublicRoute"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todo" element={<Todo/>} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="*" element={<Home/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
