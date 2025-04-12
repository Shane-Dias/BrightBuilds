import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      role: "Computer Science Student",
      feedback:
        "This platform has transformed my coding journey, allowing me to collaborate and learn from experts.",
      image: "https://randomuser.me/api/portraits/women/45.jpg", // Placeholder for demo
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Software Engineer, TechCorp",
      feedback:
        "A fantastic initiative connecting students with industry professionals for real-world exposure.",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder for demo
      rating: 4.9,
    },
    {
      name: "Sneha Patel",
      role: "Professor, AI & ML",
      feedback:
        "It's inspiring to see students innovate and align their projects with SDGs!",
      image: "https://randomuser.me/api/portraits/women/50.jpg", // Placeholder for demo
      rating: 4.8,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h1
          className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          👥 Testimonials
        </motion.h1>

        <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
          Hear from our community of developers, educators, and industry
          professionals about their experience with the Projects Innovation Hub.
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center p-6">
                {/* Quote Icon */}
                <div className="absolute top-3 right-3 opacity-20">
                  <Quote size={32} className="text-blue-400" />
                </div>

                {/* User Image */}
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 scale-150"></div>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 relative shadow-lg shadow-purple-900/30">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/64/64";
                      }}
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.floor(testimonial.rating)
                          ? "currentColor"
                          : "none"
                      }
                      className="mx-0.5"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-300">
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>

                {/* Feedback text */}
                <div className="bg-black/20 rounded-xl p-4 mb-4 relative">
                  <p className="text-gray-300 italic mb-0 relative z-10">
                    "{testimonial.feedback}"
                  </p>
                </div>

                {/* User Details */}
                <h3 className="text-lg font-semibold text-white mt-4">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-blue-400">{testimonial.role}</p>

                {/* Subtle decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
