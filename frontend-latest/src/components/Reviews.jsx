import Marquee from "react-fast-marquee";

export default function Reviews() {
  const reviews = [
    {
      name: "Rajesh Kumar",
      text: "Absolutely life-saving app. Booked a cardiologist for my father remotely. Smooth video consultation!",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Priya Sharma",
      text: "Medicine delivery is excellent. I live in Himachal and got my meds in 48 hours!",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Amit Verma",
      text: "Super simple UI. My mother could upload her reports without any help.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Sneha Patel",
      text: "Found a great pediatrician near me using WeCare. Love the transparency!",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Vikram Singh",
      text: "Genuine doctors and genuine advice. Best healthcare app right now!",
      img: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Anjali Das",
      text: "Map integration is perfect. Found a pharmacy near me in seconds!",
      img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Rohit Mehra",
      text: "Smooth login, quick booking. The best healthcare UX experience!",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Kavita Nair",
      text: "Support team is very helpful and kind. Solved my issue instantly.",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Arjun Malhotra",
      text: "Got connected to a dermatologist in minutes. Great value!",
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&auto=format&fit=crop&q=60",
    },
    {
      name: "Neha Gupta",
      text: "Booking, consultation, prescription — all in one place. Love it!",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-10">
          Trusted by Families Across India
        </h1>

        {/* Scrolling Reviews using Marquee */}
        <Marquee pauseOnHover={true} speed={80} gradient={true}>
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-gray-100 flex-shrink-0 w-72 h-72 m-4 p-6 rounded-xl shadow-md hover:shadow-2xl hover:border hover:border-yellow-300 transition duration-300 flex flex-col justify-between items-center text-center"
            >
              <img
                src={rev.img}
                alt={rev.name}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <p className="text-gray-700 text-sm italic mb-3 leading-snug">
                "{rev.text}"
              </p>
              <span className="text-gray-900 font-medium text-base">{rev.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
