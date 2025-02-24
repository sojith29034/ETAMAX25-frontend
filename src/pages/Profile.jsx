import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Profile = () => {
  const [confirmedEvents, setConfirmedEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  const [rollNo, setRollNo] = useState("");
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [allTransactions, setAllTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollmentsAndUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        navigate("/login");
        return;
      }

      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/students/rollNo/${
            storedUser.rollNumber
          }`
        );
        setRollNo(storedUser.rollNumber);
        setUserName(userResponse.data.name);

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/transactions`
        );
        const allTransactions = response.data;

        // Filter transactions by checking if the current user is in the teamMembers array
        const userEvents = allTransactions.filter((event) =>
          event.teamMembers.includes(storedUser.rollNumber)
        );

        const confirmed = userEvents.filter((event) => event.payment === 1);
        const pending = userEvents.filter((event) => event.payment === 0);
        setConfirmedEvents(confirmed);
        setPendingEvents(pending);

        // Get all unique event IDs
        const eventIds = [...new Set(userEvents.map((event) => event.eventId))];

        if (eventIds.length > 0) {
          const eventResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/events/bulk`,
            { eventIds }
          );

          // Convert response array to a lookup object
          const details = eventResponse.data.reduce((acc, curr) => {
            acc[curr._id] = curr;
            return acc;
          }, {});

          setEventDetails(details);
        }

        setAllTransactions(allTransactions);

        const allDays = [1, 2, 3];
        const allCategories = ["Technical", "Cultural", "Seminar"];

        const enrolledDays = Array.from(
          new Set(
            confirmed
              .map((event) => eventDetails[event.eventId]?.eventDay)
              .filter(Boolean)
          )
        );
        const enrolledCategories = Array.from(
          new Set(
            confirmed
              .map(
                (event) =>
                  eventDetails[event.eventId]?.eventCategory
                    .charAt(0)
                    .toUpperCase() +
                  eventDetails[event.eventId]?.eventCategory.slice(1).toLowerCase()
              )
              .filter(Boolean)
          )
        );

        const missingDays = allDays.filter(
          (day) => !enrolledDays.includes(day)
        );
        const missingCategories = allCategories.filter(
          (cat) => !enrolledCategories.includes(cat)
        );

        if (missingDays.length || missingCategories.length) {
          const missingDaysText =
            missingDays.length > 0
              ? "Day " + missingDays.join(", Day ")
              : "None";
          const missingCategoriesText =
            missingCategories.length > 0
              ? missingCategories.join(", ")
              : "None";
          setError(
            `Missing events on: ${missingDaysText}. <br> Missing categories: ${missingCategoriesText}.`
          );
        } else {
          setError("");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentsAndUser();
  }, [navigate, eventDetails]);

  // Calculate totals
  const totalConfirmedFees = confirmedEvents.reduce((sum, event) => {
    const eventDetail = eventDetails[event.eventId];
    return sum + (eventDetail ? event.amount : 0);
  }, 0);

  const totalPendingFees = pendingEvents.reduce((sum, event) => {
    const eventDetail = eventDetails[event.eventId];
    return sum + (eventDetail ? event.amount : 0);
  }, 0);

  // Function to calculate filled seats for a particular eventId across all transactions
  const calculateFilledSeats = (eventId) => {
    const filledSeats = allTransactions.filter(
      (transaction) =>
        transaction.eventId === eventId && transaction.payment === 1
    );
    return filledSeats.length;
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/transactions/${eventToDelete._id}`
      );
      setConfirmedEvents(
        confirmedEvents.filter(
          (userEvents) => userEvents._id !== eventToDelete._id
        )
      );
      setPendingEvents(
        pendingEvents.filter(
          (userEvents) => userEvents._id !== eventToDelete._id
        )
      );

      // Remove the eventId from local storage
      const enrolledEvents =
        JSON.parse(localStorage.getItem("enrolledEvents")) || [];
      const updatedEnrolledEvents = enrolledEvents.filter(
        (eventId) => eventId !== eventToDelete.eventId
      );
      localStorage.setItem(
        "enrolledEvents",
        JSON.stringify(updatedEnrolledEvents)
      );

      setShowModal(false);
      setEventToDelete(null);
    } catch (err) {
      console.error("Error deleting enrollment:", err);
      setError("Failed to delete enrollment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      {userName && (
        <h4 className="spicy-rice text-[#2B1511] text-xl text-center font-bold">
          Welcome, {userName}
          <br />
          <p>{rollNo}</p>
        </h4>
      )}
      <hr className="my-4 border-[#2B1511]" />
      {error && (
        <div
          className="bg-red-300 p-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}

      <div className="border-2 border-[#2B1511] shadow-md p-6 rounded-lg my-4 w-full max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-4 text-center font-semibold">
          <div>Confirmed</div>
          <div>{confirmedEvents.length}</div>
          <div>₹{totalConfirmedFees}</div>
          <div>Pending</div>
          <div>{pendingEvents.length}</div>
          <div>₹{totalPendingFees}</div>
          <div>Total</div>
          <div>{confirmedEvents.length + pendingEvents.length}</div>
          <div>₹{totalConfirmedFees + totalPendingFees}</div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-center">Confirmed Enrollments</h3>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {confirmedEvents.length > 0 ? (
            confirmedEvents.map((event) => {
              const eventDetail = eventDetails[event.eventId];
              return (
                <div className="w-[300px] m-2" key={event._id}>
                  <div
                    className={`${getRandomColor()} border-4 rounded-xl p-3`}
                  >
                    <h2 className="playfair-display font-bold text-center">
                      {eventDetail?.eventName || "Loading..."}
                    </h2>
                    <hr className="m-3" />
                    <p className="capitalize">
                      <span className="font-semibold">Category:</span>{" "}
                      {eventDetail?.eventCategory || "Loading..."} <br />
                      <span className="font-semibold">Day:</span>{" "}
                      {eventDetail?.eventDay || "Loading..."} <br />
                      <span className="font-semibold">Entry Fees:</span> ₹
                      {event.amount} <br />
                      <span className="font-semibold">Time:</span>{" "}
                      {eventDetail
                        ? `${eventDetail.startTime} - ${eventDetail.endTime}`
                        : "Loading..."}{" "}
                      <br />
                      {eventDetail?.teamSize > 1
                        ? event.teamMembers?.join(", ") || "Loading..."
                        : "Individual Event"}
                    </p>
                    <a
                      href={eventDetail?.whatsapp}
                      target="_blank"
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 block text-center"
                    >
                      Join WhatsApp Group
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No confirmed enrollments available.</p>
          )}
        </div>
      )}

      <h3 className="text-lg font-bold text-center mt-6">
        Pending Enrollments
      </h3>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event) => {
              const eventDetail = eventDetails[event.eventId];
              return (
                <div className="w-[300px] m-2" key={event._id}>
                  <div
                    className={`${getRandomColor()} border-4 rounded-xl p-3`}
                  >
                    <h2 className="playfair-display font-bold text-center">
                      {eventDetail?.eventName || "Loading..."}
                    </h2>
                    <hr className="m-3" />
                    <p className="capitalize">
                      <span className="font-semibold">Category:</span>{" "}
                      {eventDetail?.eventCategory || "Loading..."} <br />
                      <span className="font-semibold">Day:</span>{" "}
                      {eventDetail?.eventDay || "Loading..."} <br />
                      <span className="font-semibold">Entry Fees:</span> ₹
                      {event.amount} <br />
                      <span className="font-semibold">Time:</span>{" "}
                      {eventDetail
                        ? `${eventDetail.startTime} - ${eventDetail.endTime}`
                        : "Loading..."}{" "}
                      <br />
                      <span className="font-semibold">Seats:</span>{" "}
                      {calculateFilledSeats(event.eventId)} /{" "}
                      {eventDetail?.maxSeats || "Free for all"} <br />
                      {eventDetail?.teamSize > 1
                        ? `${event.teamName}: ${
                            event.teamMembers?.join(", ") || "Loading..."
                          }`
                        : "Individual Event"}
                    </p>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2 mx-auto w-fit"
                      onClick={() => {
                        setEventToDelete(event);
                        setShowModal(true);
                      }}
                    >
                      Delete Enrollment
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No pending enrollments available.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg">
            <h4 className="text-lg font-bold">Confirm Deletion</h4>
            <p>
              Are you sure you want to delete your enrollment for{" "}
              {eventToDelete
                ? eventDetails[eventToDelete.eventId]?.eventName
                : ""}
              ?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
