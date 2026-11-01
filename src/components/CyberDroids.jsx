import React, { useState } from 'react'

// ============================================================================
// 1. CHILLING ROBOT (Unit 01: "CHILL-BOT") — For About Section
// ============================================================================
export function RoboChilling() {
  const [clicked, setClicked] = useState(false)

  return (
    <div
      onClick={() => setClicked(!clicked)}
      className="relative cursor-pointer group select-none flex items-center gap-3 p-3 cyber-card"
      style={{
        background: 'rgba(5, 12, 24, 0.7)',
        borderColor: 'rgba(0, 245, 255, 0.25)',
        backdropFilter: 'blur(8px)',
      }}
      title="Click to interact with Chill-Bot!"
    >
      {/* SVG Animation Container */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,245,255,0.4))' }}
        >
          <defs>
            <linearGradient id="chillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#091424" />
            </linearGradient>
            <linearGradient id="mugSteam" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hover Platform */}
          <g className="animate-hover-platform">
            <ellipse cx="70" cy="122" rx="42" ry="8" fill="rgba(0,245,255,0.12)" stroke="#00f5ff" strokeWidth="1" strokeDasharray="3 2" />
            <ellipse cx="70" cy="122" rx="20" ry="4" fill="rgba(0,245,255,0.3)" />
          </g>

          {/* Entire Bot Body (Floating & Chilling) */}
          <g className="animate-chill-float">
            {/* Antenna */}
            <line x1="70" y1="36" x2="70" y2="24" stroke="#00f5ff" strokeWidth="2" />
            <circle cx="70" cy="22" r="3.5" fill="#39ff14" className="animate-antenna-pulse" />

            {/* Head */}
            <rect x="52" y="36" width="36" height="26" rx="6" fill="#0d1e35" stroke="#00f5ff" strokeWidth="1.5" />
            
            {/* Sunglasses / Cyber Visor */}
            <path d="M56 46 Q70 49 84 46 L82 54 Q70 56 58 54 Z" fill="#ff006e" />
            <line x1="57" y1="48" x2="83" y2="48" stroke="#ffe600" strokeWidth="1" opacity="0.8" />

            {/* Chill Smile */}
            <path d="M64 57 Q70 61 76 57" stroke="#00f5ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Neck */}
            <rect x="66" y="62" width="8" height="4" fill="#00f5ff" opacity="0.6" />

            {/* Torso */}
            <rect x="50" y="66" width="40" height="34" rx="5" fill="#091424" stroke="#00f5ff" strokeWidth="1.5" />
            
            {/* Power Core */}
            <circle cx="70" cy="80" r="5" fill="#00f5ff" className="animate-pulse" />
            <rect x="55" y="89" width="30" height="3" fill="rgba(0,245,255,0.2)" rx="1.5" />
            <rect x="55" y="89" width="22" height="3" fill="#39ff14" rx="1.5" />

            {/* Left Arm holding Energy Coffee Mug */}
            <path d="M50 72 L36 78 L38 88" stroke="#00f5ff" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Mug */}
            <rect x="30" y="80" width="13" height="15" rx="2" fill="#ff006e" stroke="#ffe600" strokeWidth="1" />
            <path d="M43 83 Q47 87 43 91" stroke="#ffe600" strokeWidth="1" fill="none" />
            <text x="33" y="91" fontSize="7" fill="#fff" fontFamily="monospace">⚡</text>

            {/* Rising Steam */}
            <path d="M34 78 Q32 72 35 68 Q38 64 36 60" stroke="url(#mugSteam)" strokeWidth="1.5" fill="none" className="animate-steam-1" />
            <path d="M39 77 Q42 71 39 67 Q36 63 40 59" stroke="url(#mugSteam)" strokeWidth="1.5" fill="none" className="animate-steam-2" />

            {/* Right Arm - Relaxed arm on knee */}
            <path d="M90 72 L102 78 L98 88" stroke="#00f5ff" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Crossed Relaxed Legs */}
            <path d="M56 100 L50 110 L68 114" stroke="#00f5ff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M84 100 L90 110 L72 114" stroke="#00f5ff" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-foot-tap" />
          </g>

          {/* Floating musical note / chill particle */}
          <text x="96" y="44" fill="#00f5ff" fontSize="11" opacity="0.8" className="animate-float-note">
            ~♪
          </text>
        </svg>
      </div>

      {/* Info Badge */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green pulse-glow" />
          <span>UNIT_01 // CHILL_BOT</span>
        </div>
        <p className="font-mono text-xs text-text-secondary mt-0.5">
          {clicked ? '>> "Zero stress. All code."' : '>> Mode: Low-Latency Chillin\''}
        </p>
        <span className="font-mono text-[10px] text-text-dim">Battery: 99% · ☕ Charged</span>
      </div>
    </div>
  )
}

