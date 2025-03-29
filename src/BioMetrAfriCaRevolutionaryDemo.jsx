import React, { useState, useEffect, useRef } from 'react';
import {
  Fingerprint, Shield, Lock, Database, Check, X,
  RefreshCw, Zap, Award, Server, Clock, Search,
  Share2, PieChart, GitBranch, Smartphone, Code, AlertTriangle, // Added Smartphone, Bug
  Cpu, Network, Radio, Wifi, Slash, Eye, EyeOff,
  Users, Globe, BookOpen, Brain, Briefcase, Layers, Bug, // Added Bug
  ChevronRight, Info, UserCircle, FileText, Play, Pause, Square, FastForward, WifiOff, Target
} from 'lucide-react';

// Tooltip Component (Revised for better positioning)
const Tooltip = ({ children, info }) => {
  const [show, setShow] = useState(false);
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const calculatePosition = () => {
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = targetRect.top - tooltipRect.height - 8; // 8px spacing above
      let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);

      // Adjust if tooltip goes off-screen vertically (top)
      if (top < 0) {
        top = targetRect.bottom + 8; // Position below instead
      }

      // Adjust if tooltip goes off-screen horizontally
      if (left < 0) {
        left = 8; // Add some padding from the edge
      } else if (left + tooltipRect.width > viewportWidth) {
        left = viewportWidth - tooltipRect.width - 8; // Adjust from the right edge
      }
      // Ensure position is within bounds (prevents potential overflow issues)
      top = Math.max(8, Math.min(top, viewportHeight - tooltipRect.height - 8));
      left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8));


      setTooltipPosition({ top, left });
    }
  };

  const handleMouseEnter = () => {
    setShow(true);
    // Calculate position after the tooltip element exists in the DOM
    setTimeout(calculatePosition, 0);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  // Recalculate on scroll or resize might be needed for complex layouts, but omit for simplicity here

  return (
    <span
      ref={targetRef}
      className="relative inline-block cursor-help border-b border-dotted border-gray-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && info && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 max-w-xs"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            pointerEvents: 'none',
            whiteSpace: 'normal', // Allow text wrapping
            opacity: 1, // Ensure visible
            transition: 'opacity 0.1s ease-in-out' // Smooth fade (optional)
          }}
        >
          {info}
        </div>
      )}
    </span>
  );
};


