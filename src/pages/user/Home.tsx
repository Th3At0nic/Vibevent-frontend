import { Link } from "react-router-dom";
import { Button, Card, Col, Input, Row, Spin, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useGetAllEventsQuery } from "../../redux/features/event/eventManagement.api";
import EventCard from "../../components/EventCard";
import { TEvent } from "../../types/event.type";
import dayjs from "dayjs";
import { toast } from "sonner";

const Home = () => {
  const today = dayjs().format("YYYY-MM-DD");

  const { data: eventsData, isLoading } = useGetAllEventsQuery({ date: today });
  const { data: recentEventsData } = useGetAllEventsQuery({});

  const todaysEvents = eventsData?.data as TEvent[];
  const recentEvents = (recentEventsData?.data as TEvent[])?.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 p-4 md:p-10">
      {/* Hero Section */}
      <section className="text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-transparent bg-clip-text"
        >
          Explore, Join, and Host Amazing Events
        </motion.h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Stay engaged with top tech events, workshops, and meetups happening
          around you. Add your event and grow the community.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/events">
            <Button type="primary" size="large" shape="round">
              Browse Events
            </Button>
          </Link>
          <Link to="/add-event">
            <Button size="large" shape="round">
              Add Your Event
            </Button>
          </Link>
        </div>
      </section>

      {/* Today’s Events */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : todaysEvents?.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Today’s Events ({today})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Recent Events */}
      {recentEvents?.length ? (
        <motion.div className="my-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Recent Events
            </h2>
            <div className="flex justify-end mb-2">
              <Link to="/events">
                <Button size="large" type="dashed" shape="round">
                  See All Events
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Call to Action */}
      <motion.div
        className="my-30 py-10 rounded-xl shadow-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold">
          Have Something to Share with the World?
        </h3>
        <p className="text-lg mt-2">
          Post your own event and let others discover it easily.
        </p>
        <div className="mt-5">
          <Link to="/add-event">
            <Button type="default" size="large" shape="round">
              Create an Event
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Featured Categories */}
      <motion.div
        className="my-30 rounded-xl bg-gray-100 py-12 px-4 md:px-16  text-white text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
          Featured Categories
        </h2>
        <Row gutter={[16, 16]} justify="center">
          {[
            { name: "Technology", color: "bg-red-200" },
            { name: "Career", color: "bg-green-200" },
            { name: "Community", color: "bg-yellow-200" },
          ].map((cat) => (
            <Col xs={24} sm={12} md={8} key={cat.name}>
              <Tooltip title="Coming Soon..." placement="topRight">
                <Card
                  className={`text-center font-bold text-lg p-6 rounded-xl shadow-md hover:cursor-progress ${cat.color}`}
                >
                  {cat.name}
                </Card>
              </Tooltip>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        className="my-30 rounded-xl bg-gray-100 py-12 px-4 md:px-16  text-white text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
          What Our Users Say
        </h2>
        <Row gutter={[16, 16]} justify="center">
          {[
            {
              name: "Sarah",
              quote:
                "This platform helped me meet like-minded people and grow my skills!",
            },
            {
              name: "Omar",
              quote:
                "Hosting an event was never this easy! I loved the experience.",
            },
            {
              name: "Ayesha",
              quote:
                "Joined 3 tech events in a week! It's a great place to explore opportunities.",
            },
          ].map((item, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card className="shadow-md p-6 hover:cursor-grabbing">
                <p className="italic">“{item.quote}”</p>
                <p className="font-semibold mt-4">– {item.name}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div className="mt-40 mb-10 rounded-xl shadow-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] py-10 px-4 md:px-16 text-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Stay in the loop</h2>
        <p className="mb-6">
          Subscribe to our newsletter to never miss an event!
        </p>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={16} md={10}>
            <Input.Search
              placeholder="Enter your email"
              enterButton="Subscribe"
              size="large"
              onSearch={(value) =>
                toast.success(
                  `${value} Successfully subscribed to the newsletter!`,
                  {
                    position: "top-center",
                    duration: 5000,
                  }
                )
              }
            />
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Home;
