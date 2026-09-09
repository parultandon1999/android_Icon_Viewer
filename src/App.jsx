import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import {
  Crosshair,
  Sliders,
  Code2,
  Download,
  Copy,
  Check,
  RotateCw,
  Eye,
  EyeOff,
  Smartphone,
  Zap,
  Terminal,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Lock,
  Cpu,
  Compass,
  Layers,
  Box,
  Maximize,
  Grid,
  Volume2,
  VolumeX,
  Wrench,
  Share2,
  AlertCircle,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Radio,
  Activity,
  Play,
  Square,
  Bookmark,
  Trash2,
  Scissors,
  Flame,
  Watch,
  Binary,
  ArrowUpRight,
  ChevronDown,
  Monitor,
  Undo2,
  Redo2,
  Move,
  Magnet,
  Upload,
  Camera,
  FileCode,
  Split,
  Disc,
  Scan,
  Orbit,
  Settings,
  Key,
  ShieldCheck,
  ShieldAlert,
  WifiOff,
  HelpCircle,
  ExternalLink,
  Power
} from 'lucide-react';

class TacticalAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(frequency = 880, duration = 0.04, type = 'sine', decay = 0.001) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, frequency * 0.4), this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(decay, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(980, 0.025, 'sine');
  }

  playChirp() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playBootTone(freq = 440) {
    this.playTone(freq, 0.05, 'triangle', 0.01);
  }

  playPurge() {
    this.playTone(280, 0.07, 'sawtooth', 0.0001);
  }

  playLock() {
    this.playTone(1350, 0.045, 'square');
  }

  playSnap() {
    this.playTone(1800, 0.018, 'sine');
  }

  playAlert() {
    this.playTone(320, 0.12, 'sawtooth', 0.01);
  }
}

const audioEngine = new TacticalAudioEngine();

const triggerHaptic = (pattern = 12, enabled = true) => {
  if (!enabled) return;
  if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
};

const PRESET_ICONS = [
  {
    id: 'tactical-crosshair',
    name: 'Reticle MK-IV',
    category: 'Targeting',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9" />
  <line x1="12" y1="3" x2="12" y2="7" />
  <line x1="12" y1="17" x2="12" y2="21" />
  <line x1="3" y1="12" x2="7" y2="12" />
  <line x1="17" y1="12" x2="21" y2="12" />
  <circle cx="12" cy="12" r="2" />
</svg>`
  },
  {
    id: 'stealth-shield',
    name: 'Aegis Sentinel',
    category: 'Ballistic',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" />
  <path d="M12 6v12" />
  <path d="M8 10h8" />
  <path d="M9 14h6" />
</svg>`
  },
  {
    id: 'radar-sweep',
    name: 'Phased Array',
    category: 'Telemetry',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2a10 10 0 1 0 10 10" />
  <path d="M12 6a6 6 0 1 0 6 6" />
  <line x1="12" y1="12" x2="19" y2="5" />
  <circle cx="12" cy="12" r="1.5" />
</svg>`
  },
  {
    id: 'quantum-core',
    name: 'Kinetic Torus',
    category: 'Propulsion',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 2 7 12 12 22 7 12 2" />
  <polyline points="2 17 12 22 22 17" />
  <polyline points="2 12 12 17 22 12" />
  <circle cx="12" cy="12" r="1.5" />
</svg>`
  },
  {
    id: 'neural-processor',
    name: 'Hex Core 88',
    category: 'Avionics',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="1" />
  <rect x="9" y="9" width="6" height="6" />
  <line x1="9" y1="1" x2="9" y2="4" />
  <line x1="15" y1="1" x2="15" y2="4" />
  <line x1="9" y1="20" x2="9" y2="23" />
  <line x1="15" y1="20" x2="15" y2="23" />
  <line x1="20" y1="9" x2="23" y2="9" />
  <line x1="20" y1="14" x2="23" y2="14" />
  <line x1="1" y1="9" x2="4" y2="9" />
  <line x1="1" y1="14" x2="4" y2="14" />
</svg>`
  },
  {
    id: 'biohazard-cbrn',
    name: 'CBRN Safe',
    category: 'Protocol',
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="2.5" />
  <path d="M12 2a5 5 0 0 0-4.8 3.6A5 5 0 0 0 5 10.5a5 5 0 0 0 4.2 4.9" />
  <path d="M19 10.5a5 5 0 0 0-2.2-4.9A5 5 0 0 0 12 2" />
  <path d="M9.2 15.4a5 5 0 0 0 5.6 0" />
  <path d="M12 18.5a5 5 0 0 0 4.8-3.1" />
  <line x1="12" y1="12" x2="12" y2="15" />
</svg>`
  }
];

const TACTICAL_PALETTES = [
  { name: 'Titanium Ice', hex: '#00E5FF', glow: 'rgba(0, 229, 255, 0.45)', code: 'CYAN-01' },
  { name: 'Hazard Amber', hex: '#FFB000', glow: 'rgba(255, 176, 0, 0.45)', code: 'AMB-02' },
  { name: 'Phosphor Green', hex: '#00FF66', glow: 'rgba(0, 255, 102, 0.45)', code: 'RAD-03' },
  { name: 'Critical Red', hex: '#FF3344', glow: 'rgba(255, 51, 68, 0.45)', code: 'CRIT-04' },
  { name: 'Machined Steel', hex: '#94A3B8', glow: 'rgba(148, 163, 184, 0.35)', code: 'MET-05' },
  { name: 'Polar White', hex: '#F8FAFC', glow: 'rgba(248, 250, 252, 0.3)', code: 'WHT-06' }
];

const HOUSING_BEZELS = [
  { id: 'raw', name: 'ZERO MOUNT', darkClass: 'bg-transparent border-transparent', lightClass: 'bg-transparent border-transparent' },
  { id: 'chamfer', name: 'BILLET CHASSIS', darkClass: 'bg-[#0B0D12] border border-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.8)]', lightClass: 'bg-[#FFFFFF] border border-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.06)]' },
  { id: 'hud-tile', name: 'MIL-SPEC RIVET', darkClass: 'bg-[#07090C] border border-zinc-700/80 shadow-2xl relative', lightClass: 'bg-[#F4F6F9] border border-zinc-400/80 shadow-md relative' },
  { id: 'circular-dial', name: 'DIAL COMPASS', darkClass: 'bg-gradient-to-b from-[#11141B] to-[#080A0E] border border-zinc-700 rounded-full shadow-2xl', lightClass: 'bg-gradient-to-b from-[#FFFFFF] to-[#E4E8EE] border border-zinc-300 rounded-full shadow-lg' }
];

const AI_PROMPT_CHIPS = [
  'Stealth missile UAV',
  'Nuclear pressure valve',
  'Biometric Iris Lock',
  'Satellite Array',
  'EMP Flux Coil',
  'Kinetic Railgun'
];

const BOOT_LOG_STEPS = [
  { text: 'MOUNTING VECTOR CAD KERNEL [MK8]', pct: 15, tone: 440 },
  { text: 'CALIBRATING 24x24 SUB-PIXEL GRIDS', pct: 35, tone: 580 },
  { text: 'INITIALIZING SYNTHETIC AUDIO & HAPTICS', pct: 60, tone: 720 },
  { text: 'WARMING GEMINI NEURAL GATEWAY LINK', pct: 85, tone: 960 },
  { text: 'CAD-MK8 OPERATIONAL // SYSTEMS ENGAGED', pct: 100, tone: 1200 }
];

