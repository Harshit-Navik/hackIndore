import { FaUserMd, FaComments, FaCalendarAlt, FaThumbsUp } from "react-icons/fa";


export default function ProcessSteps() {
  const steps = [
    {
        id: 1,
        icon: <FaUserMd className="text-blue-600 text-5xl mb-4" />,
        title: "Check Profile",
        description: "Browse verified doctors, specialties, and read patient reviews.",
    },
    {
        id: 2,
        icon: <FaComments className="text-blue-600 text-5xl mb-4" />,
        title: "Request Consult",
        description: "Get personalized medical advice online from a licensed doctor.",
    },
    {
        id: 3,
        icon: <FaCalendarAlt className="text-blue-600 text-5xl mb-4" />,
        title: "Schedule Visit",
        description: "Book a virtual or in-person appointment at your convenience.",
    },
    {
        id: 4,
        icon: <FaThumbsUp className="text-blue-600 text-5xl mb-4" />,
        title: "Get Solution",
        description: "Receive your tailored treatment plan and health guidance.",
    },
    ];


  return (
    <section id="process" className="bg-gray-50 px-6 py-20">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            4 Easy Steps to Get Your Solution
          </h1>
          <p className="text-gray-700 text-lg max-w-5xl mx-auto">
            Navigate your health journey effortlessly with WeCare — where modern tech meets trusted medical care.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl 
                         transition-all duration-300 text-center p-8 flex flex-col items-center"
            >
              <div className=" w-24 h-24 flex items-center justify-center rounded-lg mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
