

import Contact from '../sections/Contact';
import Home from '../sections/Home';
import Project from '../sections/Project';
import Review from '../sections/Review';
import Work from '../sections/Work';

const LandingPage = () => {
  return (
    <div>
      <>
        <Home />
        <Project />
        <Work />
        <Review />
        <Contact />
      </>
    </div>
  );
}

export default LandingPage