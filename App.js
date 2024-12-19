import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import ExamQuestions from "./components/Exam/ExamQuestions";
import Result from "./components/Exam/Result";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import StartPoint from "./pages/StartPoint";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      {/* Common NavBar, placed outside of Routes */}
      <NavBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartPoint />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/examquestions"
          element={
            <PrivateRoute>
              <ExamQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
