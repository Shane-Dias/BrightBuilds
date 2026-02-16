import React from "react";
import { motion } from "../motionless";
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
      className="relative z-10 py-12 sm:py-16 md:py-20 min-h-fit px-4 sm:px-6 md:p-8 rounded-lg"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        {/* Section Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-4 sm:mb-6"
          style={{ color: 'var(--accent-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          What Our Community Says
        </motion.h1>

        <p className="text-base sm:text-lg mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4" style={{ color: 'var(--text-secondary)' }}>
          Hear from students, educators, and industry professionals.
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] p-5 sm:p-6">
                {/* Quote Icon */}
                <div className="absolute top-3 right-3 opacity-20">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: 'var(--accent-light)' }} />
                </div>

                {/* User Image */}
                <div className="flex justify-center mb-4 sm:mb-6 relative">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-20 scale-150" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--amber-primary))' }}></div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 relative shadow-lg" style={{ borderColor: 'var(--accent-primary)', boxShadow: '0 10px 30px rgba(47, 167, 111, 0.3)' }}>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-light))' }}
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
                <div className="flex items-center justify-center mb-3 sm:mb-4" style={{ color: 'var(--amber-primary)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 mx-0.5"
                      fill={
                        i < Math.floor(testimonial.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                  <span className="ml-2 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {testimonial.rating.toFixed(1)}
                  </span>
                </div>

                {/* Feedback text */}
                <div className="bg-black/20 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 relative">
                  <p className="text-xs sm:text-sm text-gray-300 italic mb-0 relative z-10">
                    "{testimonial.feedback}"
                  </p>
                </div>

                {/* User Details */}
                <h3 className="text-base sm:text-lg font-semibold text-white mt-3 sm:mt-4">
                  {testimonial.name}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--accent-light)' }}>{testimonial.role}</p>

                {/* Subtle decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 opacity-50" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--amber-primary))' }}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

