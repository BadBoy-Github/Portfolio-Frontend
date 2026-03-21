

import FuzzyText from '../components/FuzzyText';

const PageNotFound = () => {
  return (
    <div className="h-[100vh] w-full container flex flex-col justify-center items-center">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        clickEffect
        glitchMode
        color="#38bdf8"
        fontSize="180px"
        className="mt-10"
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover
        clickEffect
        glitchMode
        fontSize="80px"
        fontWeight="700"
        className="mt-10"
      >
        not found
      </FuzzyText>
    </div>
  );
}

export default PageNotFound