// ============================================================================
// 2. PARTYING / DANCING ROBOT (Unit 02: "RAVE-BOT") — For Skills Section
// ============================================================================
export function RoboPartying() {
  const [grooving, setGrooving] = useState(true)

  return (
    <div
      onClick={() => setGrooving(!grooving)}
      className="relative cursor-pointer group select-none flex items-center gap-3 p-3 cyber-card"
      style={{
        background: 'rgba(5, 12, 24, 0.7)',
        borderColor: 'rgba(255, 0, 110, 0.3)',
        backdropFilter: 'blur(8px)',
      }}
      title="Click to toggle hyper-rave mode!"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,110,0.45))' }}
        >
          {/* Audio Equalizer bars behind bot */}
          <g opacity="0.4" transform="translate(25, 30)">
            <rect x="0" y="20" width="4" height="35" fill="#ff006e" className="animate-eq-1" />
            <rect x="8" y="10" width="4" height="45" fill="#00f5ff" className="animate-eq-2" />
            <rect x="16" y="25" width="4" height="30" fill="#ffe600" className="animate-eq-3" />
            <rect x="74" y="15" width="4" height="40" fill="#39ff14" className="animate-eq-2" />
            <rect x="82" y="5" width="4" height="50" fill="#ff006e" className="animate-eq-1" />
            <rect x="90" y="22" width="4" height="33" fill="#bf5fff" className="animate-eq-3" />
          </g>

          {/* Dancing Bot Container */}
          <g className={grooving ? 'animate-dance-groove' : ''}>
            {/* Giant Headphones Arch */}
            <path d="M42 46 C42 18, 98 18, 98 46" fill="none" stroke="#ffe600" strokeWidth="3.5" strokeLinecap="round" />
            {/* Earcups */}
            <rect x="36" y="38" width="9" height="18" rx="3" fill="#ff006e" stroke="#ffe600" strokeWidth="1" className="animate-pulse" />
            <rect x="95" y="38" width="9" height="18" rx="3" fill="#ff006e" stroke="#ffe600" strokeWidth="1" className="animate-pulse" />

            {/* Head (bobbing) */}
            <rect x="49" y="34" width="42" height="30" rx="7" fill="#0d1e35" stroke="#ff006e" strokeWidth="2" />
            
            {/* Disco Visor Eyes */}
            <rect x="55" y="42" width="30" height="11" rx="3" fill="#020408" stroke="#00f5ff" strokeWidth="1" />
            <circle cx="63" cy="47" r="2.5" fill="#39ff14" className="animate-ping" />
            <circle cx="77" cy="47" r="2.5" fill="#39ff14" className="animate-ping" />

            {/* Big Smile */}
            <path d="M62 55 Q70 61 78 55" stroke="#ffe600" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Neck */}
            <rect x="66" y="64" width="8" height="5" fill="#ff006e" />

            {/* Body */}
            <rect x="48" y="69" width="44" height="32" rx="6" fill="#091424" stroke="#ff006e" strokeWidth="1.5" />

            {/* Disco Beat Reactor on Chest */}
            <circle cx="70" cy="83" r="6" fill="#ffe600" stroke="#ff006e" strokeWidth="1.5" className="animate-pulse" />
            <path d="M70 79 L70 87 M66 83 L74 83" stroke="#020408" strokeWidth="1.5" />

            {/* Left Arm Wave */}
            <path d="M48 74 L32 68 L26 50" stroke="#00f5ff" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-arm-wave-left" />
            <circle cx="26" cy="50" r="3" fill="#ff006e" />

            {/* Right Arm Wave */}
            <path d="M92 74 L108 68 L114 50" stroke="#00f5ff" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-arm-wave-right" />
            <circle cx="114" cy="50" r="3" fill="#ff006e" />

            {/* Dancing Legs */}
            <path d="M57 101 L50 114 L42 118" stroke="#ff006e" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-leg-left" />
            <path d="M83 101 L90 114 L98 118" stroke="#ff006e" strokeWidth="3.5" strokeLinecap="round" fill="none" className="animate-leg-right" />
          </g>

          {/* Floating Party Sparkles */}
          <text x="24" y="32" fill="#ffe600" fontSize="12" className="animate-sparkle-1">✦</text>
          <text x="110" y="34" fill="#00f5ff" fontSize="10" className="animate-sparkle-2">♫</text>
          <text x="66" y="20" fill="#ff006e" fontSize="11" className="animate-sparkle-3">★</text>
        </svg>
      </div>

      <div className="hidden sm:block">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-magenta">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta pulse-glow" />
          <span>UNIT_02 // RAVE_BOT</span>
        </div>
        <p className="font-mono text-xs text-text-secondary mt-0.5">
          {">> Mode: Party_Overclock (140 BPM)"}
        </p>
        <span className="font-mono text-[10px] text-neon-yellow">Equalizer: Max Sync · 🎧 Jamming</span>
      </div>
    </div>
  )
}

