"use client";
import { cn } from "./utils";
import { useEffect, useRef, useCallback, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import PropTypes from "prop-types";

const WaveBg = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 70,
  backgroundFill = "#FBF5DD",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const noiseTime = useRef(0);

  const getSpeed = useCallback(
    () => (speed === "fast" ? 0.002 : 0.001),
    [speed]
  );

  const waveColors = useMemo(
    () =>
      colors ?? [
        "#E9A107",
        "#E34819",
        "#E1455D",
        "#C667A3",
        "#3FB5B4",
      ],
    [colors]
  );

  const drawWave = useCallback(
    (n, ctx, w, h) => {
      noiseTime.current += getSpeed();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x < w; x += 8) {
          const y = noise(x / 500, 0.5 * i, noiseTime.current) * 500;
          ctx.lineTo(x, y + h * 0.4);
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [noise, getSpeed, waveWidth, waveColors, backgroundFill, waveOpacity]
  );

  const render = useCallback(() => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    const { width: w, height: h } = ctx.canvas;

    drawWave(5, ctx, w, h);
    animationFrameRef.current = requestAnimationFrame(render);
  }, [drawWave]);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.style.width = "100%"; // 100% width
    canvas.style.height = "100vh"; // 100vh height
    canvas.width = canvas.offsetWidth; // The canvas width now equals the computed width
    canvas.height = canvas.offsetHeight; 
    ctxRef.current = canvas.getContext("2d");
  }, []);

  useEffect(() => {
    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, render]);

  return (
    <div
      className={cn(
        "h-screen w-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
        <span className="absolute mt-[-500px] z-12 spicy-rice text-[#2B1511] text-5xl">ETAMAX &apos;25</span>
        <div
          style={{ transform: "translate(0, -20%)" }}
          className="absolute z-12 h-75 w-75"
        >
          <img src="./LOGO.png" alt="" />
        </div>
        <canvas
          className="inset-0 z-0"
          ref={canvasRef}
          id="canvas"
          style={{ filter: `blur(${blur}px)` }}
        ></canvas>
      <div className={cn("z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

// PropTypes validation
WaveBg.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  waveWidth: PropTypes.number,
  backgroundFill: PropTypes.string,
  blur: PropTypes.number,
  speed: PropTypes.oneOf(["slow", "fast"]),
  waveOpacity: PropTypes.number,
};

export default WaveBg;