import PropTypes from "prop-types";

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

const EventCard = ({ className = "", size = "", color = "" }) => {
  return (
    <>
      <div
        className={`${color || getRandomColor()} rounded-xl p-2 ${className}`}
      >
        <div
          className={`${
            size === "large" ? "aspect-[2/1]" : "aspect-square"
          } flex flex-col items-center justify-center relative h-full w-full`}
        >
          <div className="flex-grow w-full bg-gray-300 rounded-md flex items-center justify-center"></div>
          <div className="spicy-rice w-full absolute bottom-0 text-lg md:text-2xl font-bold text-center pb-2">
            Escape Room
          </div>
        </div>
      </div>
    </>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["large", "small", ""]),
  color: PropTypes.string,
};

export default EventCard;