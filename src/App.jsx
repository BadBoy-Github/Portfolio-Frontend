
/**
 * @copyright 2025 Coding with Panda
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';


/**
 * Register gsap plugin
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);


// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Review from './components/Review';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Experience from './components/Experience';


const App = () => {

    return (
      <ReactLenis root>
        <Header />
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Skills />
          <Work />
          <Certifications />
          <Review />
          <Contact />
        </main>
        <Footer />
      </ReactLenis>
    );

}

export default App;