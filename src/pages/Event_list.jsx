import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChair, faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const rootColors = [
  "border-[#E9A107]",
  "border-[#E9680B]",
  "border-[#E34819]",
  "border-[#E84945]",
  "border-[#E1455D]",
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events`
        );
        setEventsData(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
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
        return newColors; // Updated logic to directly return newColors
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [eventsData]);

  if (loading) return <p>Loading events...</p>;

  const filteredEvents = eventsData.filter(
    (event) =>
      event.eventDay === currentDay && event.eventCategory === currentCategory
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Day Tabs */}
      <div className="flex justify-evenly mb-4 border-b border-gray-500">
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            onClick={() => setCurrentDay(day)}
            className={`px-4 py-2 ${
              currentDay === day
                ? "border-b-2 border-blue-500"
                : "opacity-50 hover:opacity-100"
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
                ? "border-b-2 border-blue-500"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <span style={{ textTransform: "capitalize" }}>{category}</span>
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className={`${
                cardColors[event._id] || getRandomColor()
              } border-9 rounded-lg shadow-lg p-4 w-72 flex flex-col transition-transform hover:scale-105`}
            >
              <h3 className="text-lg font-bold text-center">
                {event.eventName}
              </h3>
              <div className="mt-2">
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
                <span className="text-center" to={`/event/${event._id}`}>Enroll</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center">
            No events available for this day and category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;