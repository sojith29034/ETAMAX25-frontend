import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [newMember, setNewMember] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [seatsFilled, setSeatsFilled] = useState(0);

  useEffect(() => {
    const fetchEventAndSeats = async () => {
      try {
        // Fetch event details
        const eventResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events/${id}`
        );
        setEvent(eventResponse.data);

        // Set logged-in user as first team member
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.rollNumber) {
          setTeamMembers([user.rollNumber]);
        }

        // Fetch seats filled
        const seatsResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/transactions`);
        const filledSeats = seatsResponse.data.filter(
          (transaction) => transaction.eventId === id && transaction.payment === 1
        ).length;
        setSeatsFilled(filledSeats);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndSeats();
  }, [id]);

  const handleAddMember = async () => {
    if (teamMembers.includes(newMember)) {
      setError('This student is already added to the team.');
      return;
    }

    if (teamMembers.length >= event?.teamSize) {
      setError(`Team size cannot exceed ${event?.teamSize} members.`);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/students/rollNo/${newMember}`);
      if (response.data) {
        setTeamMembers([...teamMembers, newMember]);
        setNewMember('');
        setError('');
      } else {
        setError('Student not registered yet');
      }
    } catch (error) {
      setError('Error verifying student registration');
    }
  };

  const handleEnroll = async () => {
    if (event?.teamSize > 1 && !teamName) {
      setError('Please enter a team name.');
      return;
    }

    try {
      const transactionData = {
        eventId: event._id,
        enrolledId: teamMembers[0],
        teamMembers: teamMembers,
        teamName: teamName || null,
        amount: event.entryFees,
        payment: 0,
      };

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/transactions`, transactionData);
      setMessage('Enrollment successful!');
      setError('');
    } catch (error) {
      setError('Failed to enroll in the event. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  const isSeatsFull = seatsFilled >= event?.maxSeats;

  return (
    <div className="min-h-screen bg-[#fff5eb] flex flex-col">
      {message && (
        <div className="w-full max-w-7xl mx-auto px-6 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-7xl mx-auto px-6 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <button 
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-full bg-[#2A9D8F] text-white"
        >
          Home
        </button>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 rounded-full bg-[#E76F51] text-white"
        >
          Logout
        </button>
      </div>

      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1 md:flex-none md:w-1/2 bg-gray-300 h-64 md:h-auto rounded-lg">
          <img
            src={
              event.eventBanner?.startsWith("data:image")
                ? event.eventBanner
                : `${import.meta.env.VITE_BASE_URL}/${event.eventBanner}`
            }
            className="w-full h-full object-cover rounded-lg"
            alt="Event Banner"
          />
        </div>

        <div className="flex-1 md:flex md:flex-col gap-4 md:w-1/2">
          <div>
            <h2 className="text-4xl font-bold text-left" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              {event.eventName}
            </h2>
            <div className="flex justify-start gap-8 mt-2">
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> {event.startTime}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> Day {event.eventDay}
              </span>
            </div>
            <div className="flex justify-start gap-8 mt-2">
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> {event.entryFees ? `₹${event.entryFees}` : "Free"}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> 
                {event.maxSeats === 0 ? "Unlimited" : `${seatsFilled} / ${event.maxSeats} Seats`}
              </span>
            </div>
            {event.teamSize > 1 && (
              <div className="flex justify-start mt-2">
                <div className="w-4 h-4 rounded-full bg-black"></div>
                <span className="ml-2">Team Size: {event.teamSize}</span>
              </div>
            )}
          </div>

          <div>
            <p className="text-lg leading-relaxed text-justify">
              {event.eventDetails}
            </p>
          </div>

          {event.maxSeats !== 0 && !isSeatsFull && (
            <div className="flex flex-col gap-4 items-start mt-4">
              {event.teamSize > 1 && (
                <input
                  type="text"
                  placeholder="TEAM NAME"
                  className="w-full md:w-64 px-6 py-2 rounded-full bg-[#F4A261] text-white placeholder-white text-center"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              )}
              
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="ROLL NO"
                  className="flex-grow px-6 py-2 rounded-full bg-[#F4A261] text-white placeholder-white text-center"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <button 
                  className="px-6 py-2 rounded-full bg-[#E76F51] text-white"
                  onClick={handleAddMember}
                >
                  ADD
                </button>
              </div>

              <div className="flex flex-wrap gap-2 justify-start">
                {teamMembers.map((member, index) => (
                  member && (
                    <div 
                      key={index} 
                      className="px-6 py-2 rounded-full bg-[#2A9D8F] text-white border-2 border-[#264653]"
                    >
                      {member}
                    </div>
                  )
                ))}
              </div>

              <button 
                className="w-24 px-6 py-2 rounded-full bg-[#E76F51] text-white"
                onClick={handleEnroll}
              >
                Join
              </button>
            </div>
          )}

          {isSeatsFull && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Seats Full
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EventPage