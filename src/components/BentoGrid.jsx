import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define an array of root color classes
const rootColors = [
  "bg-[#E9A107]",
  "bg-[#E9680B]",
  "bg-[#E34819]",
  "bg-[#E84945]",
  "bg-[#E1455D]",
  "bg-[#C667A3]",
  "bg-[#5384C4]",
  "bg-[#3FB5B4]",
];

// Function to pick a random color
const getRandomColor = () =>
  rootColors[Math.floor(Math.random() * rootColors.length)];

const EventCard = ({ className = "", size = "", eventName = "", eventImg = "", onClick, isFeatured = false }) => {
  const [borderColor, setBorderColor] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColor(getRandomColor());
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={`${borderColor} rounded-xl p-2 ${className}`} onClick={onClick}>
      <div
        className={`$${
          size === "large" ? "aspect-[2/1]" : "aspect-square"
        } flex flex-col items-center justify-center relative h-full w-full`}
      >
        {/* Event Image */}
        <div className="flex-grow w-full h-full rounded-md flex items-center justify-center">
          <img
            src={
              eventImg?.startsWith("data:image")
                ? eventImg
                : `${import.meta.env.VITE_BASE_URL}/${eventImg}`
            }
            alt={eventName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        
        {/* Event Name */}
        <div className="spicy-rice absolute bg-[#d2d2d2b6] rounded-b-md w-full bottom-0 text-lg md:text-2xl font-bold text-center pb-2">
          {eventName}
          {isFeatured && <span className="text-red-500 ml-2">★ Featured</span>}
        </div>
      </div>
    </div>
  );
};

const BentoGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events/featured`
        );
        console.log("API Response:", response.data);
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const featuredEvents = events;

  const handleEnroll = (event) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/event/${event._id}`, { state: { event } });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="spicy-rice text-[#2B1511] text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12">
        HIGHLIGHT EVENTS
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 auto-rows-fr">
            {events.slice(0, 8).map((event, index) => (
              <div
                key={event._id}
                className={`${index === 0 || index === 5 ? "row-span-2" : ""} 
                            ${index === 3 || index === 4 ? "col-span-2" : ""}`}
              >
                <EventCard
                  size={
                    index === 0 || index === 5 || index === 3 || index === 4
                      ? "large"
                      : ""
                  }
                  className="h-full cursor-pointer"
                  eventName={event.eventName}
                  eventImg={event.eventBanner}
                  eventId={event._id}
                  onClick={() => handleEnroll(event)}
                  isFeatured={event.isFeatured}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["large", "small", ""]),
  eventName: PropTypes.string,
  eventImg: PropTypes.string,
  eventId: PropTypes.string,
  onClick: PropTypes.func,
  isFeatured: PropTypes.bool,
};

export default BentoGrid;
