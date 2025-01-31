// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import EventPage from './pages/EventPage.jsx';
import EventList from './pages/Event_list.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
// import './index.css'; // Import the Tailwind CSS file


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/eventlist" element={<EventList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  );
};

export default App;