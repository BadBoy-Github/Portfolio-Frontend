/**
 * @copyright 2025 Panda Productions
 * @author Elayabarathi M V <elayabarathiedison@gmail.com>
 * @license Apache-2.0
 */

import { useEffect } from "react";

/**
 * CustomCursor - A unique futuristic cursor with ring design and particle trail
 *
 * Features:
 * - Hides the default system cursor
 * - Creates a ring cursor with center dot
 * - Particle trail effect with fading particles
 * - Expands to a larger ring when hovering over interactive elements
 */
const CustomCursor = () => {
  useEffect(() => {
    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

    if (!isDesktop()) return;

     // Keep default cursor visible - removed cursor hiding rules
     // The custom cursor will be visible alongside the default cursor

     // Removed particle trail - no trailing circles
     const TRAIL_LENGTH = 0;
     const trailRefs = [];

    // Main cursor - ring with center dot (futuristic style)
    const mainCursor = document.createElement("div");
    mainCursor.className = "fixed pointer-events-none z-[9999]";
    mainCursor.style.cssText =
      "width: 24px; height: 24px; left: -100px; top: -100px;";
    mainCursor.innerHTML = `
      <div class="relative w-6 h-6">
        <div class="absolute inset-0 rounded-full border-2 border-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8),0_0_20px_rgba(167,139,250,0.4)]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#38bdf8] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.9)]"></div>
      </div>
    `;
    document.body.appendChild(mainCursor);

    // Hover cursor - larger expanding ring for interactive elements
    const hoverCursor = document.createElement("div");
    hoverCursor.className = "fixed pointer-events-none z-[9999]";
    hoverCursor.style.cssText =
      "left: -100px; top: -100px; opacity: 0; transition: opacity 0.2s, transform 0.2s;";
    hoverCursor.innerHTML = `
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-2 border-fuchsia-400 animate-ping" style="animation-duration: 1.5s; opacity: 0.6;"></div>
        <div class="absolute inset-1 rounded-full border-2 border-violet-300 shadow-[0_0_15px_rgba(167,139,250,0.8),0_0_30px_rgba(167,139,250,0.4)]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
      </div>
    `;
    document.body.appendChild(hoverCursor);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovering = false;

    const moveCursor = (e) => {
      mouseX = e.clientX - 10;
      mouseY = e.clientY - 10;
    };

    // Handle hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("btn") ||
        target.classList.contains("cursor-pointer")
      ) {
        isHovering = true;
        hoverCursor.style.opacity = "1";
        mainCursor.style.opacity = "0";
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
      hoverCursor.style.opacity = "0";
      mainCursor.style.opacity = "1";
    };

    const animate = () => {
      // Smooth follow
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      mainCursor.style.left = currentX + "px";
      mainCursor.style.top = currentY + "px";
      hoverCursor.style.left = currentX - 32 + "px";
      hoverCursor.style.top = currentY - 32 + "px";
      hoverCursor.style.transform = isHovering ? "scale(1.2)" : "scale(1)";

      // Trail with smooth delay and slight scatter effect
      trailRefs.forEach((item, i) => {
        const factor = isHovering ? 0.3 - i * 0.02 : 0.2 - i * 0.015;
        // Add slight random velocity for particle-like scatter
        item.vx += (Math.random() - 0.5) * 0.5;
        item.vy += (Math.random() - 0.5) * 0.5;
        item.vx *= 0.9; // Damping
        item.vy *= 0.9;

        item.x += (currentX - item.x) * factor + item.vx;
        item.y += (currentY - item.y) * factor + item.vy;
        item.el.style.left = item.x + "px";
        item.el.style.top = item.y + "px";
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    animate();

     return () => {
       document.body.style.cursor = "auto";
       document.documentElement.style.cursor = "auto";
       document.removeEventListener("mousemove", moveCursor);
       document.removeEventListener("mouseover", handleMouseOver);
       document.removeEventListener("mouseout", handleMouseOut);
       document.body.removeEventListener("mouseover", handleMouseOver);
       document.body.removeEventListener("mouseout", handleMouseOut);
       mainCursor.remove();
       hoverCursor.remove();
       // trailRefs is empty now, no cleanup needed
     };
  }, []);

  // This component doesn't render any DOM elements
  // It manages the cursor through direct DOM manipulation
  return null;
};

export default CustomCursor;
