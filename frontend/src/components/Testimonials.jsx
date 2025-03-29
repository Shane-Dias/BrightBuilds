import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      role: "Computer Science Student",
      feedback:
        "This platform has transformed my coding journey, allowing me to collaborate and learn from experts.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rahul Verma",
      role: "Software Engineer, TechCorp",
      feedback:
        "A fantastic initiative connecting students with industry professionals for real-world exposure.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sneha Patel",
      role: "Professor, AI & ML",
      feedback:
        "It's inspiring to see students innovate and align their projects with SDGs!",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Ankit Joshi",
      role: "Electronics Engineer",
      feedback:
        "The best platform for showcasing innovative projects with global impact!",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
    },
  ];

  return (
    <section className="relative z-10 py-20 bg-[#231A1D]">
      <div className="container mx-auto px-6 text-center">
        {/* 🔹 Section Title */}
        <h2 className="text-5xl font-bold text-rose-500 font-lilita mb-12">
          Testimonials
        </h2>

        {/* 🔹 Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#2D2022] p-6 rounded-xl shadow-lg border border-[#462A2E] transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:shadow-[#FF6B6B]/20"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-[#FF6B6B]"
                />
              </div>
              <p className="text-gray-300 italic mb-4">
                "{testimonial.feedback}"
              </p>
              <h3 className="text-lg font-semibold text-[#FFEBE5]">
                {testimonial.name}
              </h3>
              <p className="text-sm text-[#FF9494]/80">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
