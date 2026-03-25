import { useState, useEffect, useRef } from 'react';

export default function CallToAction() {
  const [donors, setDonors] = useState(0);
  const [aid, setAid] = useState(0);
  const [support, setSupport] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const donorsTarget = 2500;
    const aidTarget = 300;
    const supportTarget = 24;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDonors(Math.floor(donorsTarget * ease));
      setAid(Math.floor(aidTarget * ease));
      setSupport(Math.floor(supportTarget * ease));
      if (currentStep >= steps) {
        setDonors(donorsTarget);
        setAid(aidTarget);
        setSupport(supportTarget);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isVisible]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <div
        className='cta-wrapper'
        ref={cardRef}
        onMouseMove={handleMouseMove}
      >
        {/* Mouse-following ambient glow */}
        <div
          className='mouse-glow'
          style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
        />

        {/* Dot-grid texture overlay */}
        <div className='dot-grid' />

        {/* Top shimmer bar */}
        <div className='shimmer-bar' />

        <div className={`cta-inner ${isVisible ? 'visible' : ''}`}>

          {/* ── LEFT: Image Column ── */}
          <div className='image-col'>
            <div className='image-ring-wrapper'>
              <div className='orbit-ring'>
                <div className='orbit-dot' />
              </div>
              <div className='image-halo' />
              <img
                src='/images/profile.png'
                alt='Bipader Bondhu'
                className='profile-img'
              />
            </div>

            <div className='live-badge'>
              <span className='live-dot' />
              <span>Actively Serving</span>
            </div>
          </div>

          {/* ── RIGHT: Content Column ── */}
          <div className='content-col'>

            <div className='heading-block'>
              <p className='eyebrow'>Narayan Pur Welfare Society</p>
              <h2 className='main-heading'>
                Join Our Mission
                <span className='heading-accent'> of Hope &amp; Humanity</span>
              </h2>
              <p className='subtext'>
                Discover our impactful initiatives in social welfare, emergency relief,
                and community empowerment — standing beside people when it matters most.
              </p>
            </div>

            {/* Stats */}
            <div className='stats-row'>
              <div className='stat-card'>
                <div className='stat-icon'>🩸</div>
                <div className='stat-number stat-purple'>{donors.toLocaleString()}+</div>
                <div className='stat-label'>Blood Donors</div>
              </div>
              <div className='stat-divider' />
              <div className='stat-card'>
                <div className='stat-icon'>💰</div>
                <div className='stat-number stat-rose'>{aid}+</div>
                <div className='stat-label'>Financial Aid</div>
              </div>
              <div className='stat-divider' />
              <div className='stat-card'>
                <div className='stat-icon'>🕐</div>
                <div className='stat-number stat-indigo'>{support}/7</div>
                <div className='stat-label'>Support</div>
              </div>
            </div>

            {/* Buttons */}
            <div className='btn-row'>
              <a href='/search' className='btn-primary'>
                <span>Discover Our Impact</span>
                <svg width='15' height='15' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                </svg>
                <div className='btn-shine' />
              </a>
              <a href='/about' className='btn-secondary'>
                <span>Learn Our Story</span>
                <svg width='15' height='15' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom registration tag */}
        <div className='bottom-tag'>
          🌟 Govt. Registered NGO &nbsp;·&nbsp; Reg. No: S0042589 of 2024–2025
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        /* ─────────────────────────────────────────
           WRAPPER
        ───────────────────────────────────────── */
        .cta-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          margin: 24px auto;
          max-width: 860px;
          background: linear-gradient(135deg, #0f0c29 0%, #1b1040 45%, #24243e 100%);
          border: 1px solid rgba(139, 92, 246, 0.22);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 32px 64px -12px rgba(0, 0, 0, 0.65),
            0 0 80px -20px rgba(139, 92, 246, 0.28);
          font-family: 'DM Sans', sans-serif;
          transition: box-shadow 0.4s ease;
        }

        .cta-wrapper:hover {
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.2),
            0 40px 80px -12px rgba(0,0,0,0.7),
            0 0 100px -15px rgba(139,92,246,0.4);
        }

        /* ─────────────────────────────────────────
           MOUSE GLOW
        ───────────────────────────────────────── */
        .mouse-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 65%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: left 0.08s linear, top 0.08s linear;
          z-index: 0;
        }

        /* ─────────────────────────────────────────
           DOT GRID TEXTURE
        ───────────────────────────────────────── */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
          z-index: 0;
        }

        /* ─────────────────────────────────────────
           TOP SHIMMER BAR
        ───────────────────────────────────────── */
        .shimmer-bar {
          position: relative;
          z-index: 1;
          height: 3px;
          background: linear-gradient(90deg, #7c3aed, #ec4899, #f97316, #ec4899, #7c3aed);
          background-size: 300% auto;
          animation: bar-move 4s linear infinite;
        }

        @keyframes bar-move {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }

        /* ─────────────────────────────────────────
           INNER LAYOUT
        ───────────────────────────────────────── */
        .cta-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 32px 24px 22px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .cta-inner.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 768px) {
          .cta-inner {
            flex-direction: row;
            align-items: center;
            padding: 40px 44px 30px;
            gap: 40px;
          }
        }

        /* ─────────────────────────────────────────
           IMAGE COLUMN
        ───────────────────────────────────────── */
        .image-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .image-ring-wrapper {
          position: relative;
          width: 136px;
          height: 136px;
        }

        @media (min-width: 768px) {
          .image-ring-wrapper { width: 148px; height: 148px; }
        }

        /* Orbiting dashed ring */
        .orbit-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1.5px dashed rgba(167,139,250,0.3);
          animation: spin-slow 12s linear infinite;
        }

        .orbit-dot {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 9px;
          height: 9px;
          background: linear-gradient(135deg, #a78bfa, #f472b6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(167,139,250,0.9);
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Conic gradient halo */
        .image-halo {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #7c3aed, #ec4899, #f97316, #7c3aed);
          animation: spin-slow 5s linear infinite;
          z-index: 0;
        }

        .profile-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #110e2d;
          box-shadow: 0 0 28px rgba(124,58,237,0.45), 0 8px 24px rgba(0,0,0,0.5);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        .cta-wrapper:hover .profile-img {
          transform: scale(1.06) rotate(2deg);
        }

        /* Live badge */
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 600;
          color: #c4b5fd;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 7px rgba(34,197,94,0.8);
          animation: pulse-dot 1.6s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.5); }
        }

        /* ─────────────────────────────────────────
           CONTENT COLUMN
        ───────────────────────────────────────── */
        .content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .content-col { text-align: left; }
        }

        /* Heading */
        .heading-block { display: flex; flex-direction: column; gap: 8px; }

        .eyebrow {
          margin: 0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        .main-heading {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(20px, 3.5vw, 28px);
          font-weight: 900;
          line-height: 1.2;
          color: #f5f3ff;
        }

        .heading-accent {
          background: linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-flow 4s ease infinite;
        }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% center; }
          50%       { background-position: 200% center; }
        }

        .subtext {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(196,181,253,0.65);
          max-width: 440px;
        }

        /* ─────────────────────────────────────────
           STATS
        ───────────────────────────────────────── */
        .stats-row {
          display: flex;
          align-items: stretch;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
        }

        .stat-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 14px 8px;
          transition: background 0.25s ease;
          cursor: default;
        }

        .stat-card:hover { background: rgba(255,255,255,0.05); }

        .stat-icon { font-size: 17px; line-height: 1; }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }

        .stat-purple { color: #a78bfa; }
        .stat-rose   { color: #fb7185; }
        .stat-indigo { color: #818cf8; }

        .stat-label {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(196,181,253,0.45);
        }

        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.07);
          flex-shrink: 0;
          align-self: stretch;
        }

        /* ─────────────────────────────────────────
           BUTTONS
        ───────────────────────────────────────── */
        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .btn-row { justify-content: flex-start; }
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 100px;
          background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 22px rgba(124,58,237,0.45), inset 0 0 0 1px rgba(255,255,255,0.12);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(124,58,237,0.55), inset 0 0 0 1px rgba(255,255,255,0.18);
          color: #fff;
          text-decoration: none;
        }

        .btn-primary:active { transform: scale(0.97); }

        .btn-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-18deg);
          animation: shine-move 3.5s ease-in-out infinite;
        }

        @keyframes shine-move {
          0%       { left: -100%; }
          35%, 100% { left: 160%; }
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 100px;
          background: transparent;
          color: #c4b5fd;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border: 1.5px solid rgba(167,139,250,0.35);
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .btn-secondary:hover {
          background: rgba(167,139,250,0.1);
          border-color: rgba(167,139,250,0.65);
          color: #e9d5ff;
          transform: translateY(-2px);
          text-decoration: none;
        }

        /* ─────────────────────────────────────────
           BOTTOM TAG
        ───────────────────────────────────────── */
        .bottom-tag {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 10px 20px 14px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(167,139,250,0.38);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </>
  );
}