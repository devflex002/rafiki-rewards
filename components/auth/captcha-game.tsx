'use client';

import { useState, useRef, useEffect } from 'react';
import { Gift, CheckCircle2, RefreshCw } from 'lucide-react';
import Image from 'next/image';

interface CaptchaGameProps {
  onVerify: (verified: boolean) => void;
}

export function CaptchaGame({ onVerify }: CaptchaGameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // Constants
  const padding = 4; // p-1 is 4px padding
  const handleSize = 56; // h-14 is 56px

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.clientWidth);
    }

    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxDrag = trackWidth - handleSize - padding * 2;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isVerified) return;
    setIsDragging(true);
    setStartX(e.clientX - currentX);
    if (handleRef.current) {
      handleRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isVerified) return;
    const newX = e.clientX - startX;
    // Clamp between 0 and max drag distance
    const clampedX = Math.max(0, Math.min(newX, maxDrag));
    setCurrentX(clampedX);
  };

  const handlePointerUp = () => {
    if (!isDragging || isVerified) return;
    setIsDragging(false);

    // Verify if dragged more than 90% of the track
    if (currentX >= maxDrag * 0.9) {
      setCurrentX(maxDrag);
      setIsVerified(true);
      onVerify(true);
      setShowConfetti(true);
      // Turn off confetti after a few seconds
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      // Spring back to start
      let tempX = currentX;
      const animate = () => {
        if (tempX > 0) {
          tempX = Math.max(0, tempX - tempX * 0.25 - 2);
          setCurrentX(tempX);
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  };

  const handleReset = () => {
    setIsVerified(false);
    setCurrentX(0);
    onVerify(false);
    setShowConfetti(false);
  };

  const dragPercent = maxDrag > 0 ? (currentX / maxDrag) * 100 : 0;

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5">
          <span>Human Verification</span>
          {isVerified && <span className="text-[10px] text-emerald-400 font-medium lowercase">(verified!)</span>}
        </label>
        {isVerified && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      <div className="text-xs text-zinc-500 font-medium mb-4 -mt-2">
        {isVerified 
          ? "Verification successful! You can now sign up." 
          : "Drag the Rafiki Coin into the Gift Box to unlock the form."}
      </div>

      {/* Main Track */}
      <div
        ref={trackRef}
        className={`relative w-full h-16 border rounded-full flex items-center p-1 overflow-hidden select-none transition-all duration-300 ${
          isVerified 
            ? 'bg-emerald-950/20 border-emerald-500/30' 
            : isDragging 
              ? 'bg-zinc-900 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
              : 'bg-zinc-900 border-zinc-800'
        }`}
        style={{ touchAction: 'none' }}
      >
        {/* Fill Background highlighting progress */}
        <div
          className={`absolute left-0 top-0 h-full rounded-l-full transition-colors duration-300 ${
            isVerified 
              ? 'bg-emerald-500/10' 
              : 'bg-purple-500/10'
          }`}
          style={{ width: `${currentX + handleSize}px` }}
        />

        {/* Instructions overlay */}
        {!isDragging && !isVerified && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-semibold text-zinc-500 animate-pulse">
            Slide to verify &rarr;
          </div>
        )}

        {/* Target Zone */}
        <div
          className={`absolute right-1 w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isVerified
              ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : dragPercent > 75
                ? 'bg-purple-900 border-purple-400 text-purple-200 scale-105'
                : 'bg-zinc-950 border-zinc-800 text-zinc-600'
          }`}
        >
          {isVerified ? (
            <CheckCircle2 className="h-6 w-6 animate-bounce" />
          ) : (
            <Gift className={`h-5 w-5 ${dragPercent > 75 ? 'animate-pulse' : ''}`} />
          )}
        </div>

        {/* Draggable Handle */}
        <div
          ref={handleRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`absolute rounded-full bg-zinc-950 border flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-all select-none overflow-hidden ${
            isVerified 
              ? 'border-emerald-500 pointer-events-none' 
              : isDragging 
                ? 'border-purple-400 scale-105 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                : 'border-zinc-800 hover:border-zinc-700'
          }`}
          style={{
            width: `${handleSize}px`,
            height: `${handleSize}px`,
            transform: `translateX(${currentX}px)`,
            left: `${padding}px`,
            zIndex: 10,
          }}
        >
          {/* Logo container */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={46} 
              height={46}
              className={`object-contain pointer-events-none select-none ${isDragging ? 'rotate-12 transition-transform' : ''}`}
            />
          </div>
        </div>

        {/* Confetti Explosion (pure CSS) */}
        {showConfetti && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none w-10 h-10">
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const velocity = 40 + Math.random() * 40;
              const delay = Math.random() * 0.2;
              const color = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][i % 5];
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: color,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: `particleBurst 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s forwards`,
                    // Custom properties for keyframe usage
                    ['--angle' as any]: `${angle}deg`,
                    ['--distance' as any]: `${velocity}px`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Styled keyframe for pure CSS particle burst */}
      <style jsx global>{`
        @keyframes particleBurst {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
