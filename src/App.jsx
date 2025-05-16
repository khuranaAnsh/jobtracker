import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Blurred blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10">
          {/* Navbar */}
          <nav className="bg-white/80 backdrop-blur-md shadow-md py-4 mb-8">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600">Job Tracker</h1>
              <div className="space-x-6">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition"
                      : "text-gray-700 hover:text-blue-500 font-semibold transition"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/notes"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition"
                      : "text-gray-700 hover:text-blue-500 font-semibold transition"
                  }
                >
                  Notes
                </NavLink>
              </div>
            </div>
          </nav>

          {/* Pages */}
          <div className="max-w-6xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