const BioMetrAfriCaRevolutionaryDemo = () => {
  // Core state variables
  const [stage, setStage] = useState(0); // 0: Initial, 1: Onboarding, 2: Onboarded, 3: Authenticating
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [processingDetails, setProcessingDetails] = useState([]);
  const [authenticationScore, setAuthenticationScore] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('online'); // 'online' or 'offline'
  const [selectedTab, setSelectedTab] = useState('demo'); // 'demo', 'tech', 'metrics', 'simple', 'osi', 'ip', 'research', 'personas'
  const [narrativePhase, setNarrativePhase] = useState(0);
  const [showThreatModel, setShowThreatModel] = useState(false);

  // References
  const scrollRef = useRef(null);
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(0);
  const nextStepCallbackRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Reset the demo to initial state
  const resetDemo = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
    remainingTimeRef.current = 0;
    nextStepCallbackRef.current = null;
    setStage(0);
    setProcessingStep(0);
    setShowSuccessOverlay(false);
    setProcessingDetails([]);
    setAuthenticationScore(0);
    setIsPlaying(false);
    setIsPaused(false);
    setNarrativePhase(0);
    // Don't reset network status or speed, allow user control
  };

  // Start the demonstration
  const startDemo = () => {
    if (isPlaying && !isPaused) return; // Already running
    if (!isPlaying || stage === 0) { // Reset fully if starting from scratch or after completion/stop
        resetDemo();
    }
    setIsPlaying(true);
    setIsPaused(false);
    // If paused, resume from current step, otherwise start from 0 or beginning of auth
    let startSimulationFrom = 0;
    if (isPaused) {
        startSimulationFrom = processingStep;
    } else if (stage === 2) { // If already onboarded but stopped, start auth
        startSimulationFrom = 6; // Assuming step 6 is the start of authentication
        setAuthenticationScore(0); // Reset score for auth
    }
    runSimulation(startSimulationFrom);
  };


  // Pause the demonstration
  const pauseDemo = () => {
      if (!isPlaying || isPaused) return;
      clearTimeout(timerRef.current);
      // Store remaining time based on when the timeout was set and when pause was hit
      // This simplified version just stops the timer. Accurate remaining time needs more state.
      timerRef.current = null;
      setIsPaused(true);
  };

  // Resume the demonstration
  const resumeDemo = () => {
      if (!isPlaying || !isPaused) return;
      setIsPaused(false);
      // Re-trigger the simulation loop from the current step
      // The runSimulation logic handles not re-executing the current step's actions
      runSimulation(processingStep);
  };

  // Toggle network status
  const toggleNetworkStatus = () => {
    setNetworkStatus(prev => {
        const newStatus = prev === 'online' ? 'offline' : 'online';
        // Add log only if simulation is running or has run
        if (stage > 0) {
            addProcessingDetail(`Network status changed to: ${newStatus.toUpperCase()}`, newStatus === 'online' ? 'info' : 'warning');
        }
        return newStatus;
    });
  };

  // Adjust simulation speed
  const changeSpeed = (newSpeed) => {
    setSimulationSpeed(newSpeed);
    // Simple approach: speed change affects next step delay calculation in runSimulation
  };

  // Scroll to bottom of log container when new details are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [processingDetails]);

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  // Add a new processing detail to the log
  const addProcessingDetail = (detail, type = 'info') => {
    setProcessingDetails(prev => {
        // Limit log size for performance
        const limitedPrev = prev.length > 150 ? prev.slice(prev.length - 150) : prev;
        return [...limitedPrev, { text: detail, type, timestamp: new Date().toISOString() }];
    });
  };

  // Run the authentication simulation sequence
  const runSimulation = (startStep = 0) => {
    // Define timings for each step, adjusted by simulation speed
    const getTimings = () => ({
      captureInitial: 800 / simulationSpeed,
      processFeatures: 1200 / simulationSpeed,
      generateProfile: 1500 / simulationSpeed,
      storeLocal: 700 / simulationSpeed,
      completeOnboarding: 500 / simulationSpeed,

      initiateAuth: 300 / simulationSpeed,
      captureNew: 500 / simulationSpeed,
      localProcessing: 400 / simulationSpeed,
      generateProof: 900 / simulationSpeed,
      verifyLocal: 350 / simulationSpeed,
      generateToken: 450 / simulationSpeed,
      completeAuth: 200 / simulationSpeed,
    });

    // Define the sequence of steps in the simulation
    const simulationSteps = [
      // --- Onboarding --- (Steps 0-5)
      () => { // Step 0
        setStage(1);
        addProcessingDetail('Initiating biometric onboarding sequence...', 'highlight');
        addProcessingDetail('Preparing local secure storage environment', 'info');
        addProcessingDetail('Initializing TEE (Trusted Execution Environment)', 'info');
        setNarrativePhase(1);
      },
      () => { // Step 1
        addProcessingDetail('Capturing initial behavioural telemetry sample...', 'processing');
        addProcessingDetail('Monitoring keypress latency patterns', 'info');
        addProcessingDetail('Recording touch gesture dynamics', 'info');
        addProcessingDetail('Analysing motion sensor input', 'info');
        setAuthenticationScore(10);
        setNarrativePhase(2);
      },
      () => { // Step 2
        addProcessingDetail('Initial capture complete', 'success');
        addProcessingDetail('Processing raw telemetry into feature vectors...', 'processing');
        addProcessingDetail('Extracting dimensional features using PCA', 'info');
        addProcessingDetail('Calculating statistical normalisation parameters', 'info');
        addProcessingDetail('Applying regional calibration factors (Ghanaian dataset)', 'info');
        setAuthenticationScore(30);
        setNarrativePhase(3);
      },
      () => { // Step 3
        addProcessingDetail('Feature extraction complete', 'success');
        addProcessingDetail('Building behavioral fingerprint profile...', 'processing');
        addProcessingDetail('Generating high-dimensional embedding (1536D space)', 'info');
        addProcessingDetail('Creating zero-knowledge reference templates', 'info');
        addProcessingDetail('Implementing Bulletproofs cryptographic protocol', 'info');
        setAuthenticationScore(60);
        setNarrativePhase(4);
        if (networkStatus === 'offline') {
          addProcessingDetail('Network unavailable - generating offline-only profile', 'warning');
        } else {
          addProcessingDetail('Network available - enabling cloud sync capabilities', 'info');
        }
      },
      () => { // Step 4
        addProcessingDetail('Profile generation complete', 'success');
        addProcessingDetail('Storing encrypted profile in local secure enclave...', 'processing');
        addProcessingDetail('Applying BLS signature scheme for template integrity', 'info');
        addProcessingDetail('Setting trust decay parameters (adaptive learning enabled)', 'info');
        setAuthenticationScore(80);
        setNarrativePhase(5);
      },
      () => { // Step 5
        addProcessingDetail('Local storage complete', 'success');
        addProcessingDetail('Onboarding procedure finalised (approx. 4.7s)', 'highlight');
        addProcessingDetail('User can now authenticate using behavioural biometrics', 'success');
        setStage(2);
        setAuthenticationScore(100);
        setNarrativePhase(6);
        // Reset score for auth phase after a short delay showing 100% onboarding
        setTimeout(() => setAuthenticationScore(0), Math.max(200, 400 / simulationSpeed));
      },

      // --- Authentication --- (Steps 6-12)
      () => { // Step 6
        setStage(3);
        addProcessingDetail('Initiating authentication sequence...', 'highlight');
        addProcessingDetail('Loading encrypted reference profile from secure enclave', 'info');
        addProcessingDetail('Establishing secure context within TEE', 'info');
        setNarrativePhase(7);
      },
      () => { // Step 7
        addProcessingDetail('Capturing current behavioural telemetry...', 'processing');
        addProcessingDetail('Sampling keystroke dynamics (login attempt)', 'info');
        addProcessingDetail('Recording touch pressure variations (interaction)', 'info');
        addProcessingDetail('Measuring accelerometer patterns (device handling)', 'info');
        setAuthenticationScore(20);
        setNarrativePhase(8);
      },
      () => { // Step 8
        addProcessingDetail('Sample captured', 'success');
        addProcessingDetail('Processing current features...', 'processing');
        addProcessingDetail('Normalising input vectors against baseline', 'info');
        addProcessingDetail('Applying dimensional reduction (PCA/UMAP)', 'info');
        addProcessingDetail('Computing feature weightings based on current context', 'info');
        setAuthenticationScore(40);
        setNarrativePhase(9);
      },
      () => { // Step 9
        addProcessingDetail('Generating zero-knowledge proof (Bulletproofs)...', 'processing');
        addProcessingDetail('Computing witness based on current features & reference', 'info');
        addProcessingDetail('Creating non-interactive proof commitment', 'info');
        addProcessingDetail('Binding proof to device security context (ATECC608A)', 'info');
        setAuthenticationScore(65);
        setNarrativePhase(10);
        if (networkStatus === 'offline') {
          addProcessingDetail('Operating in offline mode - using cached validation rules', 'warning');
        } else {
          addProcessingDetail('Network available - initiating secure sync with cloud verification node', 'info');
        }
      },
      () => { // Step 10
        addProcessingDetail('Verifying proof locally using reference template...', 'processing');
        // Simulate a slight score variation for realism
        const similarityScore = 93 + Math.random() * 4; // e.g., 93.0 to 97.0
        const threshold = 85.0;
        addProcessingDetail(`Calculating vector cosine similarity score: ${similarityScore.toFixed(1)}%`, 'info');
        addProcessingDetail(`Comparing against dynamic threshold (current: ${threshold.toFixed(1)}%)`, 'info');
        if (similarityScore >= threshold) {
            addProcessingDetail('Similarity meets threshold', 'success');
            addProcessingDetail('Validating cryptographic integrity of the ZKP', 'info');
            setAuthenticationScore(85); // Base score for passing verification
            setNarrativePhase(11);
        } else {
            addProcessingDetail('Similarity below threshold - Verification Failed', 'error');
            setAuthenticationScore(Math.min(80, authenticationScore + 10)); // Score might rise but caps lower
            setNarrativePhase(11); // Or a specific failure phase
            // Need to handle simulation termination here
            setIsPlaying(false);
            setIsPaused(false);
             addProcessingDetail('Authentication Failed: Behavioral pattern mismatch.', 'highlight');
             // Potentially show a failure overlay or reset
             // For now, just stop the simulation
            return 'STOP_SIMULATION'; // Signal to stop processing further steps
        }
      },
      () => { // Step 11
        addProcessingDetail('Local verification successful', 'success');
        addProcessingDetail('Generating short-lived authentication token...', 'processing');
        addProcessingDetail('Applying time-based entropy (TOTP concept)', 'info');
        addProcessingDetail('Signing token with device-specific key from secure element', 'info');
        addProcessingDetail('Setting expiration (5 minutes) and scope (transaction)', 'info');
        setAuthenticationScore(95);
        setNarrativePhase(12);
      },
      () => { // Step 12
        addProcessingDetail('Authentication completed in 2.8 seconds (simulated)', 'highlight');
        addProcessingDetail('Identity confirmed with zero biometric data exposure via ZKP', 'success');
        addProcessingDetail('Granting secure access to protected resources', 'success');
        setAuthenticationScore(100);
        setShowSuccessOverlay(true);
        setIsPlaying(false); // Stop playing
        setIsPaused(false); // Ensure not paused
        setNarrativePhase(13);
        nextStepCallbackRef.current = null; // Clear callback
        setStage(0); // Reset stage visually after success shown
      }
    ];

    // --- Simulation Execution Logic ---
    let currentStep = startStep;
    // Store the initial step to prevent re-execution on resume if step logic already ran
    let stepAlreadyExecuted = false;

    const executeStep = () => {
      if (currentStep >= simulationSteps.length || !isPlaying || isPaused) {
        if (!isPaused && currentStep >= simulationSteps.length) {
           // Ensure it stops cleanly if it reaches the end
           setIsPlaying(false);
        }
        return; // Stop if completed, reset, or paused
      }

      // Execute step actions only once per step advancement
      let stopSignal = null;
      if (!stepAlreadyExecuted) {
          stopSignal = simulationSteps[currentStep]();
      }
      stepAlreadyExecuted = false; // Reset for the next step

      // Check if the step signaled to stop (e.g., verification failure)
      if (stopSignal === 'STOP_SIMULATION') {
          setIsPlaying(false);
          setIsPaused(false);
          return;
      }

      setProcessingStep(currentStep); // Update UI for current step

      // Schedule next step
      const timings = getTimings();
      const timingKeys = Object.keys(timings);
      const nextStepDelay = timings[timingKeys[currentStep]] || 1000;

      const nextStepFunc = () => {
          currentStep++;
          stepAlreadyExecuted = false; // Flag that the next step's logic needs to run
          executeStep();
      };
      nextStepCallbackRef.current = nextStepFunc; // Store for potential resume

      // Clear previous timer before setting a new one
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (isPlaying && !isPaused) { // Double check state
             nextStepFunc();
        }
      }, nextStepDelay);
    };

    // Start the execution loop correctly whether starting fresh or resuming
    if (isPlaying && !isPaused) {
        // If resuming, ensure the current step's actions don't re-run immediately
        stepAlreadyExecuted = isPaused; // If it was paused, assume action was done
        executeStep();
    }
    // Note: Resume logic is handled by the main resumeDemo function calling runSimulation again
  };


  // Narrative overlay text based on current phase
  const getNarrativeText = () => {
    // Add a default phase 0 text
    const narratives = [
        "BioMetrAfriCa transforms authentication by analyzing *how* you interact with your device, creating a unique behavioral signature. This is ideal for African markets, overcoming challenges of traditional methods like forgotten passwords or unreliable SMS OTPs.", // Phase 0
        "The onboarding process begins by establishing a secure, isolated environment (TEE) on your device. This protects the entire process from the start, ensuring your behavioral patterns are captured safely.", // Phase 1
        "Unlike scanning a fingerprint, BioMetrAfriCa passively observes natural interactions: typing rhythm, swipe gestures, even how you hold the phone. It learns your unique digital 'mannerisms'.", // Phase 2
        "Raw behavioral data is noisy. Advanced algorithms (like PCA) extract the essential, unique features, transforming messy real-world interactions into a concise mathematical representation—your behavioral essence.", // Phase 3
        "Your unique patterns are mapped into a high-dimensional 'vector space' (1536 dimensions here). Think of it as a complex digital fingerprint capturing subtle nuances of your behavior.", // Phase 4
        "Crucially, your actual behavioral data is *never* stored. Instead, Zero-Knowledge Proof templates are created. These allow verification *without revealing the underlying data*, protecting privacy even if the device is compromised.", // Phase 5
        "Onboarding complete! Your secure, privacy-preserving behavioral profile is stored locally. It will adapt over time to subtle changes in your behavior, continuously improving accuracy and security.", // Phase 6
        "Authentication starts. The system securely loads your encrypted reference profile within the protected TEE environment, preparing for the verification challenge.", // Phase 7
        "As you interact naturally (e.g., typing a username), the system captures your current behavior in real-time. No special actions needed – just use your device normally.", // Phase 8
        "Your current behavior is processed using the same feature extraction techniques as onboarding, creating a comparable mathematical vector representing your actions *right now*.", // Phase 9
        "The magic of Zero-Knowledge Proofs: A cryptographic proof is generated that mathematically demonstrates your current behavior matches the stored profile *without revealing either dataset*. This is key for privacy.", // Phase 10
        "The system verifies the ZKP locally. It calculates a similarity score against the threshold. High similarity + valid proof = strong confidence it's you. (Low similarity would trigger failure here).", // Phase 11
        "Verification passed! A secure, short-lived digital 'token' is generated. It's cryptographically signed and tied to your device, acting as a temporary access key.", // Phase 12
        "Authentication successful in under 3 seconds! Access granted securely, without exposing biometric data and resilient to network issues. This blend of security, privacy, and usability is revolutionary for the African context." // Phase 13
    ];
    return narratives[narrativePhase] || narratives[0];
  };

  // Vector database visualization component
  const VectorDBVisualization = () => {
    const [vectors, setVectors] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);
    const [searchTarget, setSearchTarget] = useState(null); // The point being searched for
    const [resultPoint, setResultPoint] = useState(null); // The found match
    const [highlightedCategory, setHighlightedCategory] = useState(null);
    const [searchComplete, setSearchComplete] = useState(false);
    const [queryTime, setQueryTime] = useState(47); // Default realistic time

    // Initialize vector points
    useEffect(() => {
      const generatePoints = () => {
        const clusters = [
          { centerX: 80, centerY: 60, count: 8, color: '#3b82f6' },  // blue (User A)
          { centerX: 150, centerY: 120, count: 6, color: '#10b981' }, // green (User B)
          { centerX: 220, centerY: 70, count: 7, color: '#f59e0b' },  // amber (User C)
          { centerX: 100, centerY: 150, count: 5, color: '#8b5cf6' }, // purple (User D)
          { centerX: 190, centerY: 180, count: 9, color: '#ec4899' }  // pink (User E)
        ];

        const points = [];
        clusters.forEach((cluster, clusterIndex) => {
          for (let i = 0; i < cluster.count; i++) {
            // Ensure points stay within reasonable bounds of the container
            const maxRadius = 25;
            const distance = Math.random() * maxRadius;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.max(10, Math.min(290, cluster.centerX + Math.cos(angle) * distance));
            const y = Math.max(10, Math.min(210, cluster.centerY + Math.sin(angle) * distance));

            points.push({
              x: x,
              y: y,
              size: 3 + Math.random() * 2,
              color: cluster.color,
              category: clusterIndex, // Represents a user/profile
              id: `point-${clusterIndex}-${i}`
            });
          }
        });
        return points;
      };
      setVectors(generatePoints());
    }, []);

    // Simulate vector search
    const simulateSearch = () => {
      if (activeSearch) return;

      setActiveSearch(true);
      setSearchComplete(false);
      setResultPoint(null); // Clear previous result

      // Pick a random existing point as the 'target' (simulates new input vector)
      const targetIndex = Math.floor(Math.random() * vectors.length);
      const targetVec = vectors[targetIndex];
      const targetCategory = targetVec.category;

      // Create a slightly offset version for the search query
      const queryVec = {
          x: Math.max(10, Math.min(290, targetVec.x + (Math.random() * 10 - 5))), // Keep query within bounds
          y: Math.max(10, Math.min(210, targetVec.y + (Math.random() * 10 - 5))), // Keep query within bounds
          size: 6,
          color: '#FFFFFF', // White search point
          isQuery: true,
      };
      setSearchTarget(queryVec); // Show the query point
      setHighlightedCategory(null); // Reset highlight initially

      const searchStartTime = performance.now();

      // Phase 1: Initial broad search / HNSW graph traversal (visual)
      setTimeout(() => {
          if (!activeSearch) return; // Check if cancelled
          setHighlightedCategory(targetCategory); // Highlight the target cluster/category

          // Phase 2: Identify closest match
          setTimeout(() => {
            if (!activeSearch) return; // Check if cancelled

              // Find the actual closest point in the target category (for demo purposes)
              const categoryPoints = vectors.filter(p => p.category === targetCategory);
              if (categoryPoints.length === 0) { // Safety check
                setActiveSearch(false);
                return;
              }
              const closestMatch = categoryPoints.reduce((closest, current) => {
                    const distCurrent = Math.hypot(current.x - queryVec.x, current.y - queryVec.y);
                    const distClosest = Math.hypot(closest.x - queryVec.x, closest.y - queryVec.y);
                    return distCurrent < distClosest ? current : closest;
                }, categoryPoints[0]); // Initialize with the first point

              const result = { ...closestMatch, isResult: true, size: 7, color: '#22c55e' }; // Green result
              setResultPoint(result);
              setSearchComplete(true);

              const searchEndTime = performance.now();
              const duration = Math.round(searchEndTime - searchStartTime);
              // Simulate realistic query time variation
              setQueryTime(Math.max(10, Math.min(80, duration + Math.random() * 30 - 15)));

              // End simulation visuals
              setTimeout(() => {
                  setActiveSearch(false);
                  setHighlightedCategory(null);
                  setSearchTarget(null);
                  // Keep result point visible slightly longer
                   setTimeout(() => {
                     setResultPoint(null);
                     setSearchComplete(false);
                   }, 1500);
              }, 2000);
          }, Math.max(200, 800 / simulationSpeed)); // Time for narrowing down
      }, Math.max(150, 600 / simulationSpeed)); // Time for initial search animation
    };

    // Cleanup search timeouts if component unmounts or search is cancelled
     useEffect(() => {
        let phase1Timeout, phase2Timeout, endTimeout1, endTimeout2;
        // Store timeouts and clear them on cleanup or if activeSearch becomes false
        // ... [implementation of timeout storage and clearing] ...

        return () => {
          // Clear all possible timeouts associated with simulateSearch
          // This is important if the component unmounts mid-search
          // Example: clearTimeout(phase1Timeout); clearTimeout(phase2Timeout); ... etc.
          setActiveSearch(false); // Ensure effects triggered by activeSearch stop
        };
     }, [activeSearch, simulationSpeed]); // Rerun effect logic if speed changes or search starts/stops


    return (
      <div className="p-4 bg-gray-800 rounded-lg flex flex-col items-center border border-gray-700">
        <div className="flex justify-between w-full mb-2 items-center">
          <span className="text-green-400 text-sm font-semibold flex items-center">
            <Database className="w-4 h-4 mr-1" />
            Behavioural Vector Database (1536D Simulated)
          </span>
          <span className="text-gray-400 text-xs flex items-center">
              <GitBranch size={12} className="mr-1"/> HNSW Index
          </span>
        </div>

        <div className="relative w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-md overflow-hidden border border-gray-700">
          {/* Vector points */}
          {vectors.map((point) => (
            <div
              key={point.id}
              className={`absolute rounded-full transition-all duration-500 ease-in-out ${
                activeSearch ?
                  (highlightedCategory === null ? 'opacity-30' : (highlightedCategory === point.category ? 'opacity-90 scale-110' : 'opacity-10'))
                  : 'opacity-70'
              }`}
              style={{
                // Use percentage for responsiveness, relative to container dimensions (approx 300x220)
                left: `${point.x / 300 * 100}%`,
                top: `${point.y / 220 * 100}%`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                backgroundColor: point.color,
                filter: `blur(0.5px)`,
                transform: 'translate(-50%, -50%)' // Center the dot on its coords
              }}
            />
          ))}

          {/* Search Target point */}
          {searchTarget && (
              <div
                className="absolute rounded-full border-2 border-white animate-pulse"
                style={{
                    left: `${searchTarget.x / 300 * 100}%`,
                    top: `${searchTarget.y / 220 * 100}%`,
                    width: '10px',
                    height: '10px',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
                    zIndex: 10 // Ensure it's above other points
                }}
              />
          )}

          {/* Search Result point */}
          {resultPoint && (
            <div
              className={`absolute rounded-full ring-2 ring-green-400 ring-offset-2 ring-offset-gray-900 transition-all duration-300`}
              style={{
                left: `${resultPoint.x / 300 * 100}%`,
                top: `${resultPoint.y / 220 * 100}%`,
                width: `10px`,
                height: `10px`,
                backgroundColor: resultPoint.color,
                transform: 'translate(-50%, -50%)', // Center on coords
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.8)',
                zIndex: 20 // Ensure it's above target and others
              }}
            />
          )}

          {/* Search animation overlay */}
          {activeSearch && !searchComplete && searchTarget && ( // Only show if target exists
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Expanding circle */}
              <div
                  className="absolute border-2 border-blue-500 rounded-full animate-ping opacity-50"
                  style={{
                      width: '30px', height: '30px',
                      left: `${searchTarget.x / 300 * 100}%`,
                      top: `${searchTarget.y / 220 * 100}%`,
                      transform: 'translate(-50%, -50%)'
                  }}
              ></div>
               {/* Secondary smaller ping */}
               <div
                  className="absolute border border-blue-400 rounded-full animate-ping opacity-30"
                  style={{
                      width: '60px', height: '60px',
                      left: `${searchTarget.x / 300 * 100}%`,
                      top: `${searchTarget.y / 220 * 100}%`,
                      animationDelay: '0.2s',
                      transform: 'translate(-50%, -50%)'
                  }}
              ></div>
            </div>
          )}
        </div>

        <div className="mt-4 w-full flex justify-between items-center">
          <button
            className={`px-3 py-2 rounded-md text-sm flex items-center transition-colors ${
              activeSearch ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={simulateSearch}
            disabled={activeSearch}
          >
            <Search className="w-4 h-4 mr-1" />
            {activeSearch ? (searchComplete ? 'Match Found!' : 'Searching...') : 'Simulate Vector Search'}
          </button>
          <div className={`text-xs flex items-center ${searchComplete ? 'text-green-400' : 'text-gray-400'}`}>
            <Clock className="w-3 h-3 mr-1" />
            Query time: {activeSearch ? (searchComplete ? `${queryTime}ms` : 'Processing...') : 'N/A'}
          </div>
        </div>
      </div>
    );
  };

  // Threat Model Visualization Modal Component
  const ThreatModelVisualization = () => {
    // Added Smartphone and Bug icons to the import list if they weren't already
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-blue-800">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-800 py-3 -mt-6 px-6 -mx-6 border-b border-gray-700 z-10">
            <h3 className="text-xl font-bold text-blue-400 flex items-center"><Shield size={20} className="mr-2"/>Threat Model Visualization</h3>
            <button
              onClick={() => setShowThreatModel(false)}
              className="bg-gray-700 rounded-full p-1.5 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X size={18} className="text-gray-300" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Comparison Section */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="text-green-400 mb-3 font-medium">Traditional Authentication vs. BioMetrAfriCa</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional */}
                <div className="bg-red-900/20 p-3 rounded-lg border border-red-700">
                  <p className="text-white font-medium mb-2 flex items-center"><X className="text-red-400 mr-1" size={16}/>Traditional Systems (Passwords/PINs)</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <AlertTriangle className="text-red-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Static credentials (can be stolen, guessed, phished, shared, forgotten).</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="text-red-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Single point of failure: compromise leads to account takeover.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="text-red-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>High user friction (resets, complex requirements) & support costs.</span>
                    </li>
                     <li className="flex items-start">
                      <AlertTriangle className="text-red-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Vulnerable to SMS OTP interception/unreliability in Africa.</span>
                    </li>
                  </ul>
                </div>
                {/* BioMetrAfriCa */}
                <div className="bg-green-900/20 p-3 rounded-lg border border-green-700">
                  <p className="text-white font-medium mb-2 flex items-center"><Check className="text-green-400 mr-1" size={16}/>BioMetrAfriCa Protection</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Dynamic behavioral patterns (cannot be easily stolen/shared/forgotten).</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Continuous implicit verification detects anomalies & takeover attempts.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Zero-Knowledge Proofs: Verify identity without exposing behavioral data.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Offline capability overcomes network unreliability challenges.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Attack Vectors Section */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="text-green-400 mb-3 font-medium">Common Attack Vectors & Mitigations</h4>
              <div className="space-y-3 text-sm">
                {[
                  { attack: "Replay Attacks", mitigation: "Dynamic session binding, time-based challenges, nonces in ZKP.", icon: RefreshCw },
                  { attack: "Man-in-the-Middle (MitM)", mitigation: "TLS encryption, channel binding, device attestation via Secure Element.", icon: Network }, // Using Network icon
                  { attack: "Template Database Theft", mitigation: "ZKP verification means stored templates are useless without the user's live interaction; templates themselves reveal no PII.", icon: Database },
                  { attack: "Behavioral Mimicry/Impersonation", mitigation: "Multi-modal fusion (7+ dimensions), continuous adaptation, anomaly detection thresholds.", icon: Users }, // Using Users icon
                  { attack: "Side-Channel Attacks", mitigation: "Processing within hardware TEE (Trusted Execution Environment), constant-time cryptographic operations.", icon: Cpu },
                  { attack: "Device Theft/Loss", mitigation: "Device-bound keys in Secure Element, optional secondary factor, remote profile wipe capabilities.", icon: Smartphone },
                  { attack: "Malware/RATs", mitigation: "TEE isolation limits malware access to raw sensor data and processing; behavioral analysis can detect automated interaction.", icon: Bug }
                ].map(({ attack, mitigation, icon: Icon }) => (
                  <div key={attack} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start md:items-center">
                    <div className="md:col-span-1 bg-gray-800 p-2 rounded flex items-center">
                      <Icon className="text-red-400 mr-2 flex-shrink-0" size={16} />
                      <p className="text-red-400 font-medium">{attack}</p>
                    </div>
                    <div className="md:col-span-2 bg-gray-800 p-2 rounded">
                      <p className="text-green-400">{mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Context Section */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="text-green-400 mb-3 font-medium">Regional Security Context (West Africa Example)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Challenges */}
                <div>
                  <p className="text-white font-medium mb-2 flex items-center"><AlertTriangle className="text-amber-400 mr-1" size={16}/>Regional Authentication Challenges</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <WifiOff className="text-amber-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Unreliable/costly connectivity hinders SMS/online checks.</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="text-amber-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Lack of formal ID documents creates onboarding barriers.</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="text-amber-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Device sharing complicates user-specific auth.</span>
                    </li>
                     <li className="flex items-start">
                      <Smartphone className="text-amber-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Prevalence of lower-end devices limits complex computations.</span>
                    </li>
                  </ul>
                </div>
                {/* Adaptations */}
                <div>
                  <p className="text-white font-medium mb-2 flex items-center"><Zap className="text-green-400 mr-1" size={16}/>BioMetrAfriCa Regional Adaptations</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Full offline authentication capability addresses connectivity gaps.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Self-sovereign identity model: user *is* the identity, no docs needed.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Behavioral profiles inherently distinguish between different users on shared devices.</span>
                    </li>
                     <li className="flex items-start">
                      <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span>Optimized algorithms (TF Lite, C++) run efficiently on low-spec hardware.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowThreatModel(false)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Close Visualization
            </button>
          </div>
        </div>
      </div>
    );
  };


  // Technical Details Tab Content
  const renderTechnicalDetails = () => (
    <div className="p-4 text-sm text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
        <Code size={20} className="mr-2"/>Implementation Specifications
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Hardware */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Cpu size={18} className="mr-2"/>Target Hardware Profile (Demo Platform: RPi 4)</h4>
          <ul className="space-y-2">
            <li><Cpu size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Low-power ARM CPU suitable for edge/mobile simulation. 4GB allows running ML models locally.">CPU: Quad-core Cortex-A72 (ARM v8)</Tooltip></li>
            <li><Layers size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Sufficient RAM for local processing, TEE emulation, and vector caching.">RAM: 4GB LPDDR4</Tooltip></li>
            <li><Fingerprint size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Represents diverse sensors capturing behavioral data (typing, touch, motion). GT-521F52 used for physical fingerprint comparison baseline (not primary auth).">Sensors: Touchscreen, MPU-6050 (Accel/Gyro)</Tooltip></li>
            <li><Lock size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Hardware root of trust for secure key storage and cryptographic operations, crucial for device binding and ZKP signing.">Secure Element: ATECC608A (or TEE equivalent)</Tooltip></li>
            <li><Wifi size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Supports offline operation and local caching/sync.">Connectivity: Wi-Fi / Ethernet (handles intermittent connection)</Tooltip></li>
          </ul>
        </div>

        {/* Performance */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Zap size={18} className="mr-2"/>Runtime Performance (Simulated on RPi 4)</h4>
          <ul className="space-y-2">
            <li><Clock size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Total time for initial behavioral capture, feature extraction, ZKP template generation, and secure local storage.">Onboarding Time: ~4.7 seconds</Tooltip></li>
            <li><Clock size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Total time for live capture, feature extraction, ZKP generation, local verification, and token issuance. Optimized for sub-3-second user experience.">Authentication Time: ~2.8 seconds</Tooltip></li>
            <li><Search size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Latency for local vector similarity search using FAISS/HNSW index. Critical for responsiveness.">Local Vector Search: 10-30ms</Tooltip></li>
            <li><Shield size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Computational cost of generating the Bulletproofs ZKP on device. The most intensive step.">ZKP Generation: ~900ms</Tooltip></li>
            <li><Lock size={14} className="inline mr-1 text-gray-400"/> <Tooltip info="Time to sign the auth token using the secure element after successful verification.">Secure Token Generation: ~450ms</Tooltip></li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        {/* Software Stack */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Layers size={18} className="mr-2"/>Software Stack</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white font-semibold mb-2">Core Systems</p>
              <ul className="text-xs space-y-1">
                <li><GitBranch size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Lightweight Linux distribution optimized for ARM, providing stable base.">OS: Raspbian OS (64-bit) / Android (Target)</Tooltip></li>
                <li><Code size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Primary language for orchestration and ML, leveraging rich libraries.">Runtime: Python 3.10 / Kotlin (Android)</Tooltip></li>
                <li><Cpu size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Used for performance-critical crypto (ZKP, BLS) and sensor processing.">Native Modules: C++ (via PyBind11/JNI)</Tooltip></li>
                <li><Database size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Lightweight encrypted local database for storing ZKP templates securely.">Local Storage: SQLite + SQLCipher</Tooltip></li>
                <li><Shield size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Provides secure isolated execution environment (simulated or hardware-based).">Security: TEE (OP-TEE / Trusty)</Tooltip></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Authentication & ML</p>
              <ul className="text-xs space-y-1">
                <li><Lock size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Efficient Zero-Knowledge Proof system for verifying behavior without revealing it.">ZKP Library: Bulletproofs Implementation (Rust/C++)</Tooltip></li>
                <li><Award size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Short, aggregatable signatures for template integrity checks.">Signatures: BLS Scheme</Tooltip></li>
                <li><Radio size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Direct, low-level access to sensor data for high-fidelity behavioral capture.">Sensor Interface: PiGPIO / Android Sensor API</Tooltip></li>
                <li><Brain size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Optimized ML framework for on-device feature extraction and embedding generation.">ML Model: TensorFlow Lite (Custom Trained)</Tooltip></li>
                <li><Target size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Libraries for vector operations and similarity calculations.">Math Libraries: NumPy, SciPy</Tooltip></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vector DB */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Database size={18} className="mr-2"/>Vector Database Integration</h4>
          <p className="text-xs mb-3">Hybrid approach: Local cache for speed & offline, optional cloud sync for consistency across devices.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-white font-semibold mb-2">Local Vector Cache</p>
              <ul className="text-xs space-y-1">
                <li><Search size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Efficient local ANN library for fast similarity searches on device.">Indexing: FAISS (IndexFlatL2, IndexHNSW)</Tooltip></li>
                <li><Layers size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="High-dimensional space to capture complex behavioral nuances.">Dimensions: 1536D</Tooltip></li>
                <li><GitBranch size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Measures angle between vectors, robust to magnitude variations.">Similarity Metric: Cosine Similarity</Tooltip></li>
                <li><Lock size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Index stored within the encrypted SQLite DB for security.">Storage: Encrypted SQLite Blob</Tooltip></li>
                <li><WifiOff size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Allows authentication without internet connection.">Offline Capability: Yes</Tooltip></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Cloud Synchronization (Optional)</p>
              <ul className="text-xs space-y-1">
                <li><Server size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Scalable managed vector database for cross-device profile consistency.">Cloud Provider: Pinecone (Serverless)</Tooltip></li>
                <li><GitBranch size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Industry-standard efficient ANN algorithm for cloud scale.">Indexing Algorithm: HNSW</Tooltip></li>
                <li><Lock size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Secure communication using standard protocols.">Communication: HTTPS + Token Auth</Tooltip></li>
                <li><EyeOff size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="Only encrypted ZKP templates or derived hashes are synced, never raw data.">Data Synced: Encrypted Templates/Hashes</Tooltip></li>
                <li><RefreshCw size={12} className="inline mr-1 text-gray-400"/> <Tooltip info="System prioritizes local verification; cloud is for sync/backup.">Model: Offline-First</Tooltip></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Model Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowThreatModel(true)}
          className="px-4 py-2 bg-blue-700 text-white rounded-md flex items-center mx-auto hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        >
          <Shield className="mr-2" size={16} />
          View Threat Model Visualization
        </button>
      </div>
    </div>
  );

  // Metrics Tab Content
  const renderMetricsTab = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
        <PieChart size={20} className="mr-2"/>Performance & Security Metrics
      </h3>

      <div className="space-y-6">
        {/* Timing Breakdown */}
        <div>
          <h4 className="text-green-400 mb-2 font-medium">Authentication Timing Breakdown (Simulated ~2.8s Total)</h4>
          <div className="relative h-10 bg-gray-800 rounded-lg overflow-hidden w-full mb-1 border border-gray-700">
            {/* Capture: 500ms (17.9%) */}
            <div className="absolute h-full bg-blue-600" style={{left: '0%', width: '17.9%'}}><Tooltip info="Capture (500ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">Capture</span></Tooltip></div>
            {/* Process: 400ms (14.3%) */}
            <div className="absolute h-full bg-purple-600" style={{left: '17.9%', width: '14.3%'}}><Tooltip info="Process (400ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">Process</span></Tooltip></div>
            {/* ZKP Gen: 900ms (32.1%) */}
            <div className="absolute h-full bg-yellow-600" style={{left: '32.2%', width: '32.1%'}}><Tooltip info="ZKP Gen (900ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-black font-medium">ZKP Gen</span></Tooltip></div>
            {/* Verify: 350ms (12.5%) */}
            <div className="absolute h-full bg-green-600" style={{left: '64.3%', width: '12.5%'}}><Tooltip info="Verify (350ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">Verify</span></Tooltip></div>
            {/* Token Gen: 450ms (16.1%) */}
            <div className="absolute h-full bg-red-600" style={{left: '76.8%', width: '16.1%'}}><Tooltip info="Token Gen (450ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">Token</span></Tooltip></div>
             {/* Overhead: ~200ms (7.1%) */}
            <div className="absolute h-full bg-gray-600" style={{left: '92.9%', width: '7.1%'}}><Tooltip info="Network/System Overhead (~200ms)"><span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">...</span></Tooltip></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>0ms</span><span>500ms</span><span>1000ms</span><span>1500ms</span><span>2000ms</span><span>2500ms</span><span>~2800ms</span>
          </div>
        </div>

        {/* Security & Resource Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-green-400 mb-3 font-medium flex items-center"><Shield size={18} className="mr-2"/>Security Metrics (Projected)</h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="flex justify-between mb-1 items-center">
                  <Tooltip info="Rate at which an imposter is incorrectly accepted as a legitimate user. Lower is better."><span className="text-gray-300">False Acceptance Rate (FAR)</span></Tooltip>
                  <span className="font-medium text-green-400">~0.01%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '0.01%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Rate at which a legitimate user is incorrectly rejected. Lower is better."><span className="text-gray-300">False Rejection Rate (FRR)</span></Tooltip>
                  <span className="font-medium text-yellow-400">~1.5%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '1.5%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="The rate where FAR equals FRR. A common measure of overall accuracy. Lower is better."><span className="text-gray-300">Equal Error Rate (EER)</span></Tooltip>
                  <span className="font-medium text-blue-400">~0.8%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{width: '0.8%'}}></div></div>
              </div>
               <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Estimated computational effort required for a successful brute-force or mimicry attack, considering ZKP and multi-modal behavioral complexity."><span className="text-gray-300">Attack Resistance (Est.)</span></Tooltip>
                  <span className="font-medium text-green-400">Very High</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2.5 rounded-full" style={{width: '98%'}}></div></div>
              </div>
            </div>
          </div>

          {/* Resource Usage */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-green-400 mb-3 font-medium flex items-center"><Cpu size={18} className="mr-2"/>Resource Usage (Target Device)</h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Peak CPU load during intensive operations like ZKP generation or ML inference."><span className="text-gray-300">CPU Usage (Peak)</span></Tooltip>
                  <span className="font-medium text-yellow-400">~60-75%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '70%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Typical memory footprint during authentication. Varies with model complexity."><span className="text-gray-300">RAM Usage</span></Tooltip>
                  <span className="font-medium text-green-400">~80-150MB</span>
                </div>
                {/* Assuming 2GB RAM typical target */}
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '7.5%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Storage space required per user for encrypted ZKP templates and cached data. Very small."><span className="text-gray-300">Storage per User Profile</span></Tooltip>
                  <span className="font-medium text-green-400">~20-30KB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '0.1%'}}></div></div>
              </div>
               <div>
                <div className="flex justify-between mb-1 items-center">
                   <Tooltip info="Impact on battery life due to background monitoring and authentication process. Optimized for low impact."><span className="text-gray-300">Battery Impact</span></Tooltip>
                  <span className="font-medium text-green-400">Low</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '10%'}}></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Vector DB Performance */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Database size={18} className="mr-2"/>Vector Database Performance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Local Cache */}
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="text-white font-semibold mb-2 flex items-center"><Server className="mr-1" size={16}/>Local Cache (FAISS/HNSW)</p>
              <ul className="text-xs space-y-1">
                <li className="flex justify-between items-center">
                  <Tooltip info="Time to find nearest neighbors locally."><span>Avg. Query Latency:</span></Tooltip>
                  <span className="text-green-400 font-medium">15ms</span>
                </li>
                <li className="flex justify-between items-center">
                  <Tooltip info="Practical limit based on typical device RAM."><span>Max Vectors (Est.):</span></Tooltip>
                  <span className="text-green-400 font-medium">~10k-50k</span>
                </li>
                <li className="flex justify-between items-center">
                  <Tooltip info="Accuracy of finding the true top K neighbors."><span>Recall@10:</span></Tooltip>
                  <span className="text-green-400 font-medium">~98%</span>
                </li>
                {/* Corrected Tooltip closing tag */}
                <li className="flex justify-between items-center">
                  <Tooltip info="Works without internet connection.">
                      <span>Offline Capable:</span>
                  </Tooltip>
                  <span className="text-green-400 font-medium flex items-center">
                      <Check size={14} className="mr-1"/>Yes
                  </span>
                </li>
              </ul>
            </div>
            {/* Cloud */}
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="text-white font-semibold mb-2 flex items-center"><Globe className="mr-1" size={16}/>Cloud (Pinecone - Optional)</p>
              <ul className="text-xs space-y-1">
                <li className="flex justify-between items-center">
                  <Tooltip info="Time to query cloud DB (includes network latency)."><span>Avg. Query Latency:</span></Tooltip>
                  <span className="text-yellow-400 font-medium">~50ms</span>
                </li>
                 <li className="flex justify-between items-center">
                  <Tooltip info="Effectively unlimited scaling in the cloud."><span>Max Vectors:</span></Tooltip>
                  <span className="text-green-400 font-medium">Scalable</span>
                </li>
                <li className="flex justify-between items-center">
                  <Tooltip info="Accuracy of finding the true top K neighbors."><span>Recall@10:</span></Tooltip>
                  <span className="text-green-400 font-medium">~99%</span>
                </li>
                {/* Corrected Tooltip closing tag */}
                <li className="flex justify-between items-center">
                    <Tooltip info="Requires internet connection for sync/query.">
                        <span>Offline Capable:</span>
                    </Tooltip>
                    <span className="text-red-400 font-medium flex items-center">
                        <X size={14} className="mr-1"/>No
                    </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Deployment Metrics */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center"><Globe size={18} className="mr-2"/>African Market Deployment Metrics (Projected Pilot Results)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Ghana */}
            <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
              <p className="text-white font-medium text-center mb-2">Ghana <span role="img" aria-label="Ghana Flag">🇬🇭</span></p>
              <ul className="text-xs space-y-1.5">
                <li className="flex justify-between items-center"><Tooltip info="Successful authentications / Total attempts"><span>Success Rate:</span></Tooltip> <span className="text-green-400 font-medium">98.5%</span></li>
                <li className="flex justify-between items-center"><Tooltip info="Average time from initiation to success/fail"><span>Avg. Auth Time:</span></Tooltip> <span className="text-green-400 font-medium">2.9s</span></li>
                <li className="flex justify-between items-center"><Tooltip info="% of authentications performed while device offline"><span>Offline Usage:</span></Tooltip> <span className="text-yellow-400 font-medium">42%</span></li>
                <li className="flex justify-between items-center"><Tooltip info="Users opting for behavioral auth over PIN/Password"><span>Adoption Rate:</span></Tooltip> <span className="text-green-400 font-medium">76%</span></li>
              </ul>
            </div>
            {/* Nigeria */}
             <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
              <p className="text-white font-medium text-center mb-2">Nigeria <span role="img" aria-label="Nigeria Flag">🇳🇬</span></p>
               <ul className="text-xs space-y-1.5">
                <li className="flex justify-between items-center"><span>Success Rate:</span> <span className="text-green-400 font-medium">97.8%</span></li>
                <li className="flex justify-between items-center"><span>Avg. Auth Time:</span> <span className="text-green-400 font-medium">3.1s</span></li>
                <li className="flex justify-between items-center"><span>Offline Usage:</span> <span className="text-yellow-400 font-medium">38%</span></li>
                <li className="flex justify-between items-center"><span>Adoption Rate:</span> <span className="text-green-400 font-medium">81%</span></li>
              </ul>
            </div>
            {/* Kenya */}
             <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
              <p className="text-white font-medium text-center mb-2">Kenya <span role="img" aria-label="Kenya Flag">🇰🇪</span></p>
               <ul className="text-xs space-y-1.5">
                <li className="flex justify-between items-center"><span>Success Rate:</span> <span className="text-green-400 font-medium">99.1%</span></li>
                <li className="flex justify-between items-center"><span>Avg. Auth Time:</span> <span className="text-green-400 font-medium">2.6s</span></li>
                <li className="flex justify-between items-center"><span>Offline Usage:</span> <span className="text-yellow-400 font-medium">23%</span></li>
                <li className="flex justify-between items-center"><span>Adoption Rate:</span> <span className="text-green-400 font-medium">89%</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Simple Explanation Tab Content
  const renderSimpleExplanation = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
          <Brain size={20} className="mr-2"/>Simple Explanation: How BioMetrAfriCa Works
      </h3>

      {/* Authentication Process */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
        <h4 className="text-green-400 mb-3 font-medium flex items-center">
          <Clock className="mr-2" size={18} />
          Logging In Without Passwords (in less than 3 seconds!)
        </h4>
        <p className="text-gray-300 mb-4 text-sm">
          Think of BioMetrAfriCa like a super-smart security guard who recognizes you not by your face, but by *how you walk* and *how you talk*. It learns your unique digital habits—how you type, swipe, and hold your phone.
        </p>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start bg-gray-700 p-3 rounded-lg border border-gray-600">
             <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3"><span className="text-white font-bold text-xl">1</span></div>
            <div>
              <h5 className="text-blue-300 font-semibold mb-1">Watch & Learn (0.5 sec)</h5>
              <p className="text-sm text-gray-300">
                When you use your phone (like typing your name), the system quickly observes your actions. It's like noticing your unique typing speed or the way you tap the screen. Super fast!
              </p>
            </div>
          </div>
          {/* Step 2 */}
           <div className="flex items-start bg-gray-700 p-3 rounded-lg border border-gray-600">
             <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3"><span className="text-white font-bold text-xl">2</span></div>
            <div>
              <h5 className="text-purple-300 font-semibold mb-1">Find the Pattern (0.4 sec)</h5>
              <p className="text-sm text-gray-300">
                It takes what it saw and pulls out the most important bits that make your behavior unique. Like finding the key features in a drawing that make it look like you.
              </p>
            </div>
          </div>
           {/* Step 3 */}
           <div className="flex items-start bg-gray-700 p-3 rounded-lg border border-gray-600">
             <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-3"><span className="text-white font-bold text-xl">3</span></div>
            <div>
              <h5 className="text-yellow-300 font-semibold mb-1">Create the Proof (0.9 sec)</h5>
              <p className="text-sm text-gray-300">
                This is the magic trick! It creates a special code (a "Zero-Knowledge Proof") that proves it's you *without* actually showing your private behavioral patterns to anyone. It's like proving you know a secret handshake without actually showing the handshake. This clever math takes the longest.
              </p>
            </div>
          </div>
           {/* Step 4 */}
            <div className="flex items-start bg-gray-700 p-3 rounded-lg border border-gray-600">
             <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3"><span className="text-white font-bold text-xl">4</span></div>
            <div>
              <h5 className="text-green-300 font-semibold mb-1">Check the Match (0.35 sec)</h5>
              <p className="text-sm text-gray-300">
                The system checks if the special code matches the one it securely remembers for you. It confirms the 'proof' is valid and your behavior is similar enough. If it's a match, you're in!
              </p>
            </div>
          </div>
           {/* Step 5 */}
           <div className="flex items-start bg-gray-700 p-3 rounded-lg border border-gray-600">
             <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3"><span className="text-white font-bold text-xl">5</span></div>
            <div>
              <h5 className="text-red-300 font-semibold mb-1">Get the Access Ticket (0.45 sec)</h5>
              <p className="text-sm text-gray-300">
                If everything checks out, you get a temporary digital 'ticket' (a token). This ticket lets you use the app or service for a short time without needing to prove yourself again immediately.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mt-5 text-sm">
          The whole process is quick, secure, and happens naturally as you use your device. No more forgotten passwords! And because it uses Zero-Knowledge Proofs, your actual behavior patterns stay private.
        </p>
      </div>

      {/* Vector Database Explanation */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="text-green-400 mb-3 font-medium flex items-center">
          <Search className="mr-2" size={18} />
          What's the Vector Database? (The Super-Fast Matching System)
        </h4>
        <p className="text-gray-300 mb-4 text-sm">
          Imagine turning your unique behavior patterns into a special point on a giant, invisible map. The vector database is like a super-fast GPS for this map.
        </p>

        <div className="space-y-3 text-sm">
          <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
            <p>
              When you log in, the system creates a new point on the map representing your *current* behavior. The vector database needs to find the point it already stored for you (your reference point) on that huge map.
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
            <p>
              Instead of checking every single point (which would be slow!), it uses clever shortcuts (like the HNSW index) to instantly narrow down the search to the right neighborhood on the map. It finds the closest matching point incredibly fast – often in less time than it takes to blink!
            </p>
             <p className="mt-2 text-xs text-gray-400">
                (The demo simulation shows this process: the blue 'ping' is the search starting, it quickly focuses on the right colored cluster, and the green dot shows the match found).
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
            <p>
              A small version of this map is kept right on your phone, so BioMetrAfriCa can recognize you even if you have no internet. This makes it perfect for places where the network isn't always reliable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // OSI Model Tab Content
  const renderOSIModel = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
          <Layers size={20} className="mr-2"/>BioMetrAfriCa Integration Across the OSI Model
      </h3>

      <p className="mb-4 text-sm">
        BioMetrAfriCa isn't confined to a single layer. It integrates across multiple OSI layers to provide robust, context-aware security that understands both the application context and the underlying network realities, particularly relevant in African environments.
      </p>

      {/* OSI Layers */}
      <div className="relative bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex flex-col space-y-2">
          {[
            { layer: 7, name: "Application", color: "blue", description: "Primary integration point. Captures behavioral inputs from user interactions within apps (e.g., typing, swiping). Provides authentication results (tokens) to the application logic. Risk scoring based on application context (e.g., high-value transaction).", integration: "Primary" },
            { layer: 6, name: "Presentation", color: "indigo", description: "Handles data formatting and encryption relevant to authentication. ZKP generation occurs here, transforming raw features into privacy-preserving proofs. Token formatting and encryption/signing managed at this layer.", integration: "Primary" },
            { layer: 5, name: "Session", color: "purple", description: "Manages the authenticated session lifecycle. Authentication tokens generated by BioMetrAfriCa control session establishment, maintenance (via continuous checks or token validity), and termination. Detects session hijacking attempts through behavioral drift.", integration: "Primary" },
            { layer: 4, name: "Transport", color: "pink", description: "Ensures reliable and secure transmission of authentication data (ZKP challenges/responses, tokens) if cloud interaction is needed. Operates over TLS/SSL to protect data in transit. Can adapt to packet loss/latency typical in some regions.", integration: "Secondary" },
            { layer: 3, name: "Network", color: "red", description: "Less direct integration. Can potentially leverage IP address/geolocation as a weak contextual factor. Primarily relies on layers above for core logic, but must function despite network layer instability (offline mode).", integration: "Contextual" },
            { layer: 2, name: "Data Link", color: "orange", description: "Generally no direct interaction. Assumes underlying link layer connectivity (WiFi, Cellular) exists but may be intermittent. Hardware MAC address could be a minor factor in device fingerprinting.", integration: "Minimal" },
            { layer: 1, name: "Physical", color: "yellow", description: "No direct interaction. Relies on physical layer sensors (touchscreen, accelerometer) managed by the OS/hardware drivers accessed via Application/Presentation layer interfaces.", integration: "None" }
          ].map(item => (
            <div key={item.layer} className={`bg-${item.color}-900/30 p-3 rounded-lg border border-${item.color}-700 relative transition-all hover:border-${item.color}-500 hover:bg-${item.color}-900/50`}>
              <div className={`font-bold text-${item.color}-300 mb-1 flex items-center`}>
                <span className={`bg-${item.color}-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-xs`}>{item.layer}</span>
                {item.name} Layer
              </div>
              <p className="text-sm ml-8">{item.description}</p>
              <div className={`absolute right-3 top-3 text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.integration === "Primary" ? 'bg-green-600 text-white' :
                  item.integration === "Secondary" ? 'bg-blue-600 text-white' :
                  item.integration === "Contextual" ? 'bg-yellow-600 text-black' :
                  item.integration === "Minimal" ? 'bg-gray-600 text-gray-300' :
                  'bg-red-600 text-white'
              }`}>
                  {item.integration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Context */}
      <div className="bg-gray-800 p-4 rounded-lg mt-6 border border-gray-700">
        <h4 className="text-green-400 mb-3 font-medium">Why Multi-Layer Matters</h4>
        <p className="text-sm mb-3">
          Integrating across layers allows BioMetrAfriCa to build a richer, more resilient security profile. For example, inconsistent network behavior (Layers 3/4) combined with unusual application interaction (Layer 7) might indicate a more sophisticated threat than either signal alone.
        </p>
        <p className="text-sm italic">
          "Effective continuous authentication systems often leverage cross-layer information to build a holistic view of user and device state, improving detection accuracy against complex attacks." <span className="text-xs not-italic text-gray-400">— Adapted from various security research principles.</span>
        </p>
         <p className="text-sm mt-3">
          This approach is particularly vital in diverse African markets where network conditions (Layers 3/4) can fluctuate, requiring robust handling at higher layers (e.g., offline mode at Layer 7, session management at Layer 5) to maintain usability and security.
        </p>
      </div>
    </div>
  );

  // IP & Business Model Tab Content
  const renderIPBusiness = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
          <Briefcase size={20} className="mr-2"/>IP Defensibility & Business Model
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Proprietary Data Assets */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <Database className="mr-2" size={18} /> Proprietary Data & Models
          </h4>
          <p className="mb-3 text-sm">
            Core IP lies in the continuously refined behavioral models trained on diverse African user interaction data. This dataset captures regional nuances (e.g., typing patterns influenced by local languages, device handling on boda-bodas) that generic models miss.
          </p>
          <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-700 space-y-2">
             <p className="text-white font-semibold text-sm">Key Differentiators:</p>
             <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-blue-400 flex-shrink-0" /> <Tooltip info="Models specifically tuned to account for linguistic influences on typing rhythm and common input methods in regions like West Africa."><strong>Regionally-Adapted Feature Weights:</strong> Prioritizes behavioral dimensions most distinctive in target African demographics.</Tooltip></p>
             <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-blue-400 flex-shrink-0" /> <Tooltip info="Algorithms designed to filter out noise from bumpy transport or variable network conditions, common in many African contexts."><strong>Environmental Noise Filtering:</strong> Robustness against contextual factors like unstable holding patterns or intermittent sensor data.</Tooltip></p>
             <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-blue-400 flex-shrink-0" /> <Tooltip info="The system learns and adapts not just to individual drift but also to emerging regional behavioral trends."><strong>Longitudinal African Behavioral Baselines:</strong> Understanding of how patterns evolve specifically within these user groups.</Tooltip></p>
          </div>
        </div>

        {/* Technical Protections */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <Lock className="mr-2" size={18} /> Technical IP Protections
          </h4>
          <p className="text-sm mb-3">Multiple layers protect the core algorithms and implementation:</p>
          <div className="space-y-3">
            <div className="bg-green-900/20 p-3 rounded-lg border border-green-700">
              <p className="text-white font-semibold text-sm mb-1">Algorithmic & Cryptographic</p>
              <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-green-400 flex-shrink-0" /> <Tooltip info="The specific combination and weighting of the 7+ behavioral features used for the 1536D embedding is proprietary."><strong>Novel Feature Fusion Algorithm:</strong> Unique combination of behavioral inputs.</Tooltip></p>
              <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-green-400 flex-shrink-0" /> <Tooltip info="The custom implementation of Bulletproofs optimized for speed and low resource usage on target devices."><strong>Optimized ZKP Implementation:</strong> Efficient zero-knowledge proof scheme tailored for behavioral data.</Tooltip></p>
            </div>
            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-700">
              <p className="text-white font-semibold text-sm mb-1">Implementation Safeguards</p>
               <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-purple-400 flex-shrink-0" /> <Tooltip info="Code obfuscation and anti-tampering techniques make reverse engineering the client-side logic difficult."><strong>Client-Side Obfuscation & Anti-Tamper:</strong> Protects the app code.</Tooltip></p>
               <p className="text-xs flex items-start"><Check size={14} className="mr-1 mt-0.5 text-purple-400 flex-shrink-0" /> <Tooltip info="Secure element integration binds authentication to specific hardware, preventing easy cloning."><strong>Hardware Binding (TEE/SE):</strong> Anchors security in tamper-resistant hardware.</Tooltip></p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
         {/* Business Defensibility */}
         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-green-400 mb-3 font-medium flex items-center">
                <Zap size={18} className="mr-2"/> Business Defensibility & Network Effects
            </h4>
             <p className="mb-3 text-sm">
                Competitive advantage strengthens over time through data network effects and ecosystem integration:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-700">
                    <p className="text-white font-semibold text-sm mb-1">Data Flywheel</p>
                    <p className="text-xs">More users → More diverse African behavioral data → Better, more accurate regional models → Improved user experience & security → Attracts more users. This creates a significant barrier to entry.</p>
                </div>
                 <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-700">
                    <p className="text-white font-semibold text-sm mb-1">Ecosystem Integration</p>
                    <p className="text-xs">Partnerships with Mobile Money Operators (MMOs), banks, and fintechs in Africa create lock-in. Offering a compliant, proven solution tailored to their needs makes switching costly.</p>
                </div>
            </div>
             <p className="text-sm mt-3">
                <Info size={14} className="inline mr-1 text-gray-400" /> <Tooltip info="Built-in compliance with data protection regulations like Ghana's DPA and GDPR principles (applied locally) provides a trusted solution for regulated industries (finance, health)."><strong>Regulatory Compliance:</strong> Adherence to African data privacy laws (e.g., Ghana DPA, NDPR) provides a key advantage in regulated sectors.</Tooltip>
            </p>
        </div>

        {/* Patent Potential */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <Award className="mr-2" size={18} /> Patent & Innovation Focus
          </h4>
          <p className="mb-3 text-sm">
            Potential patentable areas focus on the unique *application* and *optimization* for the African context:
          </p>
          <ul className="space-y-2 text-xs list-disc list-inside marker:text-blue-400">
             <li><Tooltip info="Novel method combining specific behavioral inputs, regional calibration, and noise filtering for robust authentication in variable African contexts."><strong>Contextual Behavioral Authentication Method:</strong> Tailored for specific regional interaction patterns and environmental factors.</Tooltip></li>
             <li><Tooltip info="System using optimized ZKPs on constrained devices for local, privacy-preserving behavioral verification, enabling secure offline use."><strong>Privacy-Preserving Offline Verification System:</strong> Efficient ZKP on-device for secure, offline behavioral checks.</Tooltip></li>
             <li><Tooltip info="Algorithm to distinguish multiple users on shared devices by clustering behaviors and dynamically adjusting thresholds."><strong>Adaptive Profiling for Shared Devices:</strong> Differentiates users based on behavioral clusters.</Tooltip></li>
          </ul>
        </div>

        {/* Business Model */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <GitBranch className="mr-2" size={18} /> Tiered Business Model (B2B Focus)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1 */}
            <div className="bg-gray-700 p-3 rounded-lg border border-blue-600 flex flex-col">
              <h5 className="text-blue-400 mb-2 text-center font-semibold">Foundation SDK</h5>
              <ul className="text-xs space-y-1 flex-grow">
                <li>• Local-only authentication</li>
                <li>• Core behavioral modalities (e.g., typing, touch)</li>
                <li>• Offline functionality</li>
                <li>• Basic TEE/SE integration</li>
                 <li>• Usage-limited free tier for developers / Startups</li>
              </ul>
               <p className="text-center text-blue-300 mt-2 text-sm font-medium">Freemium / Low Tier</p>
            </div>
            {/* Tier 2 */}
            <div className="bg-gray-700 p-3 rounded-lg border border-green-600 flex flex-col">
              <h5 className="text-green-400 mb-2 text-center font-semibold">Enterprise Platform</h5>
              <ul className="text-xs space-y-1 flex-grow">
                <li>• Cloud-sync & cross-device</li>
                <li>• All behavioral modalities</li>
                <li>• Advanced regional models</li>
                <li>• Continuous authentication</li>
                <li>• Analytics & reporting dashboard</li>
              </ul>
              <p className="text-center text-green-300 mt-2 text-sm font-medium">Subscription (Per MAU)</p>
            </div>
            {/* Tier 3 */}
             <div className="bg-gray-700 p-3 rounded-lg border border-purple-600 flex flex-col">
              <h5 className="text-purple-400 mb-2 text-center font-semibold">Financial Services API</h5>
              <ul className="text-xs space-y-1 flex-grow">
                <li>• Enterprise Features +</li>
                <li>• Risk-based authentication API</li>
                <li>• Transaction signing/verification</li>
                <li>• Enhanced compliance features</li>
                <li>• Dedicated support & SLA</li>
              </ul>
              <p className="text-center text-purple-300 mt-2 text-sm font-medium">Per API Call / Transaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Research Tab Content
  const renderResearchTab = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
        <BookOpen size={20} className="mr-2"/>Research Foundation & Validation
      </h3>

      {/* Core Concepts */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
        <h4 className="text-green-400 mb-3 font-medium flex items-center">
          <Brain className="mr-2" size={18} /> Core Research Foundations
        </h4>
        <div className="space-y-4 text-sm">
           {/* Behavioral Biometrics */}
           <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="italic text-gray-300 mb-2">
                "Behavioral biometrics leverage unique patterns in human actions (keystroke dynamics, gait, mouse movements, touchscreen interactions) for authentication... offering advantages like continuous verification and user transparency."
                </p>
                <p className="text-xs text-gray-400">
                  — Shuford, J. (2024). Exploring the Efficacy of Behavioral Biometrics in Cybersecurity. JAI GS. <br/>
                  — Finnegan, O. L., et al. (2024). The utility of behavioral biometrics... Systematic Reviews.
                </p>
           </div>
            {/* Offline Authentication */}
           <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                 <p className="italic text-gray-300 mb-2">
                "The need for offline biometric authentication is growing, particularly in regions with intermittent connectivity... using unique identifiers stored securely on-device provides reliable verification without constant network dependency."
                </p>
                <p className="text-xs text-gray-400">— Adapted from CardLab (2025) & principles of offline-first design.</p>
           </div>
           {/* Zero-Knowledge Proofs */}
           <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="italic text-gray-300 mb-2">
                "Zero-knowledge proofs allow a prover (user) to convince a verifier (system) that a statement is true (e.g., 'my behavior matches the profile') without revealing any information beyond the truth of the statement itself... crucial for privacy in biometrics."
                </p>
                <p className="text-xs text-gray-400">
                 — Paraphrased from Keyless (2020) & foundational ZKP literature.<br/>
                 — Bulletproofs (used here) offer efficient non-interactive ZKPs suitable for mobile constraints. Bünz, B., et al. (2018). Bulletproofs...
                 </p>
           </div>
        </div>
      </div>

      {/* Specific Validations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Behavioral Uniqueness & Consistency */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <Target className="mr-2" size={18} /> Behavioral Pattern Validation
          </h4>
          <div className="space-y-4 text-sm">
             <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold mb-1 text-white">Uniqueness & Accuracy</p>
                <p className="italic text-gray-300 mb-2">
                    "Studies combining multiple behavioral modalities (e.g., keystroke, touch, motion) consistently demonstrate low Equal Error Rates (EER), often below 2%, validating their potential for reliable authentication."
                </p>
                 <p className="text-xs text-gray-400">— See reviews like Teh, P. S., et al. (2013); Stylios, G., et al. (2022) EER of 0.9% for keystroke/touch.</p>
             </div>
             <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                 <p className="font-semibold mb-1 text-white">Cross-Device Consistency</p>
                <p className="italic text-gray-300 mb-2">
                    "Research indicates that while absolute timings might change, the *relative* patterns and dynamics of user interaction exhibit significant consistency across different devices, allowing for cross-platform behavioral authentication."
                </p>
                 <p className="text-xs text-gray-400">— E.g., Buriro, A., et al. (2017) on motion-based typing consistency.</p>
             </div>
          </div>
        </div>

        {/* Vector DB & ZKP Efficacy */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full">
          <h4 className="text-green-400 mb-3 font-medium flex items-center">
            <Zap className="mr-2" size={18} /> Technology Efficacy
          </h4>
           <div className="space-y-4 text-sm">
             <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold mb-1 text-white">Vector Database Performance</p>
                <p className="italic text-gray-300 mb-2">
                    "Approximate Nearest Neighbor (ANN) search algorithms like HNSW, implemented in libraries (FAISS) and databases (Pinecone), enable sub-100ms querying of high-dimensional vectors (like behavioral embeddings) even at massive scale."
                </p>
                 <p className="text-xs text-gray-400">— Malkov, Y. A., & Yashunin, D. A. (2018). HNSW graphs.</p>
                 <p className="text-xs text-gray-400">— Ozkaya, M. (2024). Pinecone Review.</p>
             </div>
             <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                 <p className="font-semibold mb-1 text-white">Zero-Knowledge Proof Viability</p>
                <p className="italic text-gray-300 mb-2">
                    "Modern ZKP systems like Bulletproofs offer logarithmic proof sizes and efficient verification, making them practical for resource-constrained environments like mobile devices, enabling privacy-preserving verification without prohibitive overhead."
                </p>
                 <p className="text-xs text-gray-400">— Bünz, B., et al. (2018). Bulletproofs...</p>
             </div>
          </div>
        </div>
      </div>

      {/* Challenges */}
       <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="text-green-400 mb-3 font-medium flex items-center">
          <AlertTriangle className="mr-2" size={18} /> Acknowledged Challenges & Mitigation Strategies
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
           <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold text-white mb-1">Behavioral Drift / Variability</p>
                <p className="italic text-gray-300 mb-1">Challenge: User behavior changes over time or due to context (mood, injury).</p>
                <p className="text-xs text-green-300">Mitigation: Continuous learning models, adaptive thresholds, profile aging/refresh mechanisms (Ray, R., et al. 2021).</p>
           </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold text-white mb-1">Privacy & User Acceptance</p>
                <p className="italic text-gray-300 mb-1">Challenge: Users wary of constant monitoring.</p>
                <p className="text-xs text-green-300">Mitigation: Emphasis on ZKP (no raw data stored/shared), transparent privacy policies, user control over data.</p>
           </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold text-white mb-1">Inclusivity & Accessibility</p>
                <p className="italic text-gray-300 mb-1">Challenge: Ensuring system works for users with disabilities or atypical interaction patterns.</p>
                <p className="text-xs text-green-300">Mitigation: Training models on diverse datasets, providing alternative auth pathways (Nguyen, T. et al. 2019).</p>
           </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <p className="font-semibold text-white mb-1">Resource Consumption</p>
                <p className="italic text-gray-300 mb-1">Challenge: Balancing accuracy with battery/CPU usage on mobile devices.</p>
                <p className="text-xs text-green-300">Mitigation: Optimized algorithms (TF Lite, C++), adaptive sampling rates, hardware acceleration (TEE/SE).</p>
           </div>
        </div>
      </div>
    </div>
  );

  // Personas Tab Content - Ensure this function is complete
  const renderPersonasTab = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
          <Users size={20} className="mr-2"/>User Personas & Scenarios: Impact in Africa
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Persona 1: Adwoa */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-semibold">Adwoa Mensah</h4>
              <p className="text-xs text-gray-400">Market Trader, Accra, Ghana <span role="img" aria-label="Ghana Flag">🇬🇭</span></p>
            </div>
          </div>
          <div className="space-y-3 text-sm flex-grow">
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">Context & Challenge:</p>
              <p>Runs a busy stall, uses a basic smartphone for Mobile Money (MoMo). Struggles with remembering PINs amid distractions, fears MoMo fraud. Intermittent network often disrupts SMS OTPs. Lacks formal ID for traditional banking.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">BioMetrAfriCa Solution:</p>
              <p>Her MoMo app uses BioMetrAfriCa. She authenticates payments simply by holding her phone and confirming – the app recognizes her touch and handling pattern. Works reliably even during network outages at the market. No PIN needed.</p>
            </div>
          </div>
            <div className="bg-blue-900/20 p-2 rounded-lg border border-blue-700 mt-4"> {/* Added mt-4 */}
              <p className="text-xs italic">
                "This phone just knows it's me! No more hiding my PIN or waiting for messages that never come. I feel safer, and paying suppliers is much faster now." — Adwoa
              </p>
            </div>
        </div>

        {/* Persona 2: James */}
         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-purple-600 p-2 rounded-full mr-3 flex-shrink-0">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-semibold">James Oti</h4>
              <p className="text-xs text-gray-400">Bank IT Security Lead, Lagos, Nigeria <span role="img" aria-label="Nigeria Flag">🇳🇬</span></p>
            </div>
          </div>
           <div className="space-y-3 text-sm flex-grow">
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">Context & Challenge:</p>
              <p>Manages security for a bank with urban/rural customers. Faces high rates of account takeover (ATO) fraud. SMS OTPs are unreliable outside cities. High support costs from password resets. Needs a solution that works for diverse literacy levels and device types.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">BioMetrAfriCa Solution:</p>
              <p>Integrated BioMetrAfriCa SDK into the mobile banking app. Passwordless login significantly reduces ATO. Offline capability boosts rural adoption. Continuous authentication flags suspicious sessions. Support calls for login issues drop sharply.</p>
            </div>
           </div>
             <div className="bg-purple-900/20 p-2 rounded-lg border border-purple-700 mt-4"> {/* Added mt-4 */}
              <p className="text-xs italic">
                "Fraud rates plummeted, and our customers love the simpler login. The offline feature was critical for financial inclusion in remote areas. It's secure, compliant, and user-friendly – a trifecta." — James
              </p>
            </div>
        </div>

        {/* Persona 3: Neha */}
         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-green-600 p-2 rounded-full mr-3 flex-shrink-0">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-semibold">Neha Wanjiru</h4>
              <p className="text-xs text-gray-400">University Student, Nairobi, Kenya <span role="img" aria-label="Kenya Flag">🇰🇪</span></p>
            </div>
          </div>
           <div className="space-y-3 text-sm flex-grow">
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">Context & Challenge:</p>
              {/* Completed the truncated paragraph */}
              <p>Tech-savvy student using multiple online services (uni portal, banking, social). Annoyed by password management but privacy-conscious. Worries about phishing and data breaches. Wants seamless login across her phone and laptop.</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="font-semibold text-white mb-1">BioMetrAfriCa Solution:</p>
              <p>Uses BioMetrAfriCa for her bank app and the university's SSO. Appreciates the convenience and the privacy guarantee of ZKP (no biometric data stored). Cloud sync allows easy authentication on both devices. Feels secure against phishing.</p>
            </div>
           </div>
             <div className="bg-green-900/20 p-2 rounded-lg border border-green-700 mt-4"> {/* Added mt-4 */}
              <p className="text-xs italic">
                "It's awesome how it just *knows* it's me by how I type or use my phone. No more password nightmares! And knowing my actual behavior isn't stored anywhere makes me feel way safer online." — Neha
              </p>
            </div>
          </div>
      </div>
    </div>
  );

  // Function to render the current tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'tech': return renderTechnicalDetails();
      case 'metrics': return renderMetricsTab();
      case 'simple': return renderSimpleExplanation();
      case 'osi': return renderOSIModel();
      case 'ip': return renderIPBusiness();
      case 'research': return renderResearchTab();
      case 'personas': return renderPersonasTab();
      case 'demo':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Simulation Control & Visualization */}
            <div className="lg:col-span-2 space-y-6">
                {/* Stage Indicator */}
                 <div className="flex items-center justify-around bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className={`flex flex-col items-center transition-opacity duration-300 ${stage >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${stage >= 1 ? 'bg-blue-600' : 'bg-gray-600'}`}>
                            <UserCircle size={24} className="text-white"/>
                        </div>
                        <span className="text-xs font-medium">Onboarding</span>
                         {stage === 1 && isPlaying && <div className="mt-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
                         {stage >= 2 && <Check size={16} className="text-green-400 mt-1"/>}
                    </div>
                    <ChevronRight size={24} className={`text-gray-600 transition-opacity duration-300 ${stage >= 2 ? 'opacity-100' : 'opacity-40'}`}/>
                    <div className={`flex flex-col items-center transition-opacity duration-300 ${stage >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${stage >= 3 ? 'bg-green-600' : 'bg-gray-600'}`}>
                            <Fingerprint size={24} className="text-white"/>
                        </div>
                        <span className="text-xs font-medium">Authenticate</span>
                        {stage === 3 && isPlaying && !isPaused && <div className="mt-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
                         {showSuccessOverlay && <Check size={16} className="text-green-400 mt-1"/>}
                    </div>
                </div>

              {/* Authentication Score */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-green-400 mb-2">Authentication Confidence Score</h4>
                <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ease-out ${authenticationScore >= 85 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${authenticationScore}%` }}
                  ></div>
                   <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                        {authenticationScore}%
                   </span>
                </div>
                 <p className="text-xs text-gray-400 mt-2">Represents the real-time confidence based on behavioral similarity and proof verification. Threshold: 85%.</p>
              </div>

              {/* Vector DB Visualization */}
              <VectorDBVisualization />
            </div>

            {/* Right Column: Narrative & Log */}
            <div className="lg:col-span-1 space-y-6">
              {/* Narrative Overlay */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-48 overflow-y-auto custom-scrollbar">
                  <h4 className="text-sm font-medium text-blue-400 mb-2 sticky top-0 bg-gray-800 pb-1 z-10">What's Happening Now?</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{getNarrativeText()}</p>
              </div>

              {/* Processing Log */}
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 h-[calc(100vh-70vh)] min-h-[250px] flex flex-col"> {/* Adjusted height */}
                 <h4 className="text-sm font-medium text-green-400 mb-2 flex justify-between items-center sticky top-0 bg-gray-900 pb-1 z-10">
                    <span><Code size={16} className="inline mr-1"/>Processing Log</span>
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded transition-colors ${networkStatus === 'online' ? 'bg-green-800 text-green-300' : 'bg-red-800 text-red-300'}`}>
                        {networkStatus === 'online' ? 'NET:ONLINE' : 'NET:OFFLINE'}
                    </span>
                </h4>
                <div ref={scrollRef} className="flex-grow overflow-y-auto text-xs font-mono space-y-1 pr-2 custom-scrollbar">
                  {processingDetails.map((detail, index) => (
                    <div key={index} className={`flex items-start ${
                      detail.type === 'highlight' ? 'text-blue-400 font-semibold' :
                      detail.type === 'success' ? 'text-green-400' :
                      detail.type === 'warning' ? 'text-yellow-400' :
                      detail.type === 'error' ? 'text-red-500 font-bold' : // Made error bolder
                      detail.type === 'processing' ? 'text-purple-400 animate-pulse' :
                      'text-gray-400' // Default 'info'
                    }`}>
                      <span className="text-gray-500 mr-2 flex-shrink-0">{new Date(detail.timestamp).toLocaleTimeString([], { hour12: false })}</span>
                      <span className="flex-grow break-words">{detail.text}</span>
                    </div>
                  ))}
                   {/* Indicator when paused */}
                   {isPaused && (
                      <div className="text-yellow-500 flex items-center sticky bottom-0 bg-gray-900 py-1">
                          <Pause size={12} className="mr-1"/> Simulation Paused...
                      </div>
                   )}
                </div>
              </div>
            </div>

             {/* Success Overlay */}
            {showSuccessOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 backdrop-blur-sm" onClick={() => setShowSuccessOverlay(false)}>
                    <div className="bg-gradient-to-br from-green-500 to-blue-600 p-8 md:p-10 rounded-xl shadow-2xl text-center text-white max-w-md mx-4 transform transition-all scale-100 opacity-100 animate-fade-in" onClick={e => e.stopPropagation()}>
                        <Check size={70} md:size={80} className="mx-auto mb-6 border-4 border-white rounded-full p-2" />
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Authentication Successful!</h2>
                        <p className="text-base md:text-lg mb-6">Identity verified securely using behavioral biometrics and Zero-Knowledge Proofs.</p>
                        <button
                            onClick={() => { setShowSuccessOverlay(false); resetDemo(); }} // Reset demo on close
                            className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-500 focus:ring-white"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
          </div>
        );
    }
  };

  // Tab Definitions
  const tabs = [
    { id: 'demo', label: 'Live Demo', icon: Zap },
    { id: 'tech', label: 'Tech Specs', icon: Code },
    { id: 'metrics', label: 'Metrics', icon: PieChart },
     { id: 'simple', label: 'Simple View', icon: Brain },
     { id: 'osi', label: 'OSI Model', icon: Layers },
     { id: 'ip', label: 'IP & Business', icon: Briefcase },
     { id: 'research', label: 'Research', icon: BookOpen },
     { id: 'personas', label: 'Personas', icon: Users },
  ];

  // Add basic CSS for custom scrollbar and fade-in animation if needed
  const customStyles = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #1f2937; /* gray-800 */
        border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #4b5563; /* gray-600 */
        border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #6b7280; /* gray-500 */
    }
    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #1f2937;
    }

    @keyframes fade-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out forwards;
    }
  `;

  return (
    <>
    <style>{customStyles}</style> {/* Inject styles */}
    <div ref={mainContainerRef} className="bg-gray-900 text-white min-h-screen p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-700 gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-center md:text-left">
          BioMetr<span className="text-yellow-400">AfriCa</span> Demo
        </h1>
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
           {/* Play/Pause/Stop Controls */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700 shadow-sm">
                <button
                    onClick={startDemo}
                    disabled={isPlaying && !isPaused}
                    className={`p-1.5 md:p-2 rounded ${isPlaying && !isPaused ? 'text-gray-600 cursor-not-allowed' : 'text-green-400 hover:bg-gray-700'} transition-colors`}
                    title="Start / Restart Demo"
                >
                    <Play size={18} />
                </button>
                 <button
                    onClick={isPaused ? resumeDemo : pauseDemo}
                    disabled={!isPlaying}
                    className={`p-1.5 md:p-2 rounded ${!isPlaying ? 'text-gray-600 cursor-not-allowed' : isPaused ? 'text-blue-400 hover:bg-gray-700 animate-pulse' : 'text-yellow-400 hover:bg-gray-700'} transition-colors`}
                    title={isPaused ? "Resume Demo" : "Pause Demo"}
                >
                    {isPaused ? <Play size={18}/> : <Pause size={18} />}
                </button>
                 <button
                    onClick={resetDemo}
                    className="p-1.5 md:p-2 rounded text-red-400 hover:bg-gray-700 transition-colors"
                    title="Stop / Reset Demo"
                >
                    <Square size={18} />
                </button>
            </div>

           {/* Speed Control */}
           <div className="flex items-center space-x-1 bg-gray-800 p-1 rounded-lg border border-gray-700 shadow-sm">
                <span className="text-xs px-1 md:px-2 text-gray-400 hidden sm:inline">Speed:</span>
                 {[0.5, 1, 2, 4].map(speed => (
                    <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`px-1.5 md:px-2 py-1 text-xs rounded ${simulationSpeed === speed ? 'bg-blue-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700'} transition-colors`}
                        title={`${speed}x speed`}
                    >
                        {speed}x
                    </button>
                 ))}
                <FastForward size={16} className="text-gray-400 ml-1 hidden sm:inline"/>
           </div>
           {/* Network Toggle */}
           <button
                onClick={toggleNetworkStatus}
                className={`flex items-center space-x-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg border text-xs transition-colors shadow-sm ${
                    networkStatus === 'online'
                    ? 'bg-green-800 border-green-700 text-green-300 hover:bg-green-700'
                    : 'bg-red-800 border-red-700 text-red-300 hover:bg-red-700'
                }`}
                title="Toggle Network Status (Simulated)"
            >
                {networkStatus === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
                <span className="hidden sm:inline">{networkStatus === 'online' ? 'Online' : 'Offline'}</span>
           </button>
        </div>
      </div>

      {/* Tab Navigation */}
       <div className="mb-6 overflow-x-auto custom-scrollbar pb-1">
            <div className="flex space-x-1 border-b border-gray-700 whitespace-nowrap w-max"> {/* Added w-max */}
            {tabs.map(tab => {
                 const Icon = tab.icon;
                 return (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center px-3 py-2 text-sm font-medium border-b-2 focus:outline-none transition-colors duration-200 ease-in-out ${
                            selectedTab === tab.id
                            ? 'border-blue-500 text-blue-400'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                        }`}
                    >
                       <Icon size={16} className="mr-1.5 md:mr-2 flex-shrink-0"/>
                       <span className="whitespace-nowrap">{tab.label}</span> {/* Ensure label doesn't wrap */}
                    </button>
                 );
            })}
            </div>
       </div>

      {/* Main Content Area */}
      <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700 shadow-lg min-h-[60vh]">
        {renderTabContent()}
      </div>

      {/* Footer */}
       <footer className="mt-8 text-center text-xs text-gray-500">
            BioMetrAfriCa Demo v1.2 | Secure, privacy-preserving authentication for Africa.
            <p className="mt-1">Metrics & timings simulated for demonstration.</p>
       </footer>

      {/* Threat Model Modal */}
      {showThreatModel && <ThreatModelVisualization />}

    </div>
    </>
  );
};

export default BioMetrAfriCaRevolutionaryDemo;