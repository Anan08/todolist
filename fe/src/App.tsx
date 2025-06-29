import { BrowserRouter, Route, Routes } from "react-router"
import Todo from "./pages/todo"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/dashboard"
import ProtectedRoute from "./middleware/ProtectedRoute"
import PublicRoute from "./middleware/PublicRoute"
import DashboardLayout from "./layouts/dashboard"
import TaskPage from "./pages/dashboard/task"
import ProfilePage from "./pages/dashboard/profile"
import FinishedPage from "./pages/dashboard/finished"

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
            <DashboardLayout />
          </ProtectedRoute>
        }> 
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="finished" element={<FinishedPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Add more dashboard routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
