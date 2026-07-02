'use client';

import { useState, useRef, useEffect } from 'react';
import { Gift, CheckCircle2, RefreshCw } from 'lucide-react';

interface CaptchaGameProps {
  onVerify: (verified: boolean) => void;
}

function RafikiCoin({ spinning }: { spinning: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-14 h-14 pointer-events-none select-none ${spinning ? 'animate-spin' : ''}`}
      style={{ animationDuration: spinning ? '1.4s' : undefined }}
    >
      <defs>
        <radialGradient id="silverRing" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#d8dce0" />
          <stop offset="75%" stopColor="#9aa1a8" />
          <stop offset="100%" stopColor="#6b7176" />
        </radialGradient>
        <radialGradient id="goldCenter" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fdedb0" />
          <stop offset="45%" stopColor="#eec24d" />
          <stop offset="80%" stopColor="#c9962a" />
          <stop offset="100%" stopColor="#9c7318" />
        </radialGradient>
        <clipPath id="outerClip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
        <clipPath id="innerClip">
          <circle cx="50" cy="50" r="30" />
        </clipPath>
        <path id="textTop" d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
        <path id="textBottom" d="M 17 58 A 33 33 0 0 0 83 58" fill="none" />
      </defs>

      {/* Outer silver ring */}
      <circle cx="50" cy="50" r="48" fill="#5f6469" />
      <circle cx="50" cy="50" r="47" fill="url(#silverRing)" />

      <g clipPath="url(#outerClip)">
        {/* Reeded edge ticks on silver ring */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * 45.5;
          const y1 = 50 + Math.sin(a) * 45.5;
          const x2 = 50 + Math.cos(a) * 47.5;
          const y2 = 50 + Math.sin(a) * 47.5;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4a4f54" strokeWidth="0.7" opacity="0.5" />
          );
        })}

        {/* Dot separators + curved text on silver ring */}
        <circle cx="50" cy="14.2" r="1" fill="#3a3d40" />
        <circle cx="50" cy="85.8" r="1" fill="#3a3d40" />

        <text fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill="#2e3235">
          <textPath href="#textTop" startOffset="50%" textAnchor="middle">
            TWENTY SHILLINGS
          </textPath>
        </text>
        <text fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill="#2e3235">
          <textPath href="#textBottom" startOffset="50%" textAnchor="middle">
            SHILINGI ISHIRINI
          </textPath>
        </text>

        {/* Inner gold disc */}
        <circle cx="50" cy="50" r="31" fill="#8a6a1c" />
        <circle cx="50" cy="50" r="30" fill="url(#goldCenter)" />

        <g clipPath="url(#innerClip)">
          {/* Elephant head/trunk silhouette, left-facing */}
          <g transform="translate(37,52) scale(0.95)">
            <path
              d="
                M -14,-10
                C -16,-16 -12,-21 -6,-22
                C -2,-23 3,-22 6,-19
                C 10,-20 14,-18 15,-14
                C 16,-11 14,-8 11,-7
                C 12,-4 11,-1 8,1
                C 9,4 8,7 5,8
                C 6,11 4,14 1,14
                C -3,18 -9,17 -12,13
                C -16,14 -20,11 -20,7
                C -23,6 -24,2 -22,-1
                C -25,-3 -25,-7 -22,-9
                C -20,-11 -17,-11 -14,-10 Z
              "
              fill="#3a2a05"
              opacity="0.85"
            />
            {/* Ear detail */}
            <path
              d="M -6,-20 C -1,-19 2,-15 1,-10 C 0,-6 -4,-4 -8,-6 C -12,-8 -13,-14 -10,-18 C -9,-19 -7,-20 -6,-20 Z"
              fill="#4a3a10"
              opacity="0.6"
            />
            {/* Trunk curl */}
            <path
              d="M 8,1 C 10,4 9,8 6,10 C 4,11.5 2,11 1.5,9 C 1,7 2.5,6 4,6.5"
              fill="none"
              stroke="#2a1e04"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Eye */}
            <circle cx="-3" cy="-11" r="0.9" fill="#2a1e04" />
            {/* Tusk */}
            <path d="M 5,8 C 7,10 7,13 5,15" fill="none" stroke="#f4e6b8" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* "20 KENYA" text */}
          <text x="66" y="46" fontSize="13" fontWeight="800" fill="#3a2a05" textAnchor="middle">
            20
          </text>
          <text x="66" y="57" fontSize="6" fontWeight="700" letterSpacing="0.5" fill="#3a2a05" textAnchor="middle">
            KENYA
          </text>

          {/* Subtle gold sheen */}
          <ellipse cx="42" cy="35" rx="16" ry="8" fill="#ffffff" opacity="0.15" />
        </g>

        {/* Ring seam between silver/gold */}
        <circle cx="50" cy="50" r="30.5" fill="none" stroke="#5c4713" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Glossy highlight sweep over whole coin */}
      <ellipse cx="35" cy="28" rx="26" ry="12" fill="#ffffff" opacity="0.18" transform="rotate(-20 35 28)" />
    </svg>
  );
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
    const clampedX = Math.max(0, Math.min(newX, maxDrag));
    setCurrentX(clampedX);
  };

  const handlePointerUp = () => {
    if (!isDragging || isVerified) return;
    setIsDragging(false);
    if (currentX >= maxDrag * 0.9) {
      setCurrentX(maxDrag);
      setIsVerified(true);
      onVerify(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
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
          ? 'Verification successful! You can now sign up.'
          : "Drag the Rafiki Coin into the target to verify you're human."}
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
            isVerified ? 'bg-emerald-500/10' : 'bg-purple-500/10'
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
          <div className="relative w-14 h-14 flex items-center justify-center">
            <RafikiCoin spinning={isDragging} />
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