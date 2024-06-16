import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const { session } = useSupabaseAuth();

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
