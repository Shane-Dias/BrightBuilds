import React, { Suspense, lazy } from "react";
import { motion } from "../motionless";
import { useNavigate } from "react-router-dom";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <main className="relative w-full h-screen flex items-center justify-start overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Suspense 
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              {/* Fallback stars background while Spline loads */}
              <StarsBackground />
              <ShootingStars />
            </div>
          }
        >
          {/* Replace this URL with your Spline scene URL */}
          {/* Example scenes you can use from Spline Community:
              - Tech/Futuristic: https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode
              - Abstract Shapes: https://prod.spline.design/EqVu6RNBAIKy7mzS/scene.splinecode
              - Floating Objects: https://prod.spline.design/Jmxz0bRAKH9pJUTf/scene.splinecode
          */}
          <Spline 
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>

      {/* Improved Text Overlay - Left Aligned & Smaller */}
      <motion.div
        className="relative z-10 text-left px-4 sm:px-8 md:px-16 max-w-full sm:max-w-xl mx-4 sm:ml-8 md:ml-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Main Headline - Short & Impactful */}
        <motion.h1 
          className="font-orbitron text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-3 sm:mb-4"
          style={{
            background: 'linear-gradient(135deg, #5dd3a7 0%, #2fa76f 50%, #e6b887 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(93, 211, 167, 0.3)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          SHOWCASE
          <br />
          INNOVATE
          <br />
          IMPACT
        </motion.h1>

        {/* Subtitle - Minimalist */}
        <motion.p 
          className="text-sm sm:text-base md:text-lg font-light tracking-wide"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Where Technology Meets Creativity
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="mt-6 sm:mt-8 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-2xl"
          style={{ 
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 40px rgba(93, 211, 167, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
        >
          Explore Projects
        </motion.button>

        {/* Decorative Line */}
        <motion.div
          className="mt-4 sm:mt-6 w-16 sm:w-24 h-1 rounded-full"
          style={{ backgroundColor: 'var(--accent-light)' }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      {/* Gradient Overlay for better text visibility on left */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(8, 9, 9, 0.7) 0%, transparent 40%, transparent 100%)',
        }}
      />
    </main>
  );
}
