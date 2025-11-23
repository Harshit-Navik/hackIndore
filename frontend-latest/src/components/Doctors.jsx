export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      experience: "10+ Years Experience",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. John Doe",
      specialty: "Neurologist",
      experience: "8+ Years Experience",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Emily Rose",
      specialty: "Pediatrician",
      experience: "12+ Years Experience",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Mike Ross",
      specialty: "Dermatologist",
      experience: "6+ Years Experience",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section id="doctors" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-blue-600 text-lg font-medium mb-2">Meet Our Team</h3>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-10">Expert Specialists</h1>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img src={doc.img} alt={doc.name} className="w-full h-64 object-cover" />
              <div className="p-5">
                <h2 className="text-2xl font-medium text-gray-800">{doc.name}</h2>
                <h3 className="text-lg text-blue-600 mt-1">{doc.specialty}</h3>
                <p className="text-gray-600 mt-2">{doc.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
