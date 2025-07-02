import { Button } from "antd";
import EventCard from "./EventCard";
import { demoEvents } from "../constants/demoEvents";
import { Link } from "react-router-dom";

const DemoEventPreview = () => {
  return (
    <div className="relative my-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 blur-sm brightness-95 pointer-events-none select-none">
        {demoEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/50 backdrop-blur-sm text-center rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          🔒 Sign In to Explore These Events
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Discover workshops, meetups, and tech talks tailored just for you.
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <Button size="large" type="primary" shape="round">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button size="large" shape="round">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoEventPreview;