// ============================================================================
// 3. FLYING SCOUT DRONE (Unit 03: "FLY-SCOUT") — For Projects Section
// ============================================================================
export function RoboFlying() {
  const [scanning, setScanning] = useState(true)

  return (
    <div
      onClick={() => setScanning(!scanning)}
      className="relative cursor-pointer group select-none flex items-center gap-3 p-3 cyber-card"
      style={{
        background: 'rgba(5, 12, 24, 0.7)',
        borderColor: 'rgba(57, 255, 20, 0.3)',
        backdropFilter: 'blur(8px)',
      }}
      title="Click to toggle scanner laser!"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.4))' }}
        >
          <defs>
            <linearGradient id="scannerBeam" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#39ff14" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="jetFire" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="50%" stopColor="#ff006e" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Sweeping Scanner Beam */}
          {scanning && (
            <polygon
              points="70,80 30,135 110,135"
              fill="url(#scannerBeam)"
              className="animate-scanner-sweep"
            />
          )}

          {/* Entire Flying Drone with Hover Motion */}
          <g className="animate-drone-flight">
            {/* Radar Dish spinning */}
            <ellipse cx="70" cy="28" rx="14" ry="4" fill="none" stroke="#39ff14" strokeWidth="1.5" className="animate-radar-spin" />
            <line x1="70" y1="28" x2="70" y2="20" stroke="#39ff14" strokeWidth="1.5" />
            <circle cx="70" cy="19" r="2.5" fill="#ff006e" className="animate-ping" />

            {/* Left & Right Propeller Rotors */}
            <line x1="28" y1="46" x2="52" y2="46" stroke="#00f5ff" strokeWidth="2" />
            <ellipse cx="40" cy="46" rx="14" ry="2.5" fill="rgba(0,245,255,0.4)" stroke="#00f5ff" strokeWidth="1" className="animate-spin-rotor" />
            
            <line x1="88" y1="46" x2="112" y2="46" stroke="#00f5ff" strokeWidth="2" />
            <ellipse cx="100" cy="46" rx="14" ry="2.5" fill="rgba(0,245,255,0.4)" stroke="#00f5ff" strokeWidth="1" className="animate-spin-rotor" />

            {/* Drone Chassis Shell */}
            <path d="M48 50 L92 50 L84 76 L56 76 Z" fill="#0d1e35" stroke="#39ff14" strokeWidth="1.5" />

            {/* Forward Cockpit Eye / Visor */}
            <rect x="54" y="56" width="32" height="12" rx="3" fill="#020408" stroke="#00f5ff" strokeWidth="1.5" />
            {/* Laser scanning eye line */}
            <line x1="58" y1="62" x2="82" y2="62" stroke="#39ff14" strokeWidth="2.5" className="animate-scanner-eye" />

            {/* Thruster pods (Left & Right) */}
            <rect x="42" y="72" width="10" height="10" rx="2" fill="#091424" stroke="#00f5ff" strokeWidth="1" />
            <rect x="88" y="72" width="10" height="10" rx="2" fill="#091424" stroke="#00f5ff" strokeWidth="1" />

            {/* Jet Exhaust Flames */}
            <polygon points="44,82 50,82 47,100" fill="url(#jetFire)" className="animate-thruster-flame" />
            <polygon points="90,82 96,82 93,100" fill="url(#jetFire)" className="animate-thruster-flame" />

            {/* Sensor Array Pod on bottom center */}
            <circle cx="70" cy="78" r="4.5" fill="#39ff14" stroke="#020408" strokeWidth="1" />
          </g>

          {/* Telemetry Target reticle */}
          <circle cx="70" cy="130" r="8" fill="none" stroke="#39ff14" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" />
        </svg>
      </div>

      <div className="hidden sm:block">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-green">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green pulse-glow" />
          <span>UNIT_03 // FLY_SCOUT</span>
        </div>
        <p className="font-mono text-xs text-text-secondary mt-0.5">
          {">> Status: Aerial Recon Active"}
        </p>
        <span className="font-mono text-[10px] text-neon-cyan">Scanning: Git Repos & Stack · 🛸</span>
      </div>
    </div>
  )
}

