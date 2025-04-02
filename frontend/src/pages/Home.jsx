import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import SDGImpact from '../components/SDGImpact'
import Testimonials from '../components/Testimonials'
import AutoScrollToTop from "../components/AutoScrollToTop";

const Home = () => {
  return (
    <>
    <AutoScrollToTop/>
    <Hero/>
    <About/>
    <SDGImpact/>
    <Testimonials/>
    </>
  )
}

export default Home