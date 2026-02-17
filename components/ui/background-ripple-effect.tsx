"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";

interface BackgroundCellsProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundCells = ({ children, className }: BackgroundCellsProps) => {
  return (
    <div className={cn("relative min-h-[80vh] w-full flex justify-center overflow-hidden bg-[#020202]", className)}>
      <BackgroundCellCore />
      {children && (
        <div className="relative z-50 pointer-events-none select-none w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const size = 400;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full absolute inset-0"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none bottom-0 z-40 bg-gradient-to-b from-transparent via-[#020202]/20 to-[#020202]/80" />
        
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 2}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-[#00FF88]/40 relative z-[100]" rippleColor="rgba(0, 255, 136, 0.4)" />
        </div>

        <Pattern className="opacity-[0.6]" cellClassName="border-white/10" rippleColor="rgba(0, 209, 255, 0.2)" />
      </div>
    </div>
  );
};

const Cell = memo(({ rowIdx, colIdx, clickedCell, cellClassName, rippleColor, onClick }: any) => {
  const controls = useAnimation();

  useEffect(() => {
    if (clickedCell) {
      const distance = Math.sqrt(
        Math.pow(clickedCell[0] - rowIdx, 2) +
          Math.pow(clickedCell[1] - colIdx, 2)
      );
      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: { duration: Math.max(0.2, distance * 0.15) },
      });
    }
  }, [clickedCell, rowIdx, colIdx, controls]);

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-transparent border-l border-white/10 h-12 w-12 md:h-16 md:w-16 cursor-pointer",
        cellClassName
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 0.5, ease: "backOut" }}
        animate={controls}
        className="h-full w-full"
        style={{ backgroundColor: rippleColor }}
      />
    </div>
  );
});

Cell.displayName = "Cell";

const Pattern = ({ className, cellClassName, rippleColor = "rgba(0, 255, 136, 0.3)" }: any) => {
  const rows = 47;
  const cols = 20;
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div className={cn("flex flex-row relative z-30", className)}>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col relative z-20 border-b border-white/10"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Cell
              key={`cell-${rowIdx}-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              clickedCell={clickedCell}
              cellClassName={cellClassName}
              rippleColor={rippleColor}
              onClick={() => setClickedCell([rowIdx, colIdx])}
            />
          ))}
        </div>
      ))}
    </div>
  );
};