// ============================================================================
// 4. MECHA COMBAT WARRIOR (Unit 04: "COMBAT-MECH") — For Journey / Git Log
// ============================================================================
export function RoboFighting() {
  const [strike, setStrike] = useState(false)

  return (
    <div
      onClick={() => setStrike(!strike)}
      className="relative cursor-pointer group select-none flex items-center gap-3 p-3 cyber-card"
      style={{
        background: 'rgba(5, 12, 24, 0.7)',
        borderColor: 'rgba(191, 95, 255, 0.35)',
        backdropFilter: 'blur(8px)',
      }}
      title="Click to trigger energy blade strike!"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full overflow-visible"
          style={{ filter: 'drop-shadow(0 0 10px rgba(191,95,255,0.45))' }}
        >
          <defs>
            <linearGradient id="bladeGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#bf5fff" />
              <stop offset="50%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <radialGradient id="shieldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#bf5fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Energy Shield Pulse in Background */}
          <circle cx="70" cy="72" r="44" fill="url(#shieldGrad)" stroke="#00f5ff" strokeWidth="0.8" strokeDasharray="6 3" className="animate-shield-rotate" />

          {/* Mecha Warrior Body Container */}
          <g className={strike ? 'animate-strike' : 'animate-combat-idle'}>
            {/* Horns / Antenna Crest */}
            <path d="M52 32 L44 20 L58 26 Z" fill="#bf5fff" />
            <path d="M88 32 L96 20 L82 26 Z" fill="#bf5fff" />

            {/* Armored Head */}
            <polygon points="56,30 84,30 90,52 70,62 50,52" fill="#0d1e35" stroke="#bf5fff" strokeWidth="1.5" />
            
            {/* Combat Visor (Glowing red/cyan eye slit) */}
            <polygon points="60,42 80,42 76,46 64,46" fill="#ff006e" className="animate-pulse" />

            {/* Shoulder Pauldrons */}
            <polygon points="46,58 32,64 42,76 52,66" fill="#091424" stroke="#00f5ff" strokeWidth="1.5" />
            <polygon points="94,58 108,64 98,76 88,66" fill="#091424" stroke="#00f5ff" strokeWidth="1.5" />

            {/* Chest Plate with Core */}
            <polygon points="52,66 88,66 82,94 58,94" fill="#091424" stroke="#bf5fff" strokeWidth="1.5" />
            <polygon points="70,72 78,80 70,88 62,80" fill="#00f5ff" className="animate-pulse" />

            {/* LEFT PLASMA KATANA (Vertical Guard) */}
            <g className="animate-blade-left">
              {/* Hilt */}
              <rect x="25" y="65" width="4" height="14" rx="1" fill="#ffe600" />
              {/* Glowing Energy Blade */}
              <line x1="27" y1="65" x2="27" y2="12" stroke="url(#bladeGlow)" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="27" y1="65" x2="27" y2="12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* RIGHT PLASMA KATANA (Angled Strike) */}
            <g className="animate-blade-right">
              {/* Hilt */}
              <rect x="110" y="65" width="4" height="14" rx="1" fill="#ffe600" />
              {/* Glowing Energy Blade */}
              <line x1="112" y1="65" x2="128" y2="16" stroke="url(#bladeGlow)" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="112" y1="65" x2="128" y2="16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Combat Legs (Broad Stance) */}
            <path d="M60 94 L50 114 L42 122" stroke="#bf5fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M80 94 L90 114 L98 122" stroke="#bf5fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Spark Particles */}
          <circle cx="27" cy="18" r="1.5" fill="#fff" className="animate-ping" />
          <circle cx="126" cy="22" r="1.5" fill="#fff" className="animate-ping" />
        </svg>
      </div>

      <div className="hidden sm:block">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neon-violet">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-violet pulse-glow" />
          <span>UNIT_04 // COMBAT_MECH</span>
        </div>
        <p className="font-mono text-xs text-text-secondary mt-0.5">
          {">> Dual Plasma Blades: Armed"}
        </p>
        <span className="font-mono text-[10px] text-neon-cyan">Shields: 100% · ⚔️ Battle Ready</span>
      </div>
    </div>
  )
}
