import PropTypes from "prop-types";

// Define an array of root color classes
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

const EventCard = ({ className = "", size = "", color = "" }) => {
  return (
    <>
      <div
        className={`${
          color || getRandomColor()
        } rounded-xl border-8 p-2 ${className}`}
      >
        <div
          className={`${
            size === "large" ? "aspect-[2/1]" : "aspect-square"
          } flex flex-col items-center justify-center relative h-full w-full`}
        >
          <div className="flex-grow w-full bg-gray-300 rounded-md flex items-center justify-center">
          </div>
          <div className="w-full absolute bottom-0 text-sm md:text-2xl font-bold text-center pb-2">
            Escape Room
          </div>
        </div>
      </div>
    </>
  );
};

const BentoGrid = () => {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">
        HIGHLIGHT EVENTS
      </h1>

      <div className="grid grid-cols-3 gap-4 auto-rows-fr">
        <div className="row-span-2">
          <EventCard size="large" className="h-full" />
        </div>
        
        <EventCard />
        <EventCard />
        
        <div className="col-span-2">
          <EventCard size="large" className="h-full" />
        </div>

        <div className="col-span-2">
          <EventCard size="large" className="h-full" />
        </div>

        <EventCard />
      </div>
    </div>
  );
};

EventCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["large", "small", ""]),
  color: PropTypes.string,
};

export default BentoGrid;