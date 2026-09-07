import { Helmet } from "react-helmet-async";
import Contact from "../components/Contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Me | Elayabarathi M V</title>
        <meta
          name="description"
          content="Get in touch with Elayabarathi M V for collaborations, projects, and opportunities."
        />
      </Helmet>
      <div className="container">
        <Contact />
      </div>
    </>
  );
};

export default ContactPage;
