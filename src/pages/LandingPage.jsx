

import Contact from '../sections/Contact';
import About from '../sections/About';
import Home from '../sections/Home';
import Journey from '../sections/Journey';
import Project from '../sections/Project';
import Review from '../sections/Review';
import Work from '../sections/Work';
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <>
        <Home />
        <About />
        <Journey />
        <Project />
        <Work />
        <Review />
        <Contact />
      </>
    </div>
  );
}

export default LandingPage