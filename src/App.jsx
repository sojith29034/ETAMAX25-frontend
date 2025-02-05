import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import EventPage from "./pages/EventPage";
import EventList from "./pages/Event_list";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar is present on all pages */}
        <Navbar />

        {/* Main content area */}
        <div className="flex flex-col justify-start flex-grow bg-[#FBF5DD]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer is present on all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;