// Enhanced Multi-Stage Diagnostic Parser with Error Categorization
const parseCodeToSvgPayload = (rawCode, accentColor = '#FF3344', dualColorMode = false) => {
  if (!rawCode || typeof rawCode !== 'string' || !rawCode.trim()) {
    return {
      isValid: false,
      viewBox: '0 0 24 24',
      innerSvg: '',
      errorType: 'EMPTY_BUFFER',
      errorMessage: 'The vector buffer contains no code or is empty.',
      suggestedFix: 'Type or paste an SVG element or load a preset loadout.',
      pathCount: 0,
      interactiveNodes: [],
      rawByteSize: 0,
      elementStats: {}
    };
  }

  const cleanCode = rawCode.trim();

  // Check 1: Detected HTML container tags without vector tags
  const containsHtmlOnly = /<(div|button|span|section|header|footer|p|h1|h2|input)[\s>]/i.test(cleanCode) && !/<svg[\s>]/i.test(cleanCode);
  if (containsHtmlOnly) {
    return {
      isValid: false,
      viewBox: '0 0 24 24',
      innerSvg: '',
      errorType: 'HTML_DETECTED',
      errorMessage: 'Standard HTML components detected (div/button) with no <svg> root element.',
      suggestedFix: 'Extract vector paths or tap "AUTO-REPAIR" to encapsulate in an SVG container.',
      pathCount: 0,
      interactiveNodes: [],
      rawByteSize: new Blob([cleanCode]).size,
      elementStats: {}
    };
  }

  // Check 2: Pure plain text without XML/HTML brackets
  if (!cleanCode.includes('<') || !cleanCode.includes('>')) {
    return {
      isValid: false,
      viewBox: '0 0 24 24',
      innerSvg: '',
      errorType: 'PLAIN_TEXT',
      errorMessage: 'Buffer contains plain text without XML/SVG markup.',
      suggestedFix: 'Paste valid SVG icon code, or describe this in the "AI SYNTH" generator.',
      pathCount: 0,
      interactiveNodes: [],
      rawByteSize: new Blob([cleanCode]).size,
      elementStats: {}
    };
  }

  try {
    const svgMatch = cleanCode.match(/<svg[\s\S]*?<\/svg>/i);
    const targetString = svgMatch ? svgMatch[0] : cleanCode;

    const parser = new DOMParser();
    const doc = parser.parseFromString(targetString, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');

    let svgElement = doc.querySelector('svg');

    // Fallback pass: HTML5 tolerant parser if strict XML fails
    if (parserError || !svgElement) {
      const htmlDoc = parser.parseFromString(targetString, 'text/html');
      svgElement = htmlDoc.querySelector('svg');
    }

    if (!svgElement) {
      const hasNakedVectors = /<(path|circle|line|rect|polyline|polygon)[\s>]/i.test(cleanCode);
      return {
        isValid: false,
        viewBox: '0 0 24 24',
        innerSvg: '',
        errorType: hasNakedVectors ? 'NAKED_VECTORS' : 'NO_SVG_ROOT',
        errorMessage: hasNakedVectors
          ? 'Found vector path elements, but missing outer <svg viewBox="0 0 24 24"> container.'
          : 'Missing <svg> root container.',
        suggestedFix: hasNakedVectors
          ? 'Tap "REPAIR" to automatically wrap paths in a 24x24 SVG container.'
          : 'Ensure code starts with <svg viewBox="0 0 24 24"> and ends with </svg>.',
        pathCount: 0,
        interactiveNodes: [],
        rawByteSize: new Blob([cleanCode]).size,
        elementStats: {}
      };
    }

    const interactiveNodes = [];

    // Tag and extract nodes from circles
    svgElement.querySelectorAll('circle').forEach((c, idx) => {
      const cx = parseFloat(c.getAttribute('cx') || 12);
      const cy = parseFloat(c.getAttribute('cy') || 12);
      if (dualColorMode && idx % 2 === 1) {
        c.setAttribute('stroke', accentColor);
      }
      interactiveNodes.push({
        id: `circle-${idx}`,
        type: 'circle',
        elemIndex: idx,
        targetAttrX: 'cx',
        targetAttrY: 'cy',
        x: cx,
        y: cy
      });
    });

    // Tag and extract nodes from lines
    svgElement.querySelectorAll('line').forEach((l, idx) => {
      const x1 = parseFloat(l.getAttribute('x1') || 0);
      const y1 = parseFloat(l.getAttribute('y1') || 0);
      const x2 = parseFloat(l.getAttribute('x2') || 0);
      const y2 = parseFloat(l.getAttribute('y2') || 0);
      if (dualColorMode && idx === 0) {
        l.setAttribute('stroke', accentColor);
      }
      interactiveNodes.push(
        { id: `line-${idx}-p1`, type: 'line', elemIndex: idx, targetAttrX: 'x1', targetAttrY: 'y1', x: x1, y: y1 },
        { id: `line-${idx}-p2`, type: 'line', elemIndex: idx, targetAttrX: 'x2', targetAttrY: 'y2', x: x2, y: y2 }
      );
    });

    // Tag and extract nodes from rects
    svgElement.querySelectorAll('rect').forEach((r, idx) => {
      const x = parseFloat(r.getAttribute('x') || 0);
      const y = parseFloat(r.getAttribute('y') || 0);
      if (dualColorMode && idx % 2 === 1) {
        r.setAttribute('stroke', accentColor);
      }
      interactiveNodes.push({
        id: `rect-${idx}-orig`,
        type: 'rect',
        elemIndex: idx,
        targetAttrX: 'x',
        targetAttrY: 'y',
        x,
        y
      });
    });

    // Extract path vertices from d attribute
    svgElement.querySelectorAll('path').forEach((p, idx) => {
      const d = p.getAttribute('d') || '';
      if (dualColorMode && idx === 1) {
        p.setAttribute('stroke', accentColor);
      }
      const matches = [...d.matchAll(/([MLCSTQAZ])\s*([-+]?\d*\.?\d+)[,\s]+([-+]?\d*\.?\d+)/gi)];
      matches.slice(0, 12).forEach((m, matchIdx) => {
        const x = parseFloat(m[2]);
        const y = parseFloat(m[3]);
        if (!isNaN(x) && !isNaN(y) && x >= 0 && x <= 24 && y >= 0 && y <= 24) {
          interactiveNodes.push({
            id: `path-${idx}-node-${matchIdx}`,
            type: 'path',
            elemIndex: idx,
            matchIndex: matchIdx,
            command: m[1],
            origX: x,
            origY: y,
            x,
            y
          });
        }
      });
    });

    const elementCount = svgElement.querySelectorAll('path, circle, line, rect, polyline, polygon, ellipse').length;

    if (elementCount === 0) {
      return {
        isValid: false,
        viewBox: svgElement.getAttribute('viewBox') || '0 0 24 24',
        innerSvg: '',
        errorType: 'EMPTY_SVG',
        errorMessage: 'Empty <svg> canvas: no vector paths, circles, or lines found inside container.',
        suggestedFix: 'Add graphic vector primitives like <path>, <circle>, or <line>.',
        pathCount: 0,
        interactiveNodes: [],
        rawByteSize: new Blob([cleanCode]).size,
        elementStats: {}
      };
    }

    return {
      isValid: true,
      viewBox: svgElement.getAttribute('viewBox') || '0 0 24 24',
      innerSvg: svgElement.innerHTML,
      errorType: null,
      errorMessage: null,
      suggestedFix: null,
      pathCount: elementCount,
      interactiveNodes: interactiveNodes.slice(0, 32),
      rawByteSize: new Blob([cleanCode]).size,
      elementStats: {
        paths: svgElement.querySelectorAll('path').length,
        circles: svgElement.querySelectorAll('circle').length,
        lines: svgElement.querySelectorAll('line').length,
        rects: svgElement.querySelectorAll('rect').length,
        polys: svgElement.querySelectorAll('polyline, polygon').length
      }
    };
  } catch (err) {
    return {
      isValid: false,
      viewBox: '0 0 24 24',
      innerSvg: '',
      errorType: 'PARSER_EXCEPTION',
      errorMessage: err.message || 'Critical XML / Vector syntax failure.',
      suggestedFix: 'Inspect XML syntax or tap "REPAIR" to reconstruct malformed tags.',
      pathCount: 0,
      interactiveNodes: [],
      rawByteSize: 0,
      elementStats: {}
    };
  }
};

export default function App() {
  // Splash & Boot Sequence Engine State
  const [isBooting, setIsBooting] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_disable_boot') !== 'true';
    }
    return true;
  });
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogIndex, setBootLogIndex] = useState(0);

  // Navigation & Core Environment
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'matrix' | 'synth' | 'telemetry' | 'deploy' | 'code'

  // Settings & Configuration State (Persisted in localStorage)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_gemini_api_key') || '';
    }
    return '';
  });
  const [soundMuted, setSoundMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_sound_muted') === 'true';
    }
    return false;
  });
  const [hapticsEnabled, setHapticsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_haptics_enabled') !== 'false';
    }
    return true;
  });
  const [autoRepairOnPaste, setAutoRepairOnPaste] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_auto_repair_paste') === 'true';
    }
    return true;
  });
  const [showKeylinesDefault, setShowKeylinesDefault] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_show_keylines') !== 'false';
    }
    return true;
  });
  const [disableBootOnLaunch, setDisableBootOnLaunch] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cad_disable_boot') === 'true';
    }
    return false;
  });

  // Test Connection Feedback inside Settings
  const [apiTestStatus, setApiTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [apiTestMsg, setApiTestMsg] = useState('');
  const [showApiKeyMask, setShowApiKeyMask] = useState(true);

  // Vector Geometry & Caliber Parameters
  const [code, setCode] = useState(PRESET_ICONS[0].code);
  const [iconTitle, setIconTitle] = useState('Reticle MK-IV');
  const [iconSize, setIconSize] = useState(88);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');
  const [strokeDash, setStrokeDash] = useState('solid');
  const [fillMode, setFillMode] = useState('none');
  const [colorIndex, setColorIndex] = useState(0);
  const [customColor, setCustomColor] = useState('#00E5FF');
  const [accentColor, setAccentColor] = useState('#FF3344');
  const [dualColorMode, setDualColorMode] = useState(false);
  const [badgeStyle, setBadgeStyle] = useState('hud-tile');
  const [canvasBg, setCanvasBg] = useState('metric');
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [isGlowActive, setIsGlowActive] = useState(true);

  // Viewport Zoom & Pan
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanActive, setIsPanActive] = useState(false);
  const isDraggingPanRef = useRef(false);
  const lastPanTouchRef = useRef({ x: 0, y: 0 });

  // On-Canvas Interactive CAD Node Dragging
  const [showWireNodes, setShowWireNodes] = useState(false);
  const [activeDraggingNode, setActiveDraggingNode] = useState(null);
  const [gridSnap, setGridSnap] = useState(1.0); // 1.0, 0.5, or 0 (free)

  // Undo / Redo Time Machine Stack
  const [history, setHistory] = useState([PRESET_ICONS[0].code]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Tactical Modes & Overlays
  const [animMode, setAnimMode] = useState('none');
  const [opticMode, setOpticMode] = useState('standard');
  const [showKeylines, setShowKeylines] = useState(showKeylinesDefault);
  const [showFlightHud, setShowFlightHud] = useState(false);
  const [cursorCoords, setCursorCoords] = useState({ x: 12, y: 12, isHovered: false });

  // Loadout Snapshot Arsenal (persisted in localStorage)
  const [snapshots, setSnapshots] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cad_snapshots_vault');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      { id: 1, label: 'SLOT-01', data: null },
      { id: 2, label: 'SLOT-02', data: null },
      { id: 3, label: 'SLOT-03', data: null },
      { id: 4, label: 'SLOT-04', data: null }
    ];
  });

  // AI Modal, Variations & Image-to-CAD
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiVariations, setAiVariations] = useState([]);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);
  const fileInputRef = useRef(null);

  // Timecode & Feedback
  const [zuluTime, setZuluTime] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedFormat, setCopiedFormat] = useState(null);

  // Refs
  const downloadCanvasRef = useRef(null);
  const canvasMountRef = useRef(null);

  // Splash Screen Orchestration Timer
  useEffect(() => {
    if (!isBooting) return;

    let currentStep = 0;
    const intervalTime = 380; // Total ~1.9s boot duration

    const bootTimer = setInterval(() => {
      if (currentStep < BOOT_LOG_STEPS.length) {
        setBootLogIndex(currentStep);
        setBootProgress(BOOT_LOG_STEPS[currentStep].pct);
        audioEngine.playBootTone(BOOT_LOG_STEPS[currentStep].tone);
        triggerHaptic(10, hapticsEnabled);
        currentStep++;
      } else {
        clearInterval(bootTimer);
        setTimeout(() => {
          setIsBooting(false);
          audioEngine.playLock();
          triggerHaptic([15, 30, 15], hapticsEnabled);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(bootTimer);
  }, [isBooting, hapticsEnabled]);

  const handleBypassBoot = () => {
    audioEngine.playClick();
    triggerHaptic(15, hapticsEnabled);
    setIsBooting(false);
  };

  const handleReplayBoot = () => {
    setBootProgress(0);
    setBootLogIndex(0);
    setIsBooting(true);
    setIsSettingsOpen(false);
  };

  // Sync settings changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cad_gemini_api_key', apiKey);
      localStorage.setItem('cad_sound_muted', soundMuted ? 'true' : 'false');
      localStorage.setItem('cad_haptics_enabled', hapticsEnabled ? 'true' : 'false');
      localStorage.setItem('cad_auto_repair_paste', autoRepairOnPaste ? 'true' : 'false');
      localStorage.setItem('cad_show_keylines', showKeylinesDefault ? 'true' : 'false');
      localStorage.setItem('cad_disable_boot', disableBootOnLaunch ? 'true' : 'false');
      localStorage.setItem('cad_snapshots_vault', JSON.stringify(snapshots));
    }
  }, [apiKey, soundMuted, hapticsEnabled, autoRepairOnPaste, showKeylinesDefault, disableBootOnLaunch, snapshots]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setZuluTime(`${h}:${m}:${s}Z`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    audioEngine.enabled = !soundMuted;
  }, [soundMuted]);

  const playFx = useCallback((type = 'click') => {
    if (type === 'chirp') audioEngine.playChirp();
    else if (type === 'purge') audioEngine.playPurge();
    else if (type === 'lock') audioEngine.playLock();
    else if (type === 'snap') audioEngine.playSnap();
    else if (type === 'alert') audioEngine.playAlert();
    else audioEngine.playClick();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    playFx('chirp');
    triggerHaptic(18, hapticsEnabled);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const pushCodeToHistory = useCallback((newCode) => {
    if (newCode === history[historyIndex]) return;
    const nextHist = history.slice(0, historyIndex + 1);
    nextHist.push(newCode);
    if (nextHist.length > 25) nextHist.shift();
    setHistory(nextHist);
    setHistoryIndex(nextHist.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      setHistoryIndex(targetIdx);
      setCode(history[targetIdx]);
      playFx('snap');
      triggerHaptic(12, hapticsEnabled);
      triggerToast('TIME MACHINE: UNDO');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIdx = historyIndex + 1;
      setHistoryIndex(targetIdx);
      setCode(history[targetIdx]);
      playFx('snap');
      triggerHaptic(12, hapticsEnabled);
      triggerToast('TIME MACHINE: REDO');
    }
  };

  const activeColor = useMemo(() => {
    if (opticMode === 'nvg') return '#00FF66';
    if (opticMode === 'flir') return '#FF7700';
    if (customColor) return customColor;
    const selected = TACTICAL_PALETTES[colorIndex];
    if (!isDarkMode && selected.code === 'MET-05') return '#0F172A';
    return selected.hex;
  }, [customColor, colorIndex, isDarkMode, opticMode]);

  const activeGlow = useMemo(() => {
    if (opticMode === 'nvg') return 'rgba(0, 255, 102, 0.65)';
    if (opticMode === 'flir') return 'rgba(255, 119, 0, 0.6)';
    return TACTICAL_PALETTES[colorIndex]?.glow || 'rgba(0, 229, 255, 0.4)';
  }, [colorIndex, opticMode]);

  const dashValue = useMemo(() => {
    switch (strokeDash) {
      case 'dashed': return '4, 4';
      case 'dotted': return '1, 3';
      case 'solid':
      default: return 'none';
    }
  }, [strokeDash]);

  const fillColorValue = useMemo(() => {
    switch (fillMode) {
      case 'solid': return activeColor;
      case 'tint': return `${activeColor}24`;
      case 'none':
      default: return 'none';
    }
  }, [fillMode, activeColor]);

  const parsedData = useMemo(() => {
    return parseCodeToSvgPayload(code, accentColor, dualColorMode);
  }, [code, accentColor, dualColorMode]);

  // Priority API Key Resolver
  const getActiveApiKey = useCallback(() => {
    if (apiKey && apiKey.trim()) return apiKey.trim();
    if (typeof process !== 'undefined' && process.env?.REACT_APP_GEMINI_API_KEY) {
      return process.env.REACT_APP_GEMINI_API_KEY;
    }
    return "";
  }, [apiKey]);

  // Test API Key validity
  const handleTestApiKey = async () => {
    const keyToTest = getActiveApiKey();
    if (!keyToTest) {
      setApiTestStatus('error');
      setApiTestMsg('NO KEY SPECIFIED: Enter a valid Gemini API key first.');
      playFx('alert');
      return;
    }

    setApiTestStatus('testing');
    setApiTestMsg('PINGING GEMINI GATEWAY...');
    playFx('click');

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${keyToTest}`;
      const payload = {
        contents: [{ parts: [{ text: 'Respond with the single word "ONLINE"' }] }]
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        if (res.status === 400 || res.status === 403) {
          throw new Error(`AUTHENTICATION REJECTED (${res.status}): Check key permissions.`);
        } else if (res.status === 429) {
          throw new Error('QUOTA HIT (429): Rate limit reached on this key.');
        } else {
          throw new Error(`HTTP ${res.status}: Gateway fault.`);
        }
      }

      setApiTestStatus('success');
      setApiTestMsg('LINK VERIFIED // GEMINI 3 FLASH ACTIVE');
      playFx('lock');
      triggerHaptic([15, 30, 15], hapticsEnabled);
    } catch (err) {
      setApiTestStatus('error');
      setApiTestMsg(err.message || 'GATEWAY UNREACHABLE: Verify network or key.');
      playFx('alert');
    }
  };

  const applyNodeCoordinateUpdate = (node, newX, newY) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      if (!svg) return;

      if (node.type === 'circle') {
        const circles = svg.querySelectorAll('circle');
        if (circles[node.elemIndex]) {
          circles[node.elemIndex].setAttribute('cx', newX.toFixed(1));
          circles[node.elemIndex].setAttribute('cy', newY.toFixed(1));
        }
      } else if (node.type === 'line') {
        const lines = svg.querySelectorAll('line');
        if (lines[node.elemIndex]) {
          lines[node.elemIndex].setAttribute(node.targetAttrX, newX.toFixed(1));
          lines[node.elemIndex].setAttribute(node.targetAttrY, newY.toFixed(1));
        }
      } else if (node.type === 'rect') {
        const rects = svg.querySelectorAll('rect');
        if (rects[node.elemIndex]) {
          rects[node.elemIndex].setAttribute('x', newX.toFixed(1));
          rects[node.elemIndex].setAttribute('y', newY.toFixed(1));
        }
      } else if (node.type === 'path') {
        const paths = svg.querySelectorAll('path');
        if (paths[node.elemIndex]) {
          let d = paths[node.elemIndex].getAttribute('d') || '';
          let count = 0;
          const updatedD = d.replace(/([MLCSTQAZ])\s*([-+]?\d*\.?\d+)[,\s]+([-+]?\d*\.?\d+)/gi, (match, cmd, xVal, yVal) => {
            if (count === node.matchIndex) {
              count++;
              return `${cmd} ${newX.toFixed(1)} ${newY.toFixed(1)}`;
            }
            count++;
            return match;
          });
          paths[node.elemIndex].setAttribute('d', updatedD);
        }
      }

      const updatedSvgString = new XMLSerializer().serializeToString(svg);
      setCode(updatedSvgString);
      pushCodeToHistory(updatedSvgString);
      playFx('snap');
      triggerHaptic([8, 16], hapticsEnabled);
    } catch (err) {
      console.warn('CAD node update fault:', err);
    }
  };

  const handlePointerMove = (e) => {
    if (!canvasMountRef.current) return;
    const rect = canvasMountRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (isPanActive && isDraggingPanRef.current) {
      const deltaX = clientX - lastPanTouchRef.current.x;
      const deltaY = clientY - lastPanTouchRef.current.y;
      setPanOffset(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      lastPanTouchRef.current = { x: clientX, y: clientY };
      return;
    }

    const relX = ((clientX - rect.left) / rect.width) * 24;
    const relY = ((clientY - rect.top) / rect.height) * 24;

    let targetX = Math.min(24, Math.max(0, parseFloat(relX.toFixed(1))));
    let targetY = Math.min(24, Math.max(0, parseFloat(relY.toFixed(1))));

    if (gridSnap > 0) {
      targetX = Math.round(targetX / gridSnap) * gridSnap;
      targetY = Math.round(targetY / gridSnap) * gridSnap;
    }

    setCursorCoords({ x: targetX, y: targetY, isHovered: true });

    if (activeDraggingNode) {
      applyNodeCoordinateUpdate(activeDraggingNode, targetX, targetY);
    }
  };

  const handlePointerLeave = () => {
    setCursorCoords(prev => ({ ...prev, isHovered: false }));
    setActiveDraggingNode(null);
    isDraggingPanRef.current = false;
  };

  const handlePointerUp = () => {
    if (activeDraggingNode) {
      setActiveDraggingNode(null);
      triggerToast('VERTEX RE-ANCHORED');
    }
    isDraggingPanRef.current = false;
  };

  const handlePanTouchStart = (e) => {
    if (isPanActive) {
      isDraggingPanRef.current = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      lastPanTouchRef.current = { x: clientX, y: clientY };
    }
  };

  const handleAutoRepairAndClean = () => {
    playFx('purge');
    try {
      let candidate = code.trim();

      if (!candidate.includes('<') && !candidate.includes('>')) {
        candidate = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <!-- Repaired from plain text -->\n  <circle cx="12" cy="12" r="9" />\n  <path d="M12 7v5l3 3" />\n</svg>`;
      }

      if (!candidate.includes('<svg')) {
        candidate = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${candidate}</svg>`;
      }
      if (!candidate.includes('</svg>')) {
        candidate += '</svg>';
      }

      candidate = candidate.replace(/<path([^>]*?[^\/])>/gi, '<path$1 />');
      candidate = candidate.replace(/<circle([^>]*?[^\/])>/gi, '<circle$1 />');
      candidate = candidate.replace(/<line([^>]*?[^\/])>/gi, '<line$1 />');
      candidate = candidate.replace(/<rect([^>]*?[^\/])>/gi, '<rect$1 />');

      candidate = candidate.replace(/<script[\s\S]*?<\/script>/gi, '');
      candidate = candidate.replace(/<!--[\s\S]*?-->/g, '');
      candidate = candidate.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();

      setCode(candidate);
      pushCodeToHistory(candidate);
      triggerToast('SYNTAX AUTO-REPAIRED');
    } catch (e) {
      playFx('alert');
      triggerToast('SYNTAX REPAIR FAULT');
    }
  };

  const handleSaveSnapshot = (slotId) => {
    playFx('lock');
    triggerHaptic([20, 40, 20], hapticsEnabled);
    const updated = snapshots.map((s) => {
      if (s.id === slotId) {
        return {
          ...s,
          data: {
            code,
            title: iconTitle,
            strokeWidth,
            activeColor,
            accentColor,
            timestamp: new Date().toLocaleTimeString()
          }
        };
      }
      return s;
    });
    setSnapshots(updated);
    triggerToast(`VAULT: RECORDED TO SLOT-0${slotId}`);
  };

  const handleRecallSnapshot = (slot) => {
    if (!slot.data) {
      playFx('click');
      return;
    }
    playFx('chirp');
    triggerHaptic(18, hapticsEnabled);
    setCode(slot.data.code);
    setIconTitle(slot.data.title);
    setStrokeWidth(slot.data.strokeWidth);
    if (slot.data.accentColor) setAccentColor(slot.data.accentColor);
    pushCodeToHistory(slot.data.code);
    triggerToast(`RECALLED: SLOT-0${slot.id}`);
  };

  const handleGenerateIconWithAI = async (customPrompt) => {
    const targetPrompt = customPrompt || aiPrompt;
    if (!targetPrompt.trim()) return;

    const resolvedKey = getActiveApiKey();
    if (!resolvedKey) {
      setAiError('KEY MISSING: No Gemini API Key found. Tap "SETTINGS [⚙]" below to insert your free key.');
      playFx('alert');
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setAiError('NETWORK OFFLINE: Internet connection dropped. Reconnect and retry.');
      playFx('alert');
      return;
    }

    setIsAiGenerating(true);
    setAiError(null);
    playFx('chirp');
    triggerHaptic(30, hapticsEnabled);

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${resolvedKey}`;

      const systemPrompt = `You are an elite aerospace CAD vector engineer.
Generate ONLY valid, ultra-clean, minimal 24x24 SVG:
- ViewBox: "0 0 24 24"
- Style: Industrial, tactical military HUD, geometric, high-contrast.
- Output ONLY the raw <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">...</svg> string.`;

      const userPrompt = `Synthesize high-precision military tactical icon: "${targetPrompt}". Return raw SVG only.`;

      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 403) {
          throw new Error(`AUTHENTICATION FAILED (${response.status}): Check your API Key in Settings.`);
        } else if (response.status === 429) {
          throw new Error('RATE LIMIT EXCEEDED (429): Free daily quota exhausted. Resets daily or configure personal key.');
        } else {
          throw new Error(`GATEWAY ERROR (${response.status}): Service temporarily unavailable.`);
        }
      }

      const result = await response.json();
      const generatedRaw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedRaw) {
        throw new Error('AI returned an empty response. Try a different tactical prompt.');
      }

      const match = generatedRaw.match(/<svg[\s\S]*?<\/svg>/i);
      const cleanSvg = match ? match[0] : generatedRaw.replace(/```xml|```svg|```/gi, '').trim();

      const testParse = parseCodeToSvgPayload(cleanSvg);
      if (!testParse.isValid) {
        throw new Error(`AI generated invalid vector syntax: ${testParse.errorMessage}`);
      }

      setCode(cleanSvg);
      pushCodeToHistory(cleanSvg);
      setIconTitle(targetPrompt.slice(0, 18).toUpperCase());
      setIsAiModalOpen(false);
      setAiPrompt('');
      triggerToast('AI VECTOR SYNTHESIZED');
    } catch (err) {
      setAiError(err.message || 'Synthesis aborted due to a network anomaly.');
      playFx('alert');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleGenerate4Variations = async () => {
    const resolvedKey = getActiveApiKey();
    if (!resolvedKey) {
      triggerToast('API KEY REQUIRED: OPEN SETTINGS [⚙]');
      setIsSettingsOpen(true);
      return;
    }

    setIsGeneratingVariations(true);
    playFx('chirp');
    triggerToast('COMPUTING 4 TACTICAL VARIANTS...');

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${resolvedKey}`;

      const systemPrompt = `You are a military vector transformation system.
Take the given SVG code and return exactly 4 tactical style variations in JSON.
Styles to return:
1: "Heavy Armor" (reinforced chamfered lines, heavy geometric plating)
2: "Stealth Wire" (minimalist hairline strokes, broken reticle dashes)
3: "Duotone Invert" (high-density geometric silhouettes)
4: "Cyber HUD" (bracketed target indicators, mil-dot crosshairs)`;

      const userPrompt = `Transform this SVG into 4 variations:\n${code}`;

      const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                style: { type: "STRING" },
                svg: { type: "STRING" }
              },
              required: ["title", "style", "svg"]
            }
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Variation synthesis failed: HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsedVariants = JSON.parse(rawText);
        setAiVariations(parsedVariants);
        triggerToast('4 VARIATIONS READY');
      }
    } catch (e) {
      playFx('alert');
      triggerToast('VARIATION MATRIX FAULT: ' + (e.message || 'Check key'));
    } finally {
      setIsGeneratingVariations(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      triggerToast('INVALID FILE: Upload an image file');
      playFx('alert');
      return;
    }

    const resolvedKey = getActiveApiKey();
    if (!resolvedKey) {
      triggerToast('API KEY REQUIRED FOR SKETCH // OPEN SETTINGS [⚙]');
      setIsSettingsOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      triggerToast('FILE READ ERROR');
      playFx('alert');
    };

    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1];
      triggerToast('ANALYZING SKETCH VECTOR...');
      setIsAiGenerating(true);
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${resolvedKey}`;

        const payload = {
          contents: [
            {
              role: "user",
              parts: [
                { text: "Analyze this sketch/image. Synthesize a clean 24x24 minimalist tactical mil-spec SVG icon representing its contours. ViewBox: 0 0 24 24. Return ONLY valid <svg>...</svg>." },
                {
                  inlineData: {
                    mimeType: file.type || "image/png",
                    data: base64Data
                  }
                }
              ]
            }
          ]
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Vectorizer HTTP error ${response.status}`);

        const res = await response.json();
        const text = res?.candidates?.[0]?.content?.parts?.[0]?.text;
        const match = text?.match(/<svg[\s\S]*?<\/svg>/i);
        if (match) {
          setCode(match[0]);
          pushCodeToHistory(match[0]);
          setIconTitle('SKETCH-VECTOR');
          triggerToast('SKETCH VECTORIZED');
        } else {
          throw new Error('No SVG detected in sketch output');
        }
      } catch (err) {
        playFx('alert');
        triggerToast('VECTORIZER FAULT: ' + (err.message || 'Error'));
      } finally {
        setIsAiGenerating(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopyCode = (formatType) => {
    playFx('click');
    triggerHaptic(14, hapticsEnabled);
    const compName = iconTitle.replace(/[^a-zA-Z0-9]/g, '') || 'TacticalIcon';
    let output = '';

    if (formatType === 'react') {
      output = `import React from 'react';

export const ${compName} = ({
  size = ${iconSize},
  primaryColor = "${activeColor}",
  accentColor = "${accentColor}",
  strokeWidth = ${strokeWidth},
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="${parsedData.viewBox}"
    fill="${fillColorValue}"
    stroke={primaryColor}
    strokeWidth={strokeWidth}
    strokeLinecap="${strokeLinecap}"
    strokeLinejoin="${strokeLinejoin}"
    strokeDasharray="${dashValue}"
    style={{
      transform: "${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}".trim() || undefined
    }}
    className={className}
    {...props}
  >
    ${parsedData.innerSvg.trim()}
  </svg>
);

export default ${compName};`;
    } else if (formatType === 'sprite-sheet') {
      output = `<!-- Tactical Mil-Spec Vector Sprite Sheet -->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <defs>
    <g id="${compName.toLowerCase()}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}">
      ${parsedData.innerSvg.trim()}
    </g>
    ${snapshots
      .filter(s => s.data)
      .map(s => `<g id="slot-${s.id}" viewBox="0 0 24 24">${s.data.code.replace(/<svg[^>]*>|<\/svg>/gi, '')}</g>`)
      .join('\n    ')}
  </defs>
</svg>`;
    } else if (formatType === 'barrel') {
      output = `// Tactical Design System Barrel Export (index.ts)
export { ${compName} } from './${compName}';
${snapshots
  .filter(s => s.data)
  .map(s => `export { IconSlot0${s.id} } from './IconSlot0${s.id}';`)
  .join('\n')}`;
    } else if (formatType === 'figma') {
      output = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${activeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}">
  ${parsedData.innerSvg.trim()}
</svg>`;
    } else if (formatType === 'animated') {
      output = `/* Tactical Animated Wrapper */
<style>
  @keyframes tactical-pulse {
    0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px ${activeColor}); }
    50% { opacity: 0.35; filter: drop-shadow(0 0 1px ${activeColor}); }
  }
  .tactical-animated {
    animation: tactical-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
<svg width="${iconSize}" height="${iconSize}" viewBox="${parsedData.viewBox}" fill="${fillColorValue}" stroke="${activeColor}" stroke-width="${strokeWidth}" class="tactical-animated">
  ${parsedData.innerSvg.trim()}
</svg>`;
    } else if (formatType === 'native') {
      output = `import React from 'react';
import Svg, { Path, G, Circle, Line, Rect } from 'react-native-svg';

export const ${compName} = ({ size = ${iconSize}, primaryColor = "${activeColor}", strokeWidth = ${strokeWidth} }) => (
  <Svg width={size} height={size} viewBox="${parsedData.viewBox}">
    <G stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="${strokeLinecap}" strokeLinejoin="${strokeLinejoin}">
      ${parsedData.innerSvg.trim()}
    </G>
  </Svg>
);`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(output);
      setCopiedFormat(formatType);
      triggerToast(`COPIED: ${formatType.toUpperCase()}`);
      setTimeout(() => setCopiedFormat(null), 1800);
    }
  };

  const handleDownloadSvg = () => {
    playFx('click');
    triggerHaptic(12, hapticsEnabled);
    const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="${parsedData.viewBox}" fill="${fillColorValue}" stroke="${activeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}" stroke-dasharray="${dashValue}">
  ${parsedData.innerSvg.trim()}
</svg>`;
    const blob = new Blob([cleanSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${iconTitle.toLowerCase().replace(/\s+/g, '-')}-cad.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast('MIL-SPEC .SVG DISPATCHED');
  };

  const handleDownloadPng = (dimension = 512) => {
    playFx('click');
    try {
      const canvas = downloadCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = 2;

      canvas.width = dimension * dpr;
      canvas.height = dimension * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dimension, dimension);

      const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="${parsedData.viewBox}" fill="${fillColorValue}" stroke="${activeColor}" stroke-width="${strokeWidth * (dimension / iconSize)}" stroke-linecap="${strokeLinecap}" stroke-linejoin="${strokeLinejoin}">
        ${parsedData.innerSvg}
      </svg>`;

      const img = new Image();
      const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, dimension, dimension);
        URL.revokeObjectURL(url);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${iconTitle.toLowerCase().replace(/\s+/g, '-')}-${dimension}px.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        triggerToast(`EXPORTED ${dimension}PX PNG`);
      };
      img.onerror = () => {
        playFx('alert');
        triggerToast('RASTERIZATION IMAGE LOAD FAULT');
      };
      img.src = url;
    } catch (err) {
      playFx('alert');
      triggerToast('RASTERIZATION FAULT');
    }
  };

  const handleFactoryReset = () => {
    if (confirm('RECALIBRATE STUDIO? This will reset all snapshot slots, API settings, and custom preferences.')) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      setApiKey('');
      setSnapshots([
        { id: 1, label: 'SLOT-01', data: null },
        { id: 2, label: 'SLOT-02', data: null },
        { id: 3, label: 'SLOT-03', data: null },
        { id: 4, label: 'SLOT-04', data: null }
      ]);
      setCode(PRESET_ICONS[0].code);
      setIconTitle(PRESET_ICONS[0].name);
      setSoundMuted(false);
      setHapticsEnabled(true);
      setAutoRepairOnPaste(true);
      setDisableBootOnLaunch(false);
      playFx('purge');
      triggerToast('STUDIO RECALIBRATED');
    }
  };

  const getGridStyle = () => {
    if (opticMode === 'nvg') {
      return {
        backgroundColor: '#021206',
        backgroundImage: 'radial-gradient(rgba(0, 255, 102, 0.25) 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      };
    }
    if (opticMode === 'flir') {
      return {
        backgroundColor: '#160A02',
        backgroundImage: 'radial-gradient(rgba(255, 119, 0, 0.22) 1px, transparent 1px)',
        backgroundSize: '16px 16px'
      };
    }

    if (isDarkMode) {
      switch (canvasBg) {
        case 'crossdots':
          return {
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.16) 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#07090C'
          };
        case 'blueprint':
          return {
            backgroundColor: '#040B14',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.14) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.14) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          };
        case 'monolith':
          return { backgroundColor: '#020305' };
        case 'metric':
        default:
          return {
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundColor: '#07080B'
          };
      }
    } else {
      switch (canvasBg) {
        case 'crossdots':
          return {
            backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.2) 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#F1F4F9'
          };
        case 'blueprint':
          return {
            backgroundColor: '#E8F1FB',
            backgroundImage: `
              linear-gradient(to right, rgba(2, 132, 199, 0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2, 132, 199, 0.18) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          };
        case 'monolith':
          return { backgroundColor: '#FFFFFF' };
        case 'metric':
        default:
          return {
            backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.07) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundColor: '#EDF0F5'
          };
      }
    }
  };

  const getAnimationClass = () => {
    switch (animMode) {
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'glitch': return 'hover:skew-x-2 transition-transform';
      default: return '';
    }
  };

  const currentBadge = HOUSING_BEZELS.find((b) => b.id === badgeStyle);
  const badgeClass = isDarkMode ? currentBadge?.darkClass : currentBadge?.lightClass;

  return (
    <div
      className={`flex flex-col h-[100dvh] w-full font-mono select-none overflow-hidden antialiased transition-colors duration-200 pb-[env(safe-area-inset-bottom,0px)] ${
        isDarkMode ? 'bg-[#050608] text-zinc-100' : 'bg-[#E5E8ED] text-zinc-900'
      }`}
    >
      <canvas ref={downloadCanvasRef} className="hidden" />
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      {/* ========================================================= */}
      {/* TACTICAL MIL-SPEC SPLASH SCREEN // BOOT SEQUENCE OVERLAY  */}
      {/* ========================================================= */}
      {isBooting && (
        <div
          onClick={handleBypassBoot}
          className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 bg-[#050608] text-zinc-100 cursor-pointer overflow-hidden font-mono"
        >
          {/* Subtle Ambient Grid & Radar Sweep */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 229, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]" />

          {/* Top Boot Telemetry Strip */}
          <div className="relative z-10 flex justify-between items-center border-b border-zinc-800/80 pb-2 text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-none animate-ping" />
              <span className="font-black text-cyan-400">SYS_INIT // CAD-MK8</span>
              <span className="text-zinc-600">|</span>
              <span>REV. 8.4.1</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-zinc-400 font-bold">{zuluTime || '00:00:00Z'}</span>
              <span className="px-1.5 py-0.5 border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-[7.5px] font-bold">
                STANDBY
              </span>
            </div>
          </div>

          {/* Centerpiece: Tactical HUD Reticle & Calibrated Loading Bar */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-6">
            {/* Multi-Ring Rotating Radar HUD Target */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Dashed Ring */}
              <div className="absolute inset-0 border border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite]" />
              
              {/* Inner Reverse Ring */}
              <div className="absolute inset-3 border border-zinc-700/80 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
              
              {/* Central Fixed Compass Diamond */}
              <div className="absolute inset-8 border border-cyan-400/30 rotate-45" />

              {/* Crosshair Hairlines */}
              <div className="absolute w-full h-px bg-cyan-500/30" />
              <div className="absolute h-full w-px bg-cyan-500/30" />

              {/* Center Glowing Icon Emblem */}
              <div className="relative w-12 h-12 flex items-center justify-center bg-cyan-950/50 border border-cyan-400/80 shadow-[0_0_24px_rgba(0,229,255,0.4)]">
                <Crosshair className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>

              {/* Corner Calibrated Indices */}
              <span className="absolute -top-1 -left-1 text-[7.5px] text-zinc-600 font-bold">┌ 0,0</span>
              <span className="absolute -top-1 -right-1 text-[7.5px] text-zinc-600 font-bold">24,0 ┐</span>
              <span className="absolute -bottom-1 -left-1 text-[7.5px] text-zinc-600 font-bold">└ 0,24</span>
              <span className="absolute -bottom-1 -right-1 text-[7.5px] text-zinc-600 font-bold">24,24 ┘</span>
            </div>

            {/* Tactical Identity Headline */}
            <div className="text-center space-y-1">
              <h1 className="text-sm sm:text-base font-black tracking-[0.25em] text-zinc-100 uppercase">
                TACTICAL ICON STUDIO
              </h1>
              <p className="text-[8.5px] text-cyan-400/80 tracking-widest uppercase">
                MIL-SPEC VECTOR CAD & GEMINI SYNTHESIS ENGINE
              </p>
            </div>

            {/* Telemetry Progress Ladder */}
            <div className="w-full max-w-xs space-y-2">
              {/* Segmented Mil-Spec Progress Bar */}
              <div className="h-2 w-full bg-zinc-950 border border-zinc-800 p-0.5 flex">
                <div
                  style={{ width: `${bootProgress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />
              </div>

              {/* Progress Value & Status Log */}
              <div className="flex justify-between items-center text-[8px] sm:text-[8.5px]">
                <span className="text-cyan-300 font-bold tracking-tight truncate max-w-[210px]">
                  {BOOT_LOG_STEPS[bootLogIndex]?.text || 'ENGAGING ENGINE...'}
                </span>
                <span className="text-amber-400 font-mono font-bold tabular-nums pl-2">
                  [{String(bootProgress).padStart(3, '0')}%]
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Bypass Pill */}
          <div className="relative z-10 flex justify-between items-center border-t border-zinc-800/80 pt-3 text-[7.5px] sm:text-[8px] text-zinc-500 uppercase">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 inline-block" />
              <span>CORE ARCHITECTURE ONLINE</span>
            </div>
            <button
              onClick={handleBypassBoot}
              className="px-2.5 py-1 border border-zinc-700 bg-zinc-900/80 text-cyan-400 hover:text-white hover:border-cyan-400 transition active:scale-95 flex items-center space-x-1 font-bold"
            >
              <span>BYPASS SEQUENCE</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Military Command Strip Header */}
      <header
        className={`flex-none px-2.5 py-1.5 border-b flex items-center justify-between z-30 transition-colors ${
          isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-[#FDFDFE] border-zinc-300 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-1.5 min-w-0">
          <div
            className={`w-6 h-6 flex-none flex items-center justify-center border font-bold text-xs ${
              opticMode === 'nvg'
                ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                : opticMode === 'flir'
                ? 'bg-amber-950 border-amber-500 text-amber-400'
                : isDarkMode
                ? 'bg-zinc-900 border-zinc-700 text-cyan-400'
                : 'bg-zinc-200 border-zinc-400 text-zinc-900'
            }`}
          >
            <Radio className="w-3 h-3 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1 truncate">
              <span className="text-[10px] font-black tracking-widest uppercase">CAD-MK8</span>
              <span className="text-[7.5px] px-1 py-0.2 border text-cyan-400 border-cyan-500/40 bg-cyan-950/40">
                MIL-SPEC
              </span>
            </div>
            <div className="text-[7.5px] text-zinc-500 tracking-tight leading-none uppercase">
              {zuluTime || '00:00:00Z'}
            </div>
          </div>
        </div>

        {/* Tactical Command Action Strip */}
        <div className="flex items-center space-x-1 flex-none">
          {/* Time-Machine Undo & Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
            className={`p-1 border transition active:scale-95 disabled:opacity-30 ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-800'
            }`}
          >
            <Undo2 className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo"
            className={`p-1 border transition active:scale-95 disabled:opacity-30 ${
              isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-800'
            }`}
          >
            <Redo2 className="w-2.5 h-2.5" />
          </button>

          {/* Optics Mode Selector */}
          <button
            onClick={() => {
              playFx('lock');
              triggerHaptic(15, hapticsEnabled);
              const next = opticMode === 'standard' ? 'nvg' : opticMode === 'nvg' ? 'flir' : 'standard';
              setOpticMode(next);
              triggerToast(`OPTICS: ${next.toUpperCase()}`);
            }}
            title="Cycle Optics: Standard / NVG / FLIR"
            className={`px-1.5 py-1 border text-[8px] font-bold flex items-center space-x-1 transition active:scale-95 ${
              opticMode === 'nvg'
                ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                : opticMode === 'flir'
                ? 'bg-amber-950 border-amber-500 text-amber-400'
                : isDarkMode
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                : 'bg-white border-zinc-300 text-zinc-700'
            }`}
          >
            <Eye className="w-2.5 h-2.5" />
            <span className="uppercase">{opticMode}</span>
          </button>

          {/* AI Vector Synthesizer Button */}
          <button
            onClick={() => {
              playFx('chirp');
              setIsAiModalOpen(true);
            }}
            className={`px-2 py-1 border text-[8.5px] font-bold flex items-center space-x-1 transition active:scale-95 ${
              isDarkMode ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400 hover:bg-cyan-500/25' : 'bg-cyan-50 border-cyan-600 text-cyan-800 hover:bg-cyan-100'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-spin" />
            <span>AI SYNTH</span>
          </button>

          {/* System Settings Modal Toggle */}
          <button
            onClick={() => {
              playFx('click');
              setIsSettingsOpen(true);
            }}
            title="System Settings & API Key"
            className={`p-1 border transition active:scale-95 relative ${
              apiKey ? 'border-cyan-500/50 text-cyan-400' : 'border-amber-500/70 text-amber-400'
            } ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
          >
            <Settings className="w-2.5 h-2.5" />
            {!apiKey && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              playFx('click');
              setIsDarkMode(!isDarkMode);
              triggerToast(isDarkMode ? 'ARCHITECTURAL LIGHT' : 'OLED STEALTH DARK');
            }}
            className={`p-1 border transition active:scale-95 ${
              isDarkMode ? 'bg-zinc-900 border-zinc-700 text-amber-400 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-2.5 h-2.5" /> : <Moon className="w-2.5 h-2.5" />}
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 min-h-0 relative flex flex-col overflow-hidden">
        {/* ========================================================= */}
        {/* VIEW 1: PRECISION TACTICAL VIEWPORT & CAD ENGINE          */}
        {/* ========================================================= */}
        {activeTab === 'canvas' && (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            {/* Top HUD Telemetry Bar with Fixed Height & Tabular Alignment */}
            <div
              className={`flex-none h-6 px-2 sm:px-3 border-b flex items-center justify-between text-[7.5px] sm:text-[8.5px] whitespace-nowrap overflow-hidden z-20 backdrop-blur-sm transition-colors tabular-nums ${
                isDarkMode ? 'bg-[#08090C]/90 border-zinc-800 text-zinc-400' : 'bg-white/90 border-zinc-200 text-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-zinc-500">SCALE:</span>
                <span className="font-bold text-cyan-400 inline-block min-w-[28px]">{iconSize}px</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">STROKE:</span>
                <span className="font-bold text-amber-400 inline-block min-w-[24px]">{strokeWidth}px</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">TOL:</span>
                <span className="font-bold text-emerald-400">±0.001mm</span>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-none">
                <span className="text-zinc-500">SNAP:</span>
                <span className="font-bold text-amber-400">{gridSnap > 0 ? `${gridSnap}x` : 'OFF'}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">POS:</span>
                <span className="font-bold text-cyan-400 font-mono tabular-nums inline-block w-[64px] sm:w-[68px] text-center bg-cyan-950/20 border border-cyan-500/20 px-0.5 rounded-[1px]">
                  [{cursorCoords.x.toFixed(1).padStart(4, '0')}, {cursorCoords.y.toFixed(1).padStart(4, '0')}]
                </span>
              </div>
            </div>

            {/* Viewport Core Canvas */}
            <div
              ref={canvasMountRef}
              style={getGridStyle()}
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              onMouseDown={handlePanTouchStart}
              onTouchStart={handlePanTouchStart}
              onMouseUp={handlePointerUp}
              onTouchEnd={handlePointerUp}
              onMouseLeave={handlePointerLeave}
              className="relative flex-1 min-h-[190px] flex items-center justify-center p-3 overflow-hidden transition-colors cursor-crosshair"
            >
              {/* CRT Scanline Shader */}
              {opticMode === 'nvg' && (
                <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,102,0.25)_50%)] bg-[length:100%_4px]" />
              )}

              {/* CRT Edge Vignette */}
              {(opticMode === 'nvg' || opticMode === 'flir') && (
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
              )}

              {/* Technical Corner Rulers */}
              <div className="absolute top-1.5 left-2 text-[7.5px] text-zinc-500 font-bold pointer-events-none">
                ┌ CAD::0,0
              </div>
              <div className="absolute top-1.5 right-2 text-[7.5px] text-zinc-500 font-bold pointer-events-none">
                24,0::CAD ┐
              </div>
              <div className="absolute bottom-1.5 left-2 text-[7.5px] text-zinc-500 font-bold pointer-events-none">
                └ CAD::0,24
              </div>
              <div className="absolute bottom-1.5 right-2 text-[7.5px] text-zinc-500 font-bold pointer-events-none">
                24,24::CAD ┘
              </div>

              {/* Flight Telemetry & Artificial Horizon Overlay */}
              {showFlightHud && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-px border-b border-dashed border-cyan-500/30" />
                  <div className="absolute h-full w-px border-r border-dashed border-cyan-500/30" />
                  <div className="absolute flex flex-col items-center space-y-8 text-[7px] text-cyan-400/40">
                    <div>[+10°] ─────── ─────── [+10°]</div>
                    <div className="text-amber-400/70 font-bold">─── [HORIZON] ───</div>
                    <div>[-10°] ─────── ─────── [-10°]</div>
                  </div>
                </div>
              )}

              {/* MIL-SPEC Keyline Overlay */}
              {showKeylines && (
                <div
                  style={{ width: iconSize * 1.5, height: iconSize * 1.5 }}
                  className="absolute pointer-events-none flex items-center justify-center transition-all opacity-40"
                >
                  <div
                    style={{ width: iconSize * 1.25, height: iconSize * 1.25 }}
                    className={`rounded-full border border-dashed ${
                      isDarkMode ? 'border-cyan-500/40' : 'border-cyan-600/50'
                    }`}
                  />
                  <div
                    style={{ width: iconSize * 0.92, height: iconSize * 0.92 }}
                    className={`absolute border ${
                      isDarkMode ? 'border-zinc-600' : 'border-zinc-400'
                    }`}
                  />
                  <div className={`absolute w-full h-px rotate-45 ${isDarkMode ? 'bg-zinc-700/60' : 'bg-zinc-300'}`} />
                  <div className={`absolute w-full h-px -rotate-45 ${isDarkMode ? 'bg-zinc-700/60' : 'bg-zinc-300'}`} />
                  <div className="absolute w-2.5 h-2.5 border border-amber-400/70" />
                </div>
              )}

              {/* RENDERED COMPONENT MOUNT OR DIAGNOSTIC ALERT SHIELD */}
              <div
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel}) rotate(${rotation}deg) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
                  transition: isPanActive ? 'none' : 'transform 0.1s ease-out'
                }}
                className={`relative flex items-center justify-center p-6 transition-all ${badgeClass || ''}`}
              >
                {badgeStyle === 'hud-tile' && (
                  <>
                    <span className="absolute -top-1.5 -left-1.5 text-[8px] leading-none opacity-50">＋</span>
                    <span className="absolute -top-1.5 -right-1.5 text-[8px] leading-none opacity-50">＋</span>
                    <span className="absolute -bottom-1.5 -left-1.5 text-[8px] leading-none opacity-50">＋</span>
                    <span className="absolute -bottom-1.5 -right-1.5 text-[8px] leading-none opacity-50">＋</span>
                  </>
                )}

                {parsedData.isValid ? (
                  <div className={`relative ${getAnimationClass()}`}>
                    <svg
                      width={iconSize}
                      height={iconSize}
                      viewBox={parsedData.viewBox}
                      fill={fillColorValue}
                      stroke={activeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeDasharray={dashValue}
                      style={{
                        color: activeColor,
                        filter: isGlowActive ? `drop-shadow(0 0 14px ${activeGlow})` : 'none',
                        transition: 'filter 0.2s ease, stroke 0.2s ease'
                      }}
                      dangerouslySetInnerHTML={{ __html: parsedData.innerSvg }}
                    />

                    {/* INTERACTIVE CAD VERTEX NODES */}
                    {showWireNodes && parsedData.interactiveNodes.map((node) => (
                      <div
                        key={node.id}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setActiveDraggingNode(node);
                          playFx('click');
                          triggerHaptic(15, hapticsEnabled);
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          setActiveDraggingNode(node);
                          playFx('click');
                          triggerHaptic(15, hapticsEnabled);
                        }}
                        style={{
                          left: `${(node.x / 24) * 100}%`,
                          top: `${(node.y / 24) * 100}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className={`absolute w-3 h-3 rounded-full border cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform hover:scale-125 ${
                          activeDraggingNode?.id === node.id
                            ? 'bg-amber-400 border-white scale-125 z-30'
                            : 'bg-red-500 border-red-200 z-20'
                        }`}
                      >
                        <span className="w-1 h-1 bg-white rounded-full pointer-events-none" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 border border-red-500/80 bg-red-950/60 backdrop-blur-md text-left max-w-[280px] shadow-2xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-red-400">
                      <ShieldAlert className="w-3.5 h-3.5 flex-none animate-pulse" />
                      <span className="text-[9px] font-black tracking-widest uppercase">
                        BUFFER MALFUNCTION // {parsedData.errorType}
                      </span>
                    </div>
                    <p className="text-[8px] text-zinc-300 leading-tight">
                      {parsedData.errorMessage}
                    </p>
                    <p className="text-[7.5px] text-amber-300 bg-black/40 p-1 border border-amber-500/30">
                      <strong className="text-amber-400 font-bold">TACTICAL REMEDY:</strong> {parsedData.suggestedFix}
                    </p>
                    <div className="flex space-x-1 pt-1">
                      <button
                        onClick={handleAutoRepairAndClean}
                        className="flex-1 py-1 border border-emerald-500 bg-emerald-950/60 text-emerald-300 text-[8px] font-black uppercase active:scale-95"
                      >
                        REPAIR SYNTAX
                      </button>
                      <button
                        onClick={() => {
                          setCode(PRESET_ICONS[0].code);
                          setIconTitle(PRESET_ICONS[0].name);
                          playFx('purge');
                          triggerToast('RESTORED DEFAULT LOADOUT');
                        }}
                        className="flex-1 py-1 border border-zinc-700 bg-zinc-900 text-zinc-300 text-[8px] font-bold uppercase active:scale-95"
                      >
                        RESET PRESET
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* On-Canvas Zoom & Pan Controller Pill */}
              <div className="absolute bottom-2 right-2 flex items-center space-x-1 z-20">
                <button
                  onClick={() => {
                    setIsPanActive(!isPanActive);
                    playFx('click');
                    triggerHaptic(10, hapticsEnabled);
                  }}
                  title="Pan Gesture Mode"
                  className={`p-1 border text-[7.5px] font-bold ${
                    isPanActive
                      ? 'border-cyan-400 bg-cyan-500 text-black'
                      : isDarkMode
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                      : 'bg-white border-zinc-300 text-zinc-700'
                  }`}
                >
                  <Move className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(z => Math.max(0.6, z - 0.25));
                    playFx('click');
                  }}
                  className={`p-1 border ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'
                  }`}
                >
                  <ZoomOut className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1.0);
                    setPanOffset({ x: 0, y: 0 });
                    playFx('snap');
                  }}
                  className={`px-1.5 py-0.5 border text-[7.5px] font-bold ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-cyan-400' : 'bg-white border-zinc-300 text-cyan-700'
                  }`}
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(z => Math.min(3.0, z + 0.25));
                    playFx('click');
                  }}
                  className={`p-1 border ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'
                  }`}
                >
                  <ZoomIn className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Tactical Controls Deck */}
            <div
              className={`flex-none max-h-[48vh] overflow-y-auto p-2.5 border-t space-y-2 z-10 transition-colors ${
                isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'
              }`}
            >
              {/* Sliders: Aperture & Caliber */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border p-2 ${
                    isDarkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-[#F6F7F9] border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-[8.5px] mb-1">
                    <span className="text-zinc-500 uppercase font-bold">APERTURE</span>
                    <span className="text-cyan-400 font-bold">{iconSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="140"
                    value={iconSize}
                    onChange={(e) => {
                      setIconSize(Number(e.target.value));
                      playFx('click');
                      triggerHaptic(8, hapticsEnabled);
                    }}
                    className="w-full h-1 bg-zinc-700 appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div
                  className={`border p-2 ${
                    isDarkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-[#F6F7F9] border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-[8.5px] mb-1">
                    <span className="text-zinc-500 uppercase font-bold">CALIBER</span>
                    <span className="text-amber-400 font-bold">{strokeWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.25"
                    value={strokeWidth}
                    onChange={(e) => {
                      setStrokeWidth(Number(e.target.value));
                      playFx('click');
                      triggerHaptic(8, hapticsEnabled);
                    }}
                    className="w-full h-1 bg-zinc-700 appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Tactical Motion & Geometry Strip */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className={`border p-1.5 flex items-center justify-between text-[8px] ${
                    isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Activity className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="font-bold text-zinc-500">MOT:</span>
                  </div>
                  <div className="flex space-x-0.5">
                    {[
                      { id: 'none', label: 'OFF' },
                      { id: 'pulse', label: 'PULSE' },
                      { id: 'spin', label: 'GYRO' },
                      { id: 'glitch', label: 'FLICK' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setAnimMode(mode.id);
                          playFx('click');
                        }}
                        className={`px-1.5 py-0.5 border text-[7.5px] font-bold uppercase transition ${
                          animMode === mode.id
                            ? 'border-cyan-500 bg-cyan-500 text-black'
                            : isDarkMode
                            ? 'border-zinc-800 bg-zinc-900 text-zinc-400'
                            : 'border-zinc-300 bg-white text-zinc-700'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 text-[8px]">
                  <button
                    onClick={() => {
                      setRotation((r) => (r + 90) % 360);
                      playFx('click');
                    }}
                    title="Rotate 90°"
                    className={`border py-1 flex items-center justify-center ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-300'
                    }`}
                  >
                    <RotateCw className="w-2.5 h-2.5" />
                  </button>

                  <button
                    onClick={() => {
                      setFlipX(!flipX);
                      playFx('click');
                    }}
                    title="Mirror Horizontal"
                    className={`border py-1 text-[8px] font-bold ${
                      flipX ? 'border-cyan-500 bg-cyan-500 text-black' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300'
                    }`}
                  >
                    FLIP
                  </button>

                  <button
                    onClick={() => {
                      setShowWireNodes(!showWireNodes);
                      playFx('click');
                      triggerHaptic(12, hapticsEnabled);
                    }}
                    title="Toggle Interactive CAD Nodes"
                    className={`border py-1 text-[7.5px] font-bold ${
                      showWireNodes ? 'bg-amber-500 text-black border-amber-400' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300'
                    }`}
                  >
                    NODE
                  </button>

                  <button
                    onClick={() => {
                      const snaps = [1.0, 0.5, 0];
                      const next = snaps[(snaps.indexOf(gridSnap) + 1) % snaps.length];
                      setGridSnap(next);
                      playFx('snap');
                      triggerHaptic(10, hapticsEnabled);
                    }}
                    title="Grid Snapping: 1.0, 0.5, OFF"
                    className={`border py-1 text-[7.5px] font-bold ${
                      gridSnap > 0 ? 'bg-cyan-500 text-black border-cyan-400' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300'
                    }`}
                  >
                    SNAP
                  </button>
                </div>
              </div>

              {/* Dual-Color Channels & Stroke Controls */}
              <div className="grid grid-cols-4 gap-1 text-[8.5px]">
                <button
                  onClick={() => {
                    const caps = ['round', 'square', 'butt'];
                    const next = caps[(caps.indexOf(strokeLinecap) + 1) % caps.length];
                    setStrokeLinecap(next);
                    playFx('click');
                  }}
                  className={`border py-1 px-1 flex items-center justify-between ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                  }`}
                >
                  <span className="text-zinc-500 text-[7.5px]">CAP:</span>
                  <span className="font-bold uppercase text-cyan-400 text-[8px]">{strokeLinecap}</span>
                </button>

                <button
                  onClick={() => {
                    const dashes = ['solid', 'dashed', 'dotted'];
                    const next = dashes[(dashes.indexOf(strokeDash) + 1) % dashes.length];
                    setStrokeDash(next);
                    playFx('click');
                  }}
                  className={`border py-1 px-1 flex items-center justify-between ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                  }`}
                >
                  <span className="text-zinc-500 text-[7.5px]">DASH:</span>
                  <span className="font-bold uppercase text-amber-400 text-[8px]">{strokeDash}</span>
                </button>

                <button
                  onClick={() => {
                    setDualColorMode(!dualColorMode);
                    playFx('snap');
                    triggerHaptic(12, hapticsEnabled);
                  }}
                  className={`border py-1 px-1 flex items-center justify-between ${
                    dualColorMode ? 'border-red-500 bg-red-950/30 text-red-400' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                  }`}
                >
                  <span className="text-zinc-500 text-[7.5px]">DUAL:</span>
                  <span className="font-bold text-[8px]">{dualColorMode ? 'ACTIVE' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    setShowFlightHud(!showFlightHud);
                    playFx('click');
                  }}
                  className={`border py-1 px-1 flex items-center justify-between ${
                    showFlightHud ? 'border-cyan-500 bg-cyan-950/30 text-cyan-400' : isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                  }`}
                >
                  <span className="text-zinc-500 text-[7.5px]">HUD:</span>
                  <span className="font-bold text-[8px]">{showFlightHud ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Primary Palette Strip & Quick Export */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center space-x-1">
                  {TACTICAL_PALETTES.map((palette, index) => (
                    <button
                      key={palette.code}
                      onClick={() => {
                        setColorIndex(index);
                        setCustomColor(palette.hex);
                        playFx('click');
                        triggerHaptic(8, hapticsEnabled);
                      }}
                      title={palette.name}
                      style={{ backgroundColor: palette.hex }}
                      className={`w-4 h-4 border transition-transform ${
                        activeColor === palette.hex
                          ? 'ring-2 ring-cyan-400 scale-110 border-white'
                          : isDarkMode
                          ? 'border-zinc-800 opacity-70 hover:opacity-100'
                          : 'border-zinc-400 opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleDownloadSvg}
                    className={`px-2 py-1 border text-[8.5px] font-bold flex items-center space-x-1 active:scale-95 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    <Download className="w-2.5 h-2.5 text-zinc-500" />
                    <span>SVG</span>
                  </button>

                  <button
                    onClick={() => handleCopyCode('react')}
                    className={`px-2.5 py-1 border text-[8.5px] font-bold flex items-center space-x-1 active:scale-95 ${
                      copiedFormat === 'react'
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : isDarkMode
                        ? 'bg-cyan-500 border-cyan-400 text-black'
                        : 'bg-zinc-900 border-black text-white'
                    }`}
                  >
                    {copiedFormat === 'react' ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedFormat === 'react' ? 'COPIED' : 'COPY JSX'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: OPTICAL SCALE MATRIX (SIZE LADDER TEST)           */}
        {/* ========================================================= */}
        {activeTab === 'matrix' && (
          <div className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${isDarkMode ? 'bg-[#060709]' : 'bg-[#EAECEF]'}`}>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-wider">// OPTICAL SCALE MATRIX</h2>
              <p className="text-[8.5px] text-zinc-500">Standard resolution stress-test ladder for sub-pixel caliber integrity</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[16, 24, 32, 48, 64, 96].map((res) => (
                <div
                  key={res}
                  className={`border p-2.5 flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#0B0D11] border-zinc-800' : 'bg-white border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-[8px] font-bold text-zinc-500 mb-1.5">
                    <span>{res}x{res} PX</span>
                    <span className="text-cyan-400">{res <= 24 ? 'CRITICAL' : res <= 48 ? 'INTERFACE' : 'HERO'}</span>
                  </div>

                  <div className="flex items-center justify-center p-2.5 min-h-[85px] bg-black/40 border border-zinc-800/60">
                    {parsedData.isValid ? (
                      <svg
                        width={res}
                        height={res}
                        viewBox={parsedData.viewBox}
                        fill={fillColorValue}
                        stroke={activeColor}
                        strokeWidth={Math.max(1, strokeWidth * (res / 96))}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        strokeDasharray={dashValue}
                        dangerouslySetInnerHTML={{ __html: parsedData.innerSvg }}
                      />
                    ) : (
                      <span className="text-[8px] text-red-400 uppercase font-bold">FAULT</span>
                    )}
                  </div>

                  <div className="mt-1.5 text-[7.5px] text-zinc-500 flex justify-between">
                    <span>1:1 SCALE</span>
                    <span>ALIGN: OPTICAL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: INGESTION BUFFER & SNAPSHOT VAULT ARSENAL         */}
        {/* ========================================================= */}
        {activeTab === 'synth' && (
          <div className={`flex-1 flex flex-col p-3 overflow-y-auto space-y-2.5 transition-colors ${isDarkMode ? 'bg-[#060709]' : 'bg-[#EAECEF]'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-wider">// CODE BUFFER & MEMORY VAULT</h2>
                <p className="text-[8.5px] text-zinc-500">Direct vector stream buffer. Accepts SVG or React JSX tags.</p>
              </div>

              <span
                className={`px-1.5 py-0.5 border text-[7.5px] font-bold uppercase ${
                  parsedData.isValid ? 'border-emerald-600 text-emerald-400 bg-emerald-950/30' : 'border-red-600 text-red-400 bg-red-950/30'
                }`}
              >
                {parsedData.isValid ? 'BUFFER: LOCKED' : 'MALFORMED'}
              </span>
            </div>

            {/* Hardware Snapshot Memory Slots */}
            <div className={`border p-2 space-y-1.5 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <div className="flex justify-between items-center text-[8px] font-bold text-zinc-500 uppercase">
                <span>SNAPSHOT VAULT (LOADOUT SLOTS)</span>
                <span>SAVE / RECALL</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {snapshots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`border p-1 flex flex-col justify-between text-[7.5px] ${
                      slot.data
                        ? isDarkMode
                          ? 'border-cyan-500/60 bg-cyan-950/20'
                          : 'border-zinc-900 bg-zinc-100'
                        : isDarkMode
                        ? 'border-zinc-800 bg-zinc-900/40'
                        : 'border-zinc-300 bg-zinc-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold">{slot.label}</span>
                      {slot.data && <span className="text-[6.5px] text-cyan-400">REC</span>}
                    </div>

                    <div className="flex space-x-1 mt-0.5">
                      <button
                        onClick={() => handleSaveSnapshot(slot.id)}
                        className={`flex-1 py-0.5 border text-[7px] font-bold ${
                          isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-zinc-400 bg-zinc-200'
                        }`}
                      >
                        SAVE
                      </button>
                      <button
                        disabled={!slot.data}
                        onClick={() => handleRecallSnapshot(slot)}
                        className={`flex-1 py-0.5 border text-[7px] font-bold ${
                          slot.data ? 'border-cyan-500 bg-cyan-500 text-black' : 'opacity-30 cursor-not-allowed border-zinc-800'
                        }`}
                      >
                        LOAD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monospace Code Editor Area */}
            <div className={`border flex flex-col flex-1 min-h-[170px] transition-colors ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <div
                className={`px-2.5 py-1 border-b flex items-center justify-between text-[8.5px] ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Terminal className="w-2.5 h-2.5 text-cyan-400" />
                  <span className="font-bold">RawVectorBuffer.jsx</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleAutoRepairAndClean}
                    title="Auto-Repair syntax errors and unclosed tags"
                    className={`px-1.5 py-0.5 border text-[7.5px] font-bold flex items-center space-x-1 active:scale-95 ${
                      isDarkMode ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-400' : 'bg-emerald-50 border-emerald-400 text-emerald-900'
                    }`}
                  >
                    <Wrench className="w-2.5 h-2.5" />
                    <span>REPAIR</span>
                  </button>
                  <button
                    onClick={() => {
                      playFx('chirp');
                      fileInputRef.current?.click();
                    }}
                    title="Vectorize hand-drawn sketch or photo"
                    className={`px-1.5 py-0.5 border text-[7.5px] font-bold flex items-center space-x-1 active:scale-95 ${
                      isDarkMode ? 'bg-amber-950/40 border-amber-500/60 text-amber-400' : 'bg-amber-50 border-amber-400 text-amber-900'
                    }`}
                  >
                    <Camera className="w-2.5 h-2.5" />
                    <span>SKETCH</span>
                  </button>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  pushCodeToHistory(e.target.value);
                }}
                placeholder="Paste React icon SVG JSX tags here..."
                spellCheck={false}
                className="w-full flex-1 p-2.5 text-[10px] font-mono bg-transparent resize-none focus:outline-none leading-relaxed tracking-tight"
              />
            </div>

            {/* Presets Grid */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[8px] text-zinc-500 uppercase font-bold">
                <span>TACTICAL LOADOUTS</span>
                <span>{PRESET_ICONS.length} PRESETS</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {PRESET_ICONS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      playFx('click');
                      setCode(preset.code);
                      setIconTitle(preset.name);
                      pushCodeToHistory(preset.code);
                      triggerToast(`DEPLOYED: ${preset.name.toUpperCase()}`);
                    }}
                    className={`p-1.5 border text-left flex items-center justify-between group transition active:scale-98 ${
                      iconTitle === preset.name
                        ? isDarkMode
                          ? 'border-cyan-500 bg-cyan-950/20'
                          : 'border-zinc-900 bg-zinc-200'
                        : isDarkMode
                        ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-600'
                        : 'bg-white border-zinc-300 hover:border-zinc-400'
                    }`}
                  >
                    <div>
                      <p className="text-[9px] font-bold group-hover:text-cyan-400 transition-colors">{preset.name}</p>
                      <span className="text-[7.5px] text-zinc-500 uppercase">{preset.category}</span>
                    </div>
                    <ChevronRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: VECTOR CAD TELEMETRY & MORPH VARIATION MATRIX     */}
        {/* ========================================================= */}
        {activeTab === 'telemetry' && (
          <div className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${isDarkMode ? 'bg-[#060709]' : 'bg-[#EAECEF]'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-wider">// VECTOR CAD TELEMETRY</h2>
                <p className="text-[8.5px] text-zinc-500">Byte metrics, geometry hierarchy, and 4-way morph generator</p>
              </div>

              <button
                disabled={isGeneratingVariations}
                onClick={handleGenerate4Variations}
                className="px-2 py-1 border border-cyan-500 bg-cyan-950/30 text-cyan-400 text-[8px] font-bold flex items-center space-x-1 active:scale-95"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>{isGeneratingVariations ? 'MORPHING...' : '4x MORPH'}</span>
              </button>
            </div>

            {aiVariations.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[8px] font-bold uppercase text-cyan-400">// AI VARIATION MATRIX</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {aiVariations.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setCode(v.svg);
                        pushCodeToHistory(v.svg);
                        setIconTitle(v.title);
                        triggerToast(`LOADED: ${v.title}`);
                      }}
                      className={`border p-2 cursor-pointer transition active:scale-95 ${
                        isDarkMode ? 'bg-[#090B0E] border-cyan-500/50 hover:border-cyan-400' : 'bg-white border-zinc-400'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[7.5px] font-bold text-zinc-400 mb-1">
                        <span className="truncate">{v.title}</span>
                        <span className="text-cyan-400">{v.style}</span>
                      </div>
                      <div
                        className="w-full h-12 flex items-center justify-center p-1 bg-black/40 border border-zinc-800"
                        dangerouslySetInnerHTML={{ __html: v.svg }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-1.5">
              <div className={`border p-2 text-center ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
                <p className="text-[7.5px] text-zinc-500 uppercase font-bold">BYTE PAYLOAD</p>
                <p className="text-xs font-black text-cyan-400 mt-0.5">{parsedData.rawByteSize} B</p>
                <p className="text-[7px] text-emerald-500">COMPACT</p>
              </div>

              <div className={`border p-2 text-center ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
                <p className="text-[7.5px] text-zinc-500 uppercase font-bold">PATH COUNT</p>
                <p className="text-xs font-black text-amber-400 mt-0.5">{parsedData.pathCount}</p>
                <p className="text-[7px] text-zinc-400">ELEMENTS</p>
              </div>

              <div className={`border p-2 text-center ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
                <p className="text-[7.5px] text-zinc-500 uppercase font-bold">CAD NODES</p>
                <p className="text-xs font-black text-emerald-400 mt-0.5">{parsedData.interactiveNodes.length}</p>
                <p className="text-[7px] text-zinc-400">INTERACTIVE</p>
              </div>
            </div>

            <div className={`border p-2.5 space-y-1.5 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <div className="flex justify-between items-center text-[8px] font-bold uppercase text-zinc-500">
                <span>ELEMENT COMPOSITION BREAKDOWN</span>
                <Binary className="w-2.5 h-2.5 text-cyan-400" />
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-[8.5px] pt-0.5">
                <div>
                  <span className="text-zinc-500 text-[7px] block">PATHS</span>
                  <span className="font-bold text-zinc-200">{parsedData.elementStats?.paths || 0}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[7px] block">CIRCLES</span>
                  <span className="font-bold text-zinc-200">{parsedData.elementStats?.circles || 0}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[7px] block">LINES</span>
                  <span className="font-bold text-zinc-200">{parsedData.elementStats?.lines || 0}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[7px] block">RECTS</span>
                  <span className="font-bold text-zinc-200">{parsedData.elementStats?.rects || 0}</span>
                </div>
              </div>
            </div>

            <div className={`border p-2.5 space-y-1 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <label className="text-[7.5px] text-zinc-500 uppercase font-bold block">COMPONENT IDENTIFIER</label>
              <input
                type="text"
                value={iconTitle}
                onChange={(e) => setIconTitle(e.target.value)}
                className={`w-full border px-2 py-1 text-[11px] font-mono font-bold focus:outline-none focus:border-cyan-500 ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                }`}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: HARDWARE DEPLOYMENT SIMULATOR                     */}
        {/* ========================================================= */}
        {activeTab === 'deploy' && (
          <div className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${isDarkMode ? 'bg-[#060709]' : 'bg-[#EAECEF]'}`}>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-wider">// HARDWARE DEPLOYMENT SIMULATOR</h2>
              <p className="text-[8.5px] text-zinc-500">Operational tests across tactical field instruments & watches</p>
            </div>

            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <div className="flex justify-between items-center text-[7.5px] font-bold text-zinc-500 uppercase">
                <span className="flex items-center space-x-1">
                  <Watch className="w-2.5 h-2.5 text-cyan-400" />
                  <span>TACTICAL WATCHFACE // 44MM HUD</span>
                </span>
                <span className="text-cyan-400">{zuluTime}</span>
              </div>
              <div className="flex items-center justify-center p-3">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-700 bg-black flex flex-col items-center justify-center relative shadow-2xl">
                  <span className="absolute top-1 text-[7.5px] text-zinc-500 font-bold">N</span>
                  <span className="absolute bottom-1 text-[7.5px] text-zinc-500 font-bold">S</span>
                  <span className="absolute left-1.5 text-[7.5px] text-zinc-500 font-bold">W</span>
                  <span className="absolute right-1.5 text-[7.5px] text-zinc-500 font-bold">E</span>

                  {parsedData.isValid ? (
                    <svg
                      width="28"
                      height="28"
                      viewBox={parsedData.viewBox}
                      fill={fillColorValue}
                      stroke={activeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      dangerouslySetInnerHTML={{ __html: parsedData.innerSvg }}
                    />
                  ) : (
                    <span className="text-[8px] text-red-400 font-bold">FAULT</span>
                  )}
                  <span className="text-[7.5px] font-bold text-emerald-400 mt-1 uppercase">LOCKED</span>
                </div>
              </div>
            </div>

            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <span className="text-[7.5px] text-zinc-500 tracking-wider uppercase font-bold block">
                TACTICAL COMM TILE // OMEGA-6
              </span>
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-10 h-10 border flex items-center justify-center ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  {parsedData.isValid ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox={parsedData.viewBox}
                      fill={fillColorValue}
                      stroke={activeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      dangerouslySetInnerHTML={{ __html: parsedData.innerSvg }}
                    />
                  ) : (
                    <span className="text-[7px] text-red-400">ERR</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black truncate">{iconTitle}</p>
                  <p className="text-[8px] text-emerald-500 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 inline-block" />
                    <span>LINK SECURE: 99.98%</span>
                  </p>
                </div>
                <button
                  onClick={() => playFx('click')}
                  className={`px-2 py-1 border text-[8px] font-bold ${
                    isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-900 border-zinc-900 text-white'
                  }`}
                >
                  ENGAGE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: MULTI-FRAMEWORK EXPORT SUITE                      */}
        {/* ========================================================= */}
        {activeTab === 'code' && (
          <div className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${isDarkMode ? 'bg-[#060709]' : 'bg-[#EAECEF]'}`}>
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-wider">// MULTI-FRAMEWORK EXPORT SUITE</h2>
              <p className="text-[8.5px] text-zinc-500">Parameterized components, sprite sheets, and Figma formats</p>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'react', title: 'REACT JSX (DUAL COLOR)', desc: 'Props: primaryColor, accentColor, strokeWidth' },
                { id: 'sprite-sheet', title: 'MIL-SPEC SPRITE SHEET', desc: '<svg><defs> bundle of active & vault slots' },
                { id: 'barrel', title: 'BARREL FILE (INDEX.TS)', desc: 'TypeScript design system export index' },
                { id: 'figma', title: 'FIGMA CLIPBOARD SVG', desc: 'Normalized XML ready for direct paste' },
                { id: 'animated', title: 'ANIMATED TACTICAL WRAPPER', desc: 'CSS pulse & glowing radar effect' },
                { id: 'native', title: 'REACT NATIVE SVG', desc: 'Formatted for react-native-svg engine' }
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  className={`border p-2.5 flex items-center justify-between ${
                    isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <h3 className="text-[9px] font-bold text-cyan-400 truncate">{fmt.title}</h3>
                    <p className="text-[7.5px] text-zinc-500 truncate">{fmt.desc}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(fmt.id)}
                    className={`px-2.5 py-1 border text-[8px] font-bold flex items-center space-x-1 transition active:scale-95 flex-none ${
                      copiedFormat === fmt.id
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : isDarkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                        : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200'
                    }`}
                  >
                    {copiedFormat === fmt.id ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedFormat === fmt.id ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className={`border p-2.5 space-y-1.5 ${isDarkMode ? 'bg-[#090B0E] border-zinc-800' : 'bg-white border-zinc-300'}`}>
              <h3 className="text-[9px] font-bold uppercase text-zinc-400">RASTER & VECTOR ASSETS</h3>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={handleDownloadSvg}
                  className={`py-1.5 border text-[8px] font-bold flex items-center justify-center space-x-1 transition active:scale-95 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>RAW .SVG</span>
                </button>

                <button
                  onClick={() => handleDownloadPng(512)}
                  className={`py-1.5 border text-[8px] font-bold flex items-center justify-center space-x-1 transition active:scale-95 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>512px PNG</span>
                </button>

                <button
                  onClick={() => handleDownloadPng(1024)}
                  className={`py-1.5 border text-[8px] font-bold flex items-center justify-center space-x-1 transition active:scale-95 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <Download className="w-2.5 h-2.5" />
                  <span>1024px HD</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Primary Bottom Navigation Bar (Streamlined MFD Style) */}
      <nav
        className={`flex-none border-t px-1 py-1 flex items-center justify-around z-30 transition-colors ${
          isDarkMode ? 'bg-[#07090C] border-zinc-800' : 'bg-[#FAFAFA] border-zinc-300'
        }`}
      >
        {[
          { id: 'canvas', label: 'CANVAS', icon: Crosshair },
          { id: 'matrix', label: 'MATRIX', icon: Grid },
          { id: 'synth', label: 'BUFFER', icon: Code2 },
          { id: 'telemetry', label: 'SPECS', icon: Sliders },
          { id: 'deploy', label: 'DEVICE', icon: Smartphone },
          { id: 'code', label: 'EXPORT', icon: Share2 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playFx('click');
                triggerHaptic(8, hapticsEnabled);
                setActiveTab(tab.id);
              }}
              className={`flex-1 flex flex-col items-center space-y-0.5 py-1 px-1 border transition ${
                isActive
                  ? isDarkMode
                    ? 'border-cyan-500 bg-cyan-950/25 text-cyan-400'
                    : 'border-zinc-900 bg-zinc-200 text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="text-[7.5px] font-bold tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ========================================================= */}
      {/* SYSTEM CONFIG & SETTINGS MODAL                            */}
      {/* ========================================================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
          <div
            className={`w-full max-w-sm border p-3.5 space-y-3.5 max-h-[92vh] overflow-y-auto transition-colors ${
              isDarkMode ? 'bg-[#090B0E] border-cyan-500 text-zinc-100' : 'bg-white border-zinc-900 text-zinc-900'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center space-x-1.5">
                <Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span className="text-[11px] font-black uppercase tracking-wider">
                  SYS CONFIG // STUDIO PREFERENCES
                </span>
              </div>
              <button
                onClick={() => {
                  playFx('click');
                  setIsSettingsOpen(false);
                }}
                className="text-zinc-400 hover:text-white text-xs font-bold px-1"
              >
                ✕
              </button>
            </div>

            {/* SECTION 1: GEMINI AI API KEY & TELEMETRY */}
            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-black/50 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1.5">
                  <Key className="w-3 h-3 text-cyan-400" />
                  <span className="text-[8.5px] font-black uppercase">GEMINI API KEY GATEWAY</span>
                </div>
                <span
                  className={`text-[7px] font-bold px-1 py-0.5 border ${
                    apiKey
                      ? 'border-emerald-500/60 text-emerald-400 bg-emerald-950/30'
                      : 'border-amber-500/60 text-amber-400 bg-amber-950/30'
                  }`}
                >
                  {apiKey ? 'STORED LOCAL' : 'UNSET / DEFAULT'}
                </span>
              </div>

              <p className="text-[7.5px] text-zinc-400 leading-relaxed">
                Provide your free Google Gemini API Key. This is stored securely in your browser's local memory and enables AI Synthesis, 4x Morph, and Sketch Vectorizer when deployed anywhere.
              </p>

              <div className="relative flex items-center">
                <input
                  type={showApiKeyMask ? "password" : "text"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste AI Studio Key (AIzaSy...)"
                  spellCheck={false}
                  className={`w-full border px-2 py-1.5 pr-8 text-[10px] font-mono focus:outline-none focus:border-cyan-400 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKeyMask(!showApiKeyMask)}
                  className="absolute right-2 text-zinc-400 hover:text-zinc-200"
                >
                  {showApiKeyMask ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
              </div>

              {/* API Diagnostics Bar */}
              {apiTestMsg && (
                <div
                  className={`p-1.5 border text-[7.5px] flex items-center space-x-1.5 ${
                    apiTestStatus === 'success'
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : apiTestStatus === 'error'
                      ? 'border-red-500 bg-red-950/40 text-red-300'
                      : 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                  }`}
                >
                  {apiTestStatus === 'success' ? (
                    <ShieldCheck className="w-3 h-3 flex-none text-emerald-400" />
                  ) : apiTestStatus === 'error' ? (
                    <AlertCircle className="w-3 h-3 flex-none text-red-400" />
                  ) : (
                    <RefreshCw className="w-3 h-3 flex-none animate-spin text-cyan-400" />
                  )}
                  <span className="truncate">{apiTestMsg}</span>
                </div>
              )}

              <div className="flex space-x-1.5 pt-0.5">
                <button
                  onClick={handleTestApiKey}
                  disabled={apiTestStatus === 'testing'}
                  className="flex-1 py-1 border border-cyan-500 bg-cyan-950/30 text-cyan-400 text-[8px] font-bold uppercase active:scale-95 disabled:opacity-50"
                >
                  TEST GATEWAY LINK
                </button>

                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 border border-zinc-700 bg-zinc-800 text-zinc-300 text-[8px] font-bold uppercase flex items-center space-x-1 hover:text-white"
                >
                  <span>GET FREE KEY</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* SECTION 2: AUDIO & HAPTICS */}
            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-black/50 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}>
              <span className="text-[8.5px] font-black uppercase text-zinc-400 block">SENSORY FEEDBACK CALIBRATION</span>

              <div className="flex justify-between items-center text-[8px]">
                <span className="text-zinc-300">SYNTHETIC TACTICAL AUDIO</span>
                <button
                  onClick={() => {
                    const next = !soundMuted;
                    setSoundMuted(next);
                    playFx('click');
                  }}
                  className={`px-2 py-0.5 border text-[7.5px] font-bold ${
                    !soundMuted ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {!soundMuted ? 'ENABLED' : 'MUTED'}
                </button>
              </div>

              <div className="flex justify-between items-center text-[8px]">
                <span className="text-zinc-300">DEVICE HARDWARE HAPTICS</span>
                <button
                  onClick={() => {
                    const next = !hapticsEnabled;
                    setHapticsEnabled(next);
                    triggerHaptic(20, next);
                    playFx('snap');
                  }}
                  className={`px-2 py-0.5 border text-[7.5px] font-bold ${
                    hapticsEnabled ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {hapticsEnabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            </div>

            {/* SECTION 3: BOOT SEQUENCE & LAUNCH BEHAVIOR */}
            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-black/50 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}>
              <span className="text-[8.5px] font-black uppercase text-zinc-400 block">SPLASH SCREEN & LAUNCH INITIALIZATION</span>

              <div className="flex justify-between items-center text-[8px]">
                <span className="text-zinc-300">SHOW BOOT SEQUENCE ON LAUNCH</span>
                <button
                  onClick={() => {
                    const next = !disableBootOnLaunch;
                    setDisableBootOnLaunch(next);
                    playFx('click');
                  }}
                  className={`px-2 py-0.5 border text-[7.5px] font-bold ${
                    !disableBootOnLaunch ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {!disableBootOnLaunch ? 'ALWAYS' : 'DISABLED'}
                </button>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  onClick={handleReplayBoot}
                  className="px-2.5 py-1 border border-cyan-500/80 bg-cyan-950/30 text-cyan-400 text-[7.5px] font-bold uppercase flex items-center space-x-1 active:scale-95"
                >
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  <span>RE-RUN BOOT SEQUENCE</span>
                </button>
              </div>
            </div>

            {/* SECTION 4: CAD DRAFTING DEFAULTS */}
            <div className={`border p-2.5 space-y-2 ${isDarkMode ? 'bg-black/50 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}>
              <span className="text-[8.5px] font-black uppercase text-zinc-400 block">DRAFTING ENGINE DEFAULTS</span>

              <div className="flex justify-between items-center text-[8px]">
                <span className="text-zinc-300">AUTO-REPAIR ON CODE INGESTION</span>
                <button
                  onClick={() => {
                    setAutoRepairOnPaste(!autoRepairOnPaste);
                    playFx('click');
                  }}
                  className={`px-2 py-0.5 border text-[7.5px] font-bold ${
                    autoRepairOnPaste ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {autoRepairOnPaste ? 'ACTIVE' : 'OFF'}
                </button>
              </div>

              <div className="flex justify-between items-center text-[8px]">
                <span className="text-zinc-300">MIL-SPEC KEYLINES DEFAULT</span>
                <button
                  onClick={() => {
                    const next = !showKeylinesDefault;
                    setShowKeylinesDefault(next);
                    setShowKeylines(next);
                    playFx('click');
                  }}
                  className={`px-2 py-0.5 border text-[7.5px] font-bold ${
                    showKeylinesDefault ? 'border-cyan-500 bg-cyan-500 text-black' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {showKeylinesDefault ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>
            </div>

            {/* SECTION 5: SYSTEM RECALIBRATION */}
            <div className="pt-1 flex items-center justify-between">
              <button
                onClick={handleFactoryReset}
                className="px-2 py-1.5 border border-red-500/70 bg-red-950/30 text-red-400 text-[8px] font-bold uppercase hover:bg-red-950/60 active:scale-95"
              >
                FACTORY RECALIBRATE
              </button>

              <button
                onClick={() => {
                  playFx('lock');
                  setIsSettingsOpen(false);
                  triggerToast('PREFERENCES COMMITTED');
                }}
                className="px-4 py-1.5 border border-cyan-500 bg-cyan-500 text-black text-[9px] font-black uppercase active:scale-95"
              >
                SAVE & RETURN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Vector Synthesizer Command Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm border p-3.5 space-y-3 transition-colors ${
              isDarkMode ? 'bg-[#0B0D11] border-cyan-500 text-zinc-100' : 'bg-white border-zinc-900 text-zinc-900'
            }`}
          >
            <div className="flex justify-between items-center border-b pb-1.5">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span className="text-[11px] font-black uppercase tracking-wider">AI VECTOR SYNTHESIZER</span>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-zinc-400 hover:text-white text-xs font-bold">
                ✕
              </button>
            </div>

            <p className="text-[8px] text-zinc-500">
              Synthesize precision 24x24 SVG vectors directly into your buffer.
            </p>

            {/* Quick Command Chips */}
            <div className="flex flex-wrap gap-1">
              {AI_PROMPT_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAiPrompt(chip);
                    playFx('click');
                    triggerHaptic(8, hapticsEnabled);
                  }}
                  className={`text-[7.5px] px-1.5 py-0.5 border transition ${
                    isDarkMode
                      ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-cyan-500 hover:text-cyan-400'
                      : 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:border-zinc-700'
                  }`}
                >
                  +{chip}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateIconWithAI()}
                placeholder="e.g. stealth missile drone, EMP coil valve..."
                className={`w-full border px-2 py-1.5 text-[11px] font-mono font-bold focus:outline-none focus:border-cyan-400 ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                }`}
              />
            </div>

            {/* Detailed AI Diagnostics Alert */}
            {aiError && (
              <div className="p-2 border border-red-500 bg-red-950/40 text-[8px] text-red-300 flex flex-col space-y-1.5">
                <div className="flex items-center space-x-1.5 text-red-400 font-bold">
                  <AlertCircle className="w-3 h-3 flex-none" />
                  <span>SYNTHESIS FAULT DETECTED</span>
                </div>
                <p className="leading-tight">{aiError}</p>
                <div className="pt-1 flex space-x-1">
                  <button
                    onClick={() => {
                      setIsAiModalOpen(false);
                      setIsSettingsOpen(true);
                    }}
                    className="py-0.5 px-2 border border-amber-500 bg-amber-950/40 text-amber-300 text-[7.5px] font-bold uppercase"
                  >
                    CONFIG API KEY [⚙]
                  </button>
                  <button
                    onClick={() => setAiError(null)}
                    className="py-0.5 px-2 border border-zinc-700 bg-zinc-800 text-zinc-300 text-[7.5px] font-bold uppercase"
                  >
                    DISMISS
                  </button>
                </div>
              </div>
            )}

            <div className="flex space-x-1.5 pt-1">
              <button
                disabled={isAiGenerating || !aiPrompt.trim()}
                onClick={() => handleGenerateIconWithAI()}
                className="flex-1 py-1.5 border bg-cyan-500 border-cyan-400 text-black font-black text-[9px] tracking-wider uppercase hover:bg-cyan-400 transition active:scale-95 disabled:opacity-50"
              >
                {isAiGenerating ? 'SYNTHESIZING...' : 'SYNTHESIZE VECTOR'}
              </button>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-2.5 py-1.5 border border-zinc-700 text-[9px] font-bold uppercase hover:bg-zinc-800"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tactical Notification Banner */}
      {toastMessage && (
        <div className="absolute top-10 inset-x-4 flex justify-center z-50 pointer-events-none transition-all">
          <div
            className={`border px-3 py-1 shadow-2xl flex items-center space-x-2 ${
              isDarkMode ? 'bg-[#0B0D11] border-cyan-500 text-cyan-300' : 'bg-zinc-900 border-black text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-ping inline-block" />
            <span className="text-[9px] font-bold tracking-widest uppercase">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}