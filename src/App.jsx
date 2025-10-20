
/**
 * @copyright 2025 Panda Productions
 * @author Elayabarathi M V <elayabarathiedison@gmail.com>
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
import Home from "./components/Home";
import About from "./components/About";
import Journey from "./components/Journey";
import Project from './components/Project';
import Certification from "./components/Certification";
import Review from './components/Review';
import Contact from './components/Contact';
import Footer from './components/Footer';





const App = () => {

    return (
      <ReactLenis root>
        <Header />
        <main>
          <Home />
          <About />
          <Journey />
          <Project />
          <Certification />
          <Review />
          <Contact />
        </main>
        <Footer />
      </ReactLenis>
    );

}

export default App;