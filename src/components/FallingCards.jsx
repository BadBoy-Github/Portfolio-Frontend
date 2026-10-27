import { useEffect, useRef } from "react";
import Matter from "matter-js";
import PropTypes from "prop-types";
import "./FallingCards.css";

const WALL_SIZE = 320;
const FIXED_STEP = 1000 / 120;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const FallingCards = ({
  items,
  gravity = 1,
  bounciness = 0.2,
  scatter = 0.5,
  stagger = 0.03,
  restoreDelay = 2,
  cursorPush = 0.5,
  mouseConstraintStiffness = 0.2,
  draggable = true,
}) => {
  const containerRef = useRef(null);
  const layoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layout = layoutRef.current;
    if (!container || !layout || !items.length) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let engine = null;
    let bodies = [];
    let walls = [];
    let raf = 0;
    let lastFrame = 0;
    let accumulator = 0;
    let elapsed = 0;
    let quietSince = null;
    let inside = false;
    let phase = "idle";
    let drag = null;
    const pointer = { x: 0, y: 0, vx: 0, vy: 0, time: 0 };

    const toLocal = (event) => {
      const bounds = container.getBoundingClientRect();
      return {
        x: event.clientX - bounds.left - container.clientLeft,
        y: event.clientY - bounds.top - container.clientTop,
      };
    };

    const positionWalls = () => {
      if (!engine) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const [floor, left, right, ceiling] = walls;
      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + WALL_SIZE / 2,
      });
      Matter.Body.setPosition(left, { x: -WALL_SIZE / 2, y: height / 2 });
      Matter.Body.setPosition(right, {
        x: width + WALL_SIZE / 2,
        y: height / 2,
      });
      Matter.Body.setPosition(ceiling, { x: width / 2, y: -WALL_SIZE / 2 });
    };

    const clearPhysics = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (engine) {
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
        engine = null;
      }
      bodies.forEach(({ element }) => {
        element.getAnimations().forEach((animation) => animation.cancel());
        element.style.position = "";
        element.style.left = "";
        element.style.top = "";
        element.style.width = "";
        element.style.height = "";
        element.style.margin = "";
        element.style.transform = "";
      });
      bodies = [];
      walls = [];
      drag = null;
      layout.style.minHeight = "";
      delete container.dataset.phase;
      delete container.dataset.dragging;
      phase = "idle";
    };

    const restore = () => {
      if (phase !== "falling") return;
      phase = "restoring";
      container.dataset.phase = "restoring";
      if (drag && engine) Matter.Composite.remove(engine.world, drag.constraint);
      drag = null;
      const animations = bodies
        .slice()
        .sort((a, b) => a.body.position.y - b.body.position.y)
        .map((piece, index) => {
          const angle = piece.body.angle;
          const from = `translate3d(${piece.body.position.x - piece.width / 2}px, ${piece.body.position.y - piece.height / 2}px, 0) rotate(${angle}rad)`;
          const to = `translate3d(${piece.startX}px, ${piece.startY}px, 0) rotate(0rad)`;
          piece.element.style.transform = to;
          return piece.element.animate([{ transform: from }, { transform: to }], {
            duration: 650,
            delay: Math.min(index * 12, 300),
            easing: "cubic-bezier(0.34, 1.4, 0.64, 1)",
            fill: "backwards",
          });
        });
      Promise.all(
        animations.map((animation) =>
          animation.finished.catch(() => undefined),
        ),
      ).then(() => {
        if (phase === "restoring") clearPhysics();
      });
    };

    const draw = (alpha) => {
      bodies.forEach((piece) => {
        const x =
          piece.previousX +
          (piece.body.position.x - piece.previousX) * alpha;
        const y =
          piece.previousY +
          (piece.body.position.y - piece.previousY) * alpha;
        const angle =
          piece.previousAngle +
          (piece.body.angle - piece.previousAngle) * alpha;
        piece.element.style.transform = `translate3d(${x - piece.width / 2}px, ${y - piece.height / 2}px, 0) rotate(${angle}rad)`;
      });
    };

    const tick = (now) => {
      raf = 0;
      if (!engine || !container.isConnected) return;
      const delta = Math.min(0.05, lastFrame ? (now - lastFrame) / 1000 : 1 / 60);
      lastFrame = now;
      elapsed += delta;
      engine.gravity.y = clamp(gravity, -3, 4) * 1.4;

      bodies.forEach((piece) => {
        if (!piece.released && (elapsed >= piece.releaseAt || piece.knocked)) {
          piece.released = true;
          Matter.Body.setStatic(piece.body, false);
          Matter.Body.setVelocity(piece.body, {
            x: (Math.random() - 0.5) * 6 * clamp(scatter, 0, 1),
            y: -Math.random() * 2.5 * clamp(scatter, 0, 1),
          });
          Matter.Body.setAngularVelocity(
            piece.body,
            (Math.random() - 0.5) * 0.12 * clamp(scatter, 0, 1),
          );
        }
      });

      accumulator += delta * 1000;
      while (accumulator >= FIXED_STEP) {
        bodies.forEach((piece) => {
          piece.previousX = piece.body.position.x;
          piece.previousY = piece.body.position.y;
          piece.previousAngle = piece.body.angle;
        });
        Matter.Engine.update(engine, FIXED_STEP);
        accumulator -= FIXED_STEP;
      }
      draw(accumulator / FIXED_STEP);

      const settled = bodies.every(
        (piece) =>
          piece.released &&
          (piece.body.isSleeping || piece.body.speed < 0.05),
      );
      if (restoreDelay > 0 && settled && !inside && !drag) {
        quietSince ??= now;
        if (now - quietSince > restoreDelay * 1000) {
          restore();
          return;
        }
      } else {
        quietSince = null;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && engine && phase === "falling") {
        lastFrame = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const fall = () => {
      if (phase !== "idle" && phase !== "restoring") return;
      if (reducedMotion) return;
      if (phase === "restoring") return;

      const elements = [...layout.querySelectorAll("[data-card-piece]")];
      if (!elements.length) return;
      const bounds = container.getBoundingClientRect();
      const originX = bounds.left + container.clientLeft;
      const originY = bounds.top + container.clientTop;
      const positions = elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left - originX,
          y: rect.top - originY,
          width: rect.width,
          height: rect.height,
        };
      });
      layout.style.minHeight = `${layout.offsetHeight}px`;
      engine = Matter.Engine.create({
        enableSleeping: true,
        positionIterations: 8,
        velocityIterations: 6,
      });
      engine.gravity.y = clamp(gravity, -3, 4) * 1.4;
      walls = [
        Matter.Bodies.rectangle(0, 0, 10000, WALL_SIZE, {
          isStatic: true,
          friction: 0.8,
        }),
        Matter.Bodies.rectangle(0, 0, WALL_SIZE, 10000, {
          isStatic: true,
          friction: 0.3,
        }),
        Matter.Bodies.rectangle(0, 0, WALL_SIZE, 10000, {
          isStatic: true,
          friction: 0.3,
        }),
        Matter.Bodies.rectangle(0, 0, 10000, WALL_SIZE, {
          isStatic: true,
          friction: 0.3,
        }),
      ];
      const order = positions.map((_, index) => index);
      order.sort(() => Math.random() - 0.5);
      const ranks = new Map(order.map((index, rank) => [index, rank]));
      bodies = elements.map((element, index) => {
        const position = positions[index];
        const body = Matter.Bodies.rectangle(
          position.x + position.width / 2,
          position.y + position.height / 2,
          position.width - 1,
          position.height - 1,
          {
            chamfer: { radius: 8 },
            restitution: clamp(bounciness, 0, 1),
            friction: 0.4,
            frictionStatic: 0.8,
            frictionAir: 0.012,
            density: 0.0015,
            slop: 0.02,
          },
        );
        Matter.Body.setStatic(body, true);
        Object.assign(element.style, {
          position: "absolute",
          left: "0",
          top: "0",
          width: `${position.width}px`,
          height: `${position.height}px`,
          margin: "0",
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        });
        return {
          element,
          body,
          width: position.width,
          height: position.height,
          startX: position.x,
          startY: position.y,
          previousX: body.position.x,
          previousY: body.position.y,
          previousAngle: 0,
          releaseAt: ranks.get(index) * Math.max(0, stagger),
          released: false,
          knocked: false,
        };
      });
      Matter.Composite.add(engine.world, [
        ...walls,
        ...bodies.map((piece) => piece.body),
      ]);
      const bodyPieces = new Map(
        bodies.map((piece) => [piece.body, piece]),
      );
      Matter.Events.on(engine, "collisionStart", ({ pairs }) => {
        const down = Math.sign(engine.gravity.y) || 1;
        pairs.forEach(({ bodyA, bodyB }) => {
          const a = bodyPieces.get(bodyA);
          const b = bodyPieces.get(bodyB);
          if (!a || !b || a.released === b.released) return;
          const [moving, still] = a.released ? [a, b] : [b, a];
          if (
            (still.body.position.y - moving.body.position.y) * down >
            still.height * 0.25
          ) {
            still.knocked = true;
          }
        });
      });
      phase = "falling";
      container.dataset.phase = "falling";
      elapsed = 0;
      accumulator = 0;
      quietSince = null;
      positionWalls();
      wake();
    };

    const handleEnter = () => {
      inside = true;
      fall();
    };
    const handleLeave = () => {
      inside = false;
    };
    const handleDown = (event) => {
      if (!engine || phase !== "falling" || !draggable) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const point = toLocal(event);
      const hit = Matter.Query.point(
        bodies.filter((piece) => piece.released).map((piece) => piece.body),
        point,
      )[0];
      if (!hit) return;
      event.preventDefault();
      container.setPointerCapture?.(event.pointerId);
      Matter.Sleeping.set(hit, false);
      const constraint = Matter.Constraint.create({
        pointA: point,
        bodyB: hit,
        pointB: {
          x: point.x - hit.position.x,
          y: point.y - hit.position.y,
        },
        stiffness: clamp(mouseConstraintStiffness, 0.01, 1),
        damping: 0.08,
        length: 0,
      });
      Matter.Composite.add(engine.world, constraint);
      drag = { constraint, pointerId: event.pointerId };
      container.dataset.dragging = "";
      wake();
    };
    const handleMove = (event) => {
      const point = toLocal(event);
      const now = performance.now();
      const delta = Math.max(1, now - pointer.time);
      if (pointer.time && delta < 120) {
        const blend = Math.min(1, delta / 40);
        pointer.vx += ((point.x - pointer.x) / delta - pointer.vx) * blend;
        pointer.vy += ((point.y - pointer.y) / delta - pointer.vy) * blend;
      } else {
        pointer.vx = 0;
        pointer.vy = 0;
      }
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.time = now;
      inside = true;
      if (drag?.pointerId === event.pointerId) {
        drag.constraint.pointA = point;
        return;
      }
      if (phase !== "falling" || !cursorPush) return;
      const speed = Math.hypot(pointer.vx, pointer.vy);
      if (speed < 0.35) return;
      bodies.forEach((piece) => {
        if (!piece.released) return;
        const { body } = piece;
        const reach = Math.max(piece.width, piece.height) / 2 + 18;
        const distance = Math.hypot(
          body.position.x - point.x,
          body.position.y - point.y,
        );
        if (distance > reach) return;
        const falloff = 1 - (distance / reach) ** 2;
        const kick = Math.min(20, speed * cursorPush * falloff * 16);
        Matter.Sleeping.set(body, false);
        Matter.Body.setVelocity(body, {
          x: body.velocity.x + (pointer.vx / speed) * kick,
          y: body.velocity.y + (pointer.vy / speed) * kick - kick * 0.7,
        });
      });
      wake();
    };
    const handleUp = (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (engine) Matter.Composite.remove(engine.world, drag.constraint);
      drag = null;
      delete container.dataset.dragging;
    };

    const resizeObserver = new ResizeObserver(() => {
      positionWalls();
      wake();
    });
    resizeObserver.observe(container);
    container.addEventListener("pointerenter", handleEnter);
    container.addEventListener("pointerleave", handleLeave);
    container.addEventListener("pointerdown", handleDown);
    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerup", handleUp);
    container.addEventListener("pointercancel", handleUp);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("pointerenter", handleEnter);
      container.removeEventListener("pointerleave", handleLeave);
      container.removeEventListener("pointerdown", handleDown);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerup", handleUp);
      container.removeEventListener("pointercancel", handleUp);
      clearPhysics();
    };
  }, [
    bounciness,
    cursorPush,
    draggable,
    gravity,
    items,
    mouseConstraintStiffness,
    restoreDelay,
    scatter,
    stagger,
  ]);

  return (
    <div
      ref={containerRef}
      className="falling-cards"
      role="group"
      aria-label="Interactive falling learning cards. Move your pointer over the cards to make them fall."
      data-draggable={draggable ? "" : undefined}
    >
      <div ref={layoutRef} className="falling-cards__layout">
        {items.map((item, index) => (
          <div
            className="falling-cards__card"
            data-card-piece=""
            key={`${item}-${index}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

FallingCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  gravity: PropTypes.number,
  bounciness: PropTypes.number,
  scatter: PropTypes.number,
  stagger: PropTypes.number,
  restoreDelay: PropTypes.number,
  cursorPush: PropTypes.number,
  mouseConstraintStiffness: PropTypes.number,
  draggable: PropTypes.bool,
};

export default FallingCards;
