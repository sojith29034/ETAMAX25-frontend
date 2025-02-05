import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChair, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const rootColors = [
  "border-[#E9A107]",
  "border-[#E34819]",
  "border-[#E84945]",
  "border-[#C667A3]",
  "border-[#5384C4]",
  "border-[#3FB5B4]",
];

// Function to pick a random color
const getRandomColor = () =>
  rootColors[Math.floor(Math.random() * rootColors.length)];

const EventList = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("technical");
  const [cardColors, setCardColors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events`
        );
        // Ensure response data is an array
        const data = Array.isArray(response.data) ? response.data : [];
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventsData([]); // Ensure eventsData is an array even on error
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  useEffect(() => {
    // Change colors every 3 seconds
    const interval = setInterval(() => {
      setCardColors(() => {
        const newColors = {};
        eventsData.forEach((event) => {
          newColors[event._id] = getRandomColor();
        });
        return newColors;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [eventsData]);

  const handleEnroll = useCallback(
    (event) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
      } else {
        navigate(`/event/${event._id}`, { state: { event } });
      }
    },
    [navigate]
  );

  if (loading) return <p>Loading events...</p>;

  const filteredEvents = eventsData.filter(
    (event) =>
      event.eventDay === currentDay && event.eventCategory === currentCategory
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 playfair-display">
      {/* Day Tabs */}
      <div className="flex justify-evenly mb-4 border-b border-gray-500">
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            onClick={() => setCurrentDay(day)}
            className={`px-4 py-2 ${
              currentDay === day
                ? "border-b-2 border-[#2B1511] font-semibold cursor-pointer"
                : "opacity-50 hover:opacity-100 cursor-pointer"
            }`}
          >
            {`Day ${day}`}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex justify-evenly mb-4 border-b border-gray-500">
        {["technical", "cultural", "seminar"].map((category) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`px-4 py-2 ${
              currentCategory === category
                ? "border-b-2 border-[#2B1511] font-semibold cursor-pointer"
                : "opacity-50 hover:opacity-100 cursor-pointer"
            }`}
          >
            <span style={{ textTransform: "capitalize" }}>{category}</span>
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-9">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className={`${
                cardColors[event._id] || getRandomColor()
              } border-9 rounded-lg shadow-lg p-4 w-72 flex flex-col transition-transform hover:scale-105`}
            >
              <h3 className="text-lg font-bold text-center text-[#2B1511]">
                {event.eventName}
              </h3>
              <div className="mt-2 w-full">
                <p className="text-sm text-gray-700">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />{" "}
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm text-gray-700">
                  <FontAwesomeIcon icon={faChair} className="mr-2" />{" "}
                  {event.maxSeats ? `${event.maxSeats} seats` : "Unlimited"}
                </p>
                <p className="text-sm text-gray-700">
                  <FontAwesomeIcon icon={faTag} className="mr-2" />
                  {event.entryFees ? `₹${event.entryFees}` : "Free"}
                </p>
                <button
                  className="text-center cursor-pointer bg-green-700 text-white my-2 px-6 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                  onClick={() => handleEnroll(event)}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            No events available for this day and category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;