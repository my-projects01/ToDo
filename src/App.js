import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import TodoList from "./pages/TodoList";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todoList" element={<TodoList />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
