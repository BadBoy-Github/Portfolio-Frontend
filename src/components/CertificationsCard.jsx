
import PropTypes from "prop-types"
import { useState } from "react";

import { IoClose } from "react-icons/io5";

const ratings = new Array(5)
ratings.fill({
    icon: 'star',
    style: { fontVariationSettings: '"FILL" 1' }
})


const CertificationsCard = ({ imgSrc, title, company, logo }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imgUrl) => {
    setSelectedImage(imgUrl);
    document.body.classList.add("overflow-hidden");
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div
      className="bg-zinc-800 p-5 rounded-xl min-w-[320px] flex flex-col lg:min-w-[420px]"
      onClick={() => openImage(imgSrc)}
    >
      {/*Modal for certifications selecting*/}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 animate-fadeIn"
          onClick={closeImage}
        >
          <div className="relative w-fit" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#18181b] flex items-center justify-center p-4 rounded-lg border border-[#373a3d] mt-10 relative">
              <div className="">
                <img
                  src={selectedImage}
                  alt="Selected Linkedin Banner Image"
                  className=" max-h-[80vh] max-w-[160vh] rounded-md"
                />
              </div>
              <div
                className="absolute text-black bg-red-700 hover:bg-red-600 hover:scale-105 top-0 right-0 cursor-pointer m-3 p-1 rounded-full"
                onClick={closeImage}
              >
                <IoClose className="size-[1.2rem]" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div>
          <p>{title}</p>

          <p className="text-xs text-zinc-400 tracking-wider">{company}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700">
          <img
            src={logo}
            alt="Logo"
            className="w-6 h-6 rounded-full object-cover"
          />
        </div>
      </div>
      <figure className="rounded-lg bg-zinc-700 mt-4 hover:scale-105 transition-transform duration-300">
        <img
          src={imgSrc}
          width={44}
          height={44}
          alt={title}
          loading="lazy"
          className="w-full h-60 object-cover bg-zinc-400/20 rounded-lg"
        />
      </figure>
    </div>
  );
};

CertificationsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  company: PropTypes.string,
  logo: PropTypes.string,
};

export default CertificationsCard;