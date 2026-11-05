import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./TextType.css";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  deleteMode = "backspace",
  loop = true,
  className = "",
  showCursor = true,
  cursorStyle = "character",
  cursorCharacter = "|",
  cursorColor = "currentColor",
  cursorBlinkDuration = 0.5,
  cursorGlide = true,
  typeEffect = "none",
  mistakes = 0,
  prefix = "",
  prefixColor = "currentColor",
  ...props
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const caretRef = useRef(null);
  const previousPosition = useRef(null);
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textIndex % textArray.length] ?? "";
  const shownText = currentText.slice(0, count);

  useEffect(() => {
    let timer;

    if (!isDeleting && count < currentText.length) {
      timer = setTimeout(
        () => setCount((visibleCount) => visibleCount + 1),
        count === 0 ? initialDelay || typingSpeed : typingSpeed,
      );
    } else if (!isDeleting) {
      if (!loop && textIndex === textArray.length - 1) return undefined;
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (count > 0) {
      timer = setTimeout(
        () => setCount((visibleCount) => visibleCount - 1),
        deletingSpeed,
      );
    } else {
      setIsDeleting(false);
      setTextIndex((index) => (index + 1) % textArray.length);
    }

    return () => clearTimeout(timer);
  }, [
    count,
    currentText,
    deleteMode,
    deletingSpeed,
    initialDelay,
    isDeleting,
    loop,
    pauseDuration,
    textArray.length,
    textIndex,
    typingSpeed,
  ]);

  useLayoutEffect(() => {
    const caret = caretRef.current;
    const cursor = cursorRef.current;
    if (!caret || !cursor) return;

    const position = { x: caret.offsetLeft, y: caret.offsetTop };
    const previous = previousPosition.current;
    if (previous && previous.x === position.x && previous.y === position.y) {
      return;
    }

    if (!previous || !cursorGlide || previous.y !== position.y) {
      gsap.set(cursor, position);
    } else {
      gsap.to(cursor, {
        ...position,
        duration: 0.12,
        ease: "power3.out",
        overwrite: true,
      });
    }
    previousPosition.current = position;
  });

  useEffect(
    () => () => gsap.killTweensOf(cursorRef.current),
    [],
  );

  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`}
      data-delete-mode={deleteMode}
      data-type-effect={typeEffect}
      data-mistakes={mistakes}
      {...props}
    >
      <span className="text-type__sr">{prefix}{textArray.join(" ")}</span>
      <span className="text-type__content" aria-hidden="true">
        {prefix && (
          <span className="text-type__prefix" style={{ color: prefixColor }}>
            {prefix}
          </span>
        )}
        <span className="text-type__text">{shownText}</span>
        <span ref={caretRef} className="text-type__caret" />
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          aria-hidden="true"
          className={`text-type__cursor text-type__cursor--${cursorStyle}`}
          style={{
            color: cursorColor,
            animationDuration: `${cursorBlinkDuration}s`,
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};

TextType.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  as: PropTypes.elementType,
  typingSpeed: PropTypes.number,
  initialDelay: PropTypes.number,
  pauseDuration: PropTypes.number,
  deletingSpeed: PropTypes.number,
  deleteMode: PropTypes.string,
  loop: PropTypes.bool,
  className: PropTypes.string,
  showCursor: PropTypes.bool,
  cursorStyle: PropTypes.string,
  cursorCharacter: PropTypes.string,
  cursorColor: PropTypes.string,
  cursorBlinkDuration: PropTypes.number,
  cursorGlide: PropTypes.bool,
  typeEffect: PropTypes.string,
  mistakes: PropTypes.number,
  prefix: PropTypes.string,
  prefixColor: PropTypes.string,
};

export default TextType;
