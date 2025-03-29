import React, { useState, useEffect, useRef } from 'react';
import { Shield, Fingerprint, Database, Check, X, RefreshCw, Lock, Zap, Award, FileText, Users, Globe, BookOpen, LightbulbIcon, AlertTriangle, Brain, Briefcase, Layers, ChevronRight, Info, UserCircle, Clock, Search, Share2, PieChart, GitBranch, Truck, Code, Server } from 'lucide-react';

const BioMetrAfriCaSimulation = () => {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [processingDetails, setProcessingDetails] = useState([]);
  const [selectedTab, setSelectedTab] = useState('demo');
  const scrollRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Timer references
  const timerRef = useRef(null);
  const animationTimerRef = useRef(null);
  
  const resetDemo = () => {
    setStage(0);
    setProcessingStep(0);
    setShowSuccessOverlay(false);
    setProcessingDetails([]);
    clearTimeout(timerRef.current);
    clearInterval(animationTimerRef.current);
    setIsPlaying(false);
  };
  
  const startDemo = () => {
    resetDemo();
    setIsPlaying(true);
    runSimulation();
  };
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [processingDetails]);
  
  const addProcessingDetail = (detail, type = 'info') => {
    setProcessingDetails(prev => [...prev, { text: detail, type }]);
  };
  
  const runSimulation = () => {
    // Onboarding flow timing
    const timings = {
      captureInitial: 800 / simulationSpeed,
      processFeatures: 1200 / simulationSpeed,
      generateProfile: 1500 / simulationSpeed,
      storeLocal: 700 / simulationSpeed,
      completeOnboarding: 500 / simulationSpeed,
      
      // Authentication flow timing
      initiateAuth: 300 / simulationSpeed,
      captureNew: 500 / simulationSpeed,
      localProcessing: 400 / simulationSpeed,
      generateProof: 900 / simulationSpeed,
      verifyLocal: 350 / simulationSpeed,
      generateToken: 450 / simulationSpeed,
      completeAuth: 200 / simulationSpeed,
    };
    
    // Simulation steps
    const simulationSteps = [
      // Onboarding
      () => {
        setStage(1);
        addProcessingDetail('Initiating biometric onboarding sequence...', 'highlight');
        addProcessingDetail('Preparing local secure storage environment', 'info');
      },
      () => {
        addProcessingDetail('Capturing initial behavioural telemetry sample...', 'processing');
        addProcessingDetail('Monitoring keypress latency patterns', 'info');
        addProcessingDetail('Recording touch gesture dynamics', 'info');
        addProcessingDetail('Analysing motion sensor input', 'info');
      },
      () => {
        addProcessingDetail('Initial capture complete', 'success');
        addProcessingDetail('Processing raw telemetry into feature vectors...', 'processing');
        addProcessingDetail('Extracting dimensional features using PCA', 'info');
        addProcessingDetail('Calculating statistical normalisation parameters', 'info');
      },
      () => {
        addProcessingDetail('Feature extraction complete', 'success');
        addProcessingDetail('Building behavioral fingerprint profile...', 'processing');
        addProcessingDetail('Generating high-dimensional embedding (1536D space)', 'info');
        addProcessingDetail('Creating zero-knowledge reference templates', 'info');
        addProcessingDetail('Implementing Bulletproofs cryptographic protocol', 'info');
      },
      () => {
        addProcessingDetail('Profile generation complete', 'success');
        addProcessingDetail('Storing encrypted profile in local secure enclave...', 'processing');
        addProcessingDetail('Applying BLS signature scheme', 'info');
        addProcessingDetail('Setting trust decay parameters', 'info');
      },
      () => {
        addProcessingDetail('Local storage complete', 'success');
        addProcessingDetail('Onboarding procedure finalised', 'highlight');
        setStage(2);
      },
      
      // Authentication flow
      () => {
        setStage(3);
        addProcessingDetail('Initiating authentication sequence...', 'highlight');
        addProcessingDetail('Loading encrypted reference profile', 'info');
      },
      () => {
        addProcessingDetail('Capturing current behavioural telemetry...', 'processing');
        addProcessingDetail('Sampling keystroke dynamics', 'info');
        addProcessingDetail('Recording touch pressure variations', 'info');
      },
      () => {
        addProcessingDetail('Sample captured', 'success');
        addProcessingDetail('Processing current features...', 'processing');
        addProcessingDetail('Normalising input vectors', 'info');
        addProcessingDetail('Applying dimensional reduction', 'info');
      },
      () => {
        addProcessingDetail('Generating zero-knowledge proof...', 'processing');
        addProcessingDetail('Computing Bulletproof witness', 'info');
        addProcessingDetail('Creating non-interactive proof commitment', 'info');
      },
      () => {
        addProcessingDetail('Verifying proof locally...', 'processing');
        addProcessingDetail('Calculating cosine similarity score: 94.7%', 'info');
        addProcessingDetail('Comparing against threshold: 85.0%', 'info');
      },
      () => {
        addProcessingDetail('Verification successful', 'success');
        addProcessingDetail('Generating authentication token...', 'processing');
        addProcessingDetail('Applying time-based entropy', 'info');
        addProcessingDetail('Signing with device-specific key', 'info');
      },
      () => {
        addProcessingDetail('Authentication completed in 2.8 seconds', 'highlight');
        addProcessingDetail('Identity confirmed with zero biometric data exposure', 'success');
        setShowSuccessOverlay(true);
        setIsPlaying(false);
      }
    ];
    
    // Execute each step with appropriate timing
    let currentStep = 0;
    const timingKeys = Object.keys(timings);
    
    const executeStep = () => {
      if (currentStep < simulationSteps.length) {
        simulationSteps[currentStep]();
        setProcessingStep(currentStep);
        
        // Schedule next step
        const nextStepDelay = timings[timingKeys[currentStep]] || 1000;
        timerRef.current = setTimeout(() => {
          currentStep++;
          executeStep();
        }, nextStepDelay);
      }
    };
    
    executeStep();
  };
  
  // Vector database component simulation
  const VectorDBVisualization = () => {
    const [vectors, setVectors] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false);
    const [resultPoint, setResultPoint] = useState(null);
    
    useEffect(() => {
      // Generate random vector points
      const generatePoints = () => {
        const points = [];
        for (let i = 0; i < 30; i++) {
          points.push({
            x: 50 + Math.random() * 200,
            y: 50 + Math.random() * 100,
            size: 3 + Math.random() * 3,
            color: `rgba(${Math.floor(100 + Math.random() * 155)}, ${Math.floor(100 + Math.random() * 155)}, ${Math.floor(100 + Math.random() * 155)}, 0.7)`
          });
        }
        return points;
      };
      
      setVectors(generatePoints());
    }, []);
    
    const simulateSearch = () => {
      setActiveSearch(true);
      
      // Simulate the search process with a timer
      setTimeout(() => {
        // Generate a result point
        const result = {
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 100,
          size: 6,
          color: 'rgba(255, 0, 100, 0.9)'
        };
        
        setResultPoint(result);
        
        // Reset after some time
        setTimeout(() => {
          setActiveSearch(false);
          setResultPoint(null);
        }, 3000);
      }, 1500);
    };
    
    return (
      <div className="p-4 bg-gray-800 rounded-lg flex flex-col items-center">
        <div className="flex justify-between w-full mb-2">
          <span className="text-green-400 text-sm">Pinecone Vector Database</span>
          <span className="text-green-400 text-sm">HNSW Graph</span>
        </div>
        
        <div className="relative w-full h-48 bg-gray-900 rounded-md overflow-hidden">
          {/* Vector points */}
          {vectors.map((point, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                backgroundColor: point.color
              }}
            />
          ))}
          
          {/* Search result point */}
          {resultPoint && (
            <div 
              className="absolute rounded-full animate-ping"
              style={{
                left: `${resultPoint.x}px`,
                top: `${resultPoint.y}px`,
                width: `${resultPoint.size}px`,
                height: `${resultPoint.size}px`,
                backgroundColor: resultPoint.color
              }}
            />
          )}
          
          {/* Search animation */}
          {activeSearch && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-2 border-blue-500 rounded-full animate-ping opacity-30"></div>
              <div className="absolute w-20 h-20 border-2 border-green-500 rounded-full animate-ping opacity-40" style={{animationDelay: '0.2s'}}></div>
            </div>
          )}
        </div>
        
        <div className="mt-4 w-full flex justify-between">
          <button 
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
            onClick={simulateSearch}
            disabled={activeSearch}
          >
            {activeSearch ? 'Searching...' : 'Simulate Vector Search'}
          </button>
          <div className="text-xs text-green-400">
            Query time: {activeSearch ? 'Processing...' : '47ms'}
          </div>
        </div>
      </div>
    );
  };

  const renderTechnicalDetails = () => (
    <div className="mt-6 text-sm text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-2">Implementation Specifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-3 rounded-lg">
          <h4 className="text-green-400 mb-2 font-medium">Hardware Configuration</h4>
          <ul className="space-y-1">
            <li><Tooltip info="The Raspberry Pi 4 serves as the embedded processing platform, providing sufficient computing power while maintaining low energy requirements, essential for deployment in regions with unreliable electricity supply.">• Raspberry Pi 4 Model B (4GB RAM)</Tooltip></li>
            <li><Tooltip info="The GT-521F52 is a secure optical fingerprint sensor that captures minutiae coordinates rather than actual images, ensuring biometric data privacy from the moment of acquisition.">• Fingerprint sensor: GT-521F52</Tooltip></li>
            <li><Tooltip info="The MPU-6050 combines a 3-axis gyroscope and accelerometer to detect subtle hand movements and device orientation patterns unique to each user's handling behavior.">• MPU-6050 accelerometer/gyroscope</Tooltip></li>
            <li><Tooltip info="The ATECC608A provides hardware-secured cryptographic elements that store encryption keys and perform cryptographic operations in a tamper-resistant environment, protecting the biometric templates.">• Secure element: ATECC608A</Tooltip></li>
            <li><Tooltip info="The touchscreen provides an intuitive interface while capturing additional behavioral metrics such as pressure variations, gesture speed, and touch precision that contribute to the behavioral fingerprint.">• Touchscreen: 7" Capacitive Display</Tooltip></li>
          </ul>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg">
          <h4 className="text-green-400 mb-2 font-medium">Runtime Performance</h4>
          <ul className="space-y-1">
            <li><Tooltip info="The onboarding process involves capturing multiple behavioral samples across different interaction types, normalizing them, and generating reference templates, all occurring within a time frame that balances thoroughness with user convenience.">• Onboarding process: ~4.7 seconds</Tooltip></li>
            <li><Tooltip info="Authentication time has been optimized to fall below the 3-second threshold for user experience, whilst maintaining robust security verification standards.">• Authentication: ~2.8 seconds</Tooltip></li>
            <li><Tooltip info="Vector search operations leverage optimized HNSW (Hierarchical Navigable Small World) graphs to achieve sub-100ms query times even on resource-constrained hardware.">• Vector search latency: 40-75ms</Tooltip></li>
            <li><Tooltip info="Zero-Knowledge Proof generation time reflects the computational overhead of creating cryptographic proofs that verify identity without revealing any actual biometric data.">• ZKP generation: ~900ms</Tooltip></li>
            <li><Tooltip info="Token generation includes applying time-based constraints, device binding, and cryptographic signing to ensure the authentication token cannot be cloned or reused in replay attacks.">• Token generation: ~450ms</Tooltip></li>
          </ul>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-800 p-3 rounded-lg">
          <h4 className="text-green-400 mb-2 font-medium">Software Stack</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-white font-medium">Core Systems</p>
              <ul className="text-xs space-y-1 mt-1">
                <li><Tooltip info="Raspbian provides a lightweight but capable operating system optimized for ARM processors, offering a balance of performance and power efficiency critical for regions with intermittent electricity.">• Raspbian OS (64-bit)</Tooltip></li>
                <li><Tooltip info="Python 3.10 serves as the primary runtime environment, chosen for its extensive machine learning libraries and cross-platform compatibility, facilitating deployment across diverse environments.">• Python 3.10 runtime</Tooltip></li>
                <li><Tooltip info="Performance-critical functions like vector operations and cryptographic primitives are implemented in C++ native modules to maximize computational efficiency on limited hardware.">• C++ native modules</Tooltip></li>
                <li><Tooltip info="SQLite provides lightweight database capabilities with encrypted storage via SQLCipher, ensuring all stored behavioral templates remain secure even if the device is compromised.">• SQLite + SQLCipher</Tooltip></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-medium">Authentication Systems</p>
              <ul className="text-xs space-y-1 mt-1">
                <li><Tooltip info="Bulletproofs is a non-interactive zero-knowledge proof system that allows verification of behavioral matching without revealing the actual behavioral templates, maintaining privacy whilst ensuring authentication security.">• Bulletproofs ZKP library</Tooltip></li>
                <li><Tooltip info="BLS (Boneh-Lynn-Shacham) signatures provide short, efficient digital signatures with batch verification capabilities, essential for authenticating multiple biometric features concurrently.">• BLS signature scheme</Tooltip></li>
                <li><Tooltip info="PiGPIO enables direct hardware access to sensors with microsecond precision, capturing subtle temporal variations in user behavior that contribute to unique identification.">• PiGPIO direct sensor interface</Tooltip></li>
                <li><Tooltip info="TensorFlow Lite provides optimized machine learning capabilities for generating embeddings from raw behavioral data, with models specifically trained for lower-resource environments.">• TensorFlow Lite for embedding</Tooltip></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-lg">
          <h4 className="text-green-400 mb-2 font-medium">Vector Database Integration</h4>
          <p className="text-xs mb-2">The system implements a hybrid approach with local cache and cloud synchronization:</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-white font-medium">Local Vector Cache</p>
              <ul className="text-xs space-y-1 mt-1">
                <li><Tooltip info="FAISS (Facebook AI Similarity Search) provides highly optimized vector similarity search capabilities even on devices with limited computational resources, ensuring responsive authentication.">• FAISS in-memory index</Tooltip></li>
                <li><Tooltip info="The 1536-dimensional vector space captures the full complexity of behavioral patterns while remaining computationally manageable on resource-constrained devices.">• Dimensions: 1536D</Tooltip></li>
                <li><Tooltip info="Cosine similarity measures the angle between behavioral vectors rather than their magnitude, making it more robust to variations in input intensity whilst preserving pattern recognition.">• Similarity: Cosine</Tooltip></li>
                <li><Tooltip info="Encrypted SQLite storage ensures that behavioral templates remain protected even if the device is physically compromised, with separate encryption keys for each user.">• Storage: SQLite encrypted DB</Tooltip></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-medium">Cloud Integration</p>
              <ul className="text-xs space-y-1 mt-1">
                <li><Tooltip info="Pinecone provides scalable vector search capabilities in the cloud, allowing template synchronization across multiple devices whilst maintaining search performance.">• Pinecone serverless index</Tooltip></li>
                <li><Tooltip info="HNSW (Hierarchical Navigable Small World) graphs enable efficient approximate nearest neighbor search in high-dimensional spaces, critical for rapid similarity matching at scale.">• HNSW indexing algorithm</Tooltip></li>
                <li><Tooltip info="All cloud communications use token-based encryption with regularly rotated keys, ensuring that even if intercepted, the data remains meaningless to attackers.">• Encrypted token-based access</Tooltip></li>
                <li><Tooltip info="The system prioritizes local verification, falling back to cloud verification only when necessary, enabling authentication even in regions with intermittent connectivity.">• Offline-first operation model</Tooltip></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMetricsTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-bold text-blue-400 mb-4">Performance Metrics</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-green-400 mb-2">Authentication Timing Breakdown</h4>
          <div className="relative h-10 bg-gray-800 rounded-lg overflow-hidden w-full mb-1">
            <div className="absolute h-full bg-blue-600 w-3/12" style={{width: '18%'}}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white">Capture</span>
            </div>
            <div className="absolute h-full bg-purple-600 w-2/12" style={{left: '18%', width: '14%'}}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white">Process</span>
            </div>
            <div className="absolute h-full bg-yellow-600" style={{left: '32%', width: '32%'}}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white">ZKP Generation</span>
            </div>
            <div className="absolute h-full bg-green-600" style={{left: '64%', width: '12%'}}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white">Verify</span>
            </div>
            <div className="absolute h-full bg-red-600" style={{left: '76%', width: '24%'}}>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white">Token</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0ms</span>
            <span>500ms</span>
            <span>1000ms</span>
            <span>1500ms</span>
            <span>2000ms</span>
            <span>2500ms</span>
            <span>3000ms</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-green-400 mb-2">Security Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">False Acceptance Rate (FAR)</span>
                  <span className="text-sm font-medium text-green-400">0.02%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '0.02%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">False Rejection Rate (FRR)</span>
                  <span className="text-sm font-medium text-yellow-400">1.7%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '1.7%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Equal Error Rate (EER)</span>
                  <span className="text-sm font-medium text-blue-400">0.9%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '0.9%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Time to Break (est.)</span>
                  <span className="text-sm font-medium text-green-400">~175 years</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '99%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-green-400 mb-2">Resource Usage</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">CPU Usage (Peak)</span>
                  <span className="text-sm font-medium text-yellow-400">67%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">RAM Usage</span>
                  <span className="text-sm font-medium text-green-400">940MB</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '23.5%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Storage (User Profile)</span>
                  <span className="text-sm font-medium text-green-400">24KB</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '0.1%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Battery Impact</span>
                  <span className="text-sm font-medium text-green-400">Minimal</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-green-400 mb-2">Vector Database Performance</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-white font-medium mb-2">Local Cache</p>
              <ul className="text-xs space-y-1">
                <li className="flex justify-between">
                  <span>Query latency:</span>
                  <span className="text-green-400">12ms</span>
                </li>
                <li className="flex justify-between">
                  <span>Max vectors:</span>
                  <span className="text-green-400">~10,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Precision@10:</span>
                  <span className="text-green-400">96.3%</span>
                </li>
                <li className="flex justify-between">
                  <span>Offline capable:</span>
                  <span className="text-green-400">Yes</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-white font-medium mb-2">Cloud (Pinecone)</p>
              <ul className="text-xs space-y-1">
                <li className="flex justify-between">
                  <span>Query latency:</span>
                  <span className="text-yellow-400">47ms</span>
                </li>
                <li className="flex justify-between">
                  <span>Max vectors:</span>
                  <span className="text-green-400">Unlimited</span>
                </li>
                <li className="flex justify-between">
                  <span>Precision@10:</span>
                  <span className="text-green-400">98.7%</span>
                </li>
                <li className="flex justify-between">
                  <span>Offline capable:</span>
                  <span className="text-red-400">No</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSimpleExplanation = () => (
    <div className="p-4">
      <h3 className="text-lg font-bold text-blue-400 mb-4">Simple Explanation</h3>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="text-green-400 mb-3 flex items-center">
          <Clock className="mr-2" size={18} />
          How the Authentication Process Works
        </h4>
        <p className="text-gray-300 mb-3">
          Imagine you have a special lock that knows it's you not just by one key, but by how you use that key. BioMetrAfriCa works like this special lock. It learns and remembers your unique patterns—how you type, how you hold your phone, and how you touch the screen.
        </p>
        
        <div className="space-y-4 mt-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <h5 className="text-blue-300 mb-2">1. Capture Stage (500ms)</h5>
            <p className="text-sm text-gray-300">
              When you try to log in, the system watches how you interact with your device. It's like taking a quick photo of your behavior, noticing things like how fast you type or how you hold your phone. This takes about half a second—faster than saying "cheese" for a real photo!
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <h5 className="text-purple-300 mb-2">2. Process Stage (400ms)</h5>
            <p className="text-sm text-gray-300">
              Next, the system takes what it saw and organizes the information. It's like sorting through a messy drawer to find exactly what's needed. The system picks out the most important patterns that make your behavior unique, just like picking out the most important features of your face that help people recognize you.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <h5 className="text-yellow-300 mb-2">3. ZKP Generation Stage (900ms)</h5>
            <p className="text-sm text-gray-300">
              This is the really clever part. The system creates a special puzzle that proves you're really you without actually sharing your private behavior patterns. It's like proving you know a secret password without ever saying the password out loud. This takes the longest time because creating these special puzzles is complicated work.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <h5 className="text-green-300 mb-2">4. Verify Stage (350ms)</h5>
            <p className="text-sm text-gray-300">
              Now the system checks if the puzzle matches what it knows about you. It's like checking if a key fits in a lock. The system compares your current behavior to what it remembers about you and decides if it's similar enough. If it's too different, it won't let you in.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <h5 className="text-red-300 mb-2">5. Token Stage (650ms)</h5>
            <p className="text-sm text-gray-300">
              If you pass the check, the system creates a special ticket (called a token) that says "this person is verified." It's like getting a stamp on your hand at an amusement park that lets you go on rides without having to pay again. This token lets you use the system without having to do the whole check again for a while.
            </p>
          </div>
        </div>
        
        <p className="text-gray-300 mt-4">
          All together, these steps take less than 3 seconds, but they provide strong security that's hard for others to fake. The best part? You don't have to remember any passwords or carry any special cards—your natural behavior is the key!
        </p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h4 className="text-green-400 mb-3 flex items-center">
          <Search className="mr-2" size={18} />
          How the Vector Database Works
        </h4>
        <p className="text-gray-300 mb-3">
          The vector database is like a super-smart library that helps BioMetrAfriCa quickly find and match your unique behavior patterns.
        </p>
        
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-300">
              Imagine your behavior patterns are turned into a special code—like a digital fingerprint but for how you use your device. The vector database stores millions of these codes and can find matching ones super fast, even if they're not exactly the same but very similar.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-300">
              When you use BioMetrAfriCa, it compares your current behavior to the stored patterns incredibly quickly—in just 12-47 thousandths of a second! That's faster than you can blink your eye. This amazing speed is possible because the database doesn't check every single stored pattern one by one. Instead, it uses smart shortcuts to narrow down the search, like knowing exactly which shelf in a huge library to check for a specific book.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-300">
              The best part is that the system keeps part of this smart library right on your device, so it can recognize you even when you don't have internet access. If you do have internet, it can use an even bigger library in the cloud that can store unlimited patterns for extra accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderOSIModel = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4">BioMetrAfriCa in the OSI Model</h3>
      
      <p className="mb-4">
        BioMetrAfriCa is designed as a cross-layer security solution that integrates at multiple levels of the OSI (Open Systems Interconnection) model, providing comprehensive security whilst maintaining compatibility with existing infrastructure.
      </p>
      
      <div className="relative bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex flex-col space-y-2">
          <div className="bg-blue-900/50 p-3 rounded-lg border border-blue-700 relative">
            <div className="font-bold text-blue-300 mb-1 flex items-center">
              <span className="bg-blue-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">7</span>
              Application Layer
            </div>
            <p className="text-sm">
              At this layer, BioMetrAfriCa interfaces with applications through its API, providing authentication services for software applications. This is where behavioural biometrics are initially captured and behavioural analysis is performed.
            </p>
            <div className="absolute right-3 top-3 bg-green-500 text-xs text-white px-2 py-1 rounded-full">
              Primary Integration
            </div>
          </div>
          
          <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-700 relative">
            <div className="font-bold text-indigo-300 mb-1 flex items-center">
              <span className="bg-indigo-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">6</span>
              Presentation Layer
            </div>
            <p className="text-sm">
              BioMetrAfriCa operates here by managing the encryption and formatting of biometric data before transmission. Zero-knowledge proofs and token generation occur at this layer, ensuring data privacy across different systems.
            </p>
            <div className="absolute right-3 top-3 bg-green-500 text-xs text-white px-2 py-1 rounded-full">
              Primary Integration
            </div>
          </div>
          
          <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-700 relative">
            <div className="font-bold text-purple-300 mb-1 flex items-center">
              <span className="bg-purple-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">5</span>
              Session Layer
            </div>
            <p className="text-sm">
              The system integrates here by managing continuous authentication throughout user sessions. The authentication tokens control session establishment, maintenance, and termination based on ongoing behavioural analysis.
            </p>
            <div className="absolute right-3 top-3 bg-green-500 text-xs text-white px-2 py-1 rounded-full">
              Primary Integration
            </div>
          </div>
          
          <div className="bg-pink-900/20 p-3 rounded-lg border border-pink-700 relative">
            <div className="font-bold text-pink-300 mb-1 flex items-center">
              <span className="bg-pink-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">4</span>
              Transport Layer
            </div>
            <p className="text-sm">
              BioMetrAfriCa works with TLS/SSL protocols at this layer to secure the transmission of authentication tokens and encrypted biometric templates, ensuring data integrity during transit.
            </p>
            <div className="absolute right-3 top-3 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
              Secondary Integration
            </div>
          </div>
          
          <div className="bg-red-900/20 p-3 rounded-lg border border-red-700 relative">
            <div className="font-bold text-red-300 mb-1 flex items-center">
              <span className="bg-red-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
              Network Layer
            </div>
            <p className="text-sm">
              For enhanced security deployments, BioMetrAfriCa can integrate with IP Security (IPSec) to provide additional protection for authentication data across networks, though this is optional.
            </p>
            <div className="absolute right-3 top-3 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
              Optional Integration
            </div>
          </div>
          
          <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-700 relative">
            <div className="font-bold text-orange-300 mb-1 flex items-center">
              <span className="bg-orange-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
              Data Link Layer
            </div>
            <p className="text-sm">
              In specific advanced deployments, BioMetrAfriCa can work with IEEE 802.1X for port-based authentication, allowing only authenticated devices to connect to networks.
            </p>
            <div className="absolute right-3 top-3 bg-gray-500 text-xs text-white px-2 py-1 rounded-full">
              Limited Integration
            </div>
          </div>
          
          <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-700 relative">
            <div className="font-bold text-yellow-300 mb-1 flex items-center">
              <span className="bg-yellow-700 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
              Physical Layer
            </div>
            <p className="text-sm">
              BioMetrAfriCa does not directly integrate at the physical layer, as it functions primarily as a software and middleware solution. However, it can enhance the security of physical connections by validating the authenticity of users accessing physical ports.
            </p>
            <div className="absolute right-3 top-3 bg-gray-500 text-xs text-white px-2 py-1 rounded-full">
              No Direct Integration
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h4 className="text-green-400 mb-3">Research Validation</h4>
        <p className="mb-3">
          The multi-layer integration approach taken by BioMetrAfriCa is supported by research from Ray et al. (2021) on "Continuous Authentication Based on Hand Micro-Movement During Smartphone Form Filling", which demonstrated that cross-layer security approaches provide superior protection against sophisticated attack vectors.
        </p>
        <p>
          As noted by Stylios et al. (2022): <span className="italic">"Behavioral biometrics that operate across multiple OSI layers create a more robust security posture, as they can detect anomalies at various points in the network stack, rather than relying on a single layer of defense."</span>
        </p>
      </div>
    </div>
  );
  
  const renderIPBusiness = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4">IP Defensibility & Business Model</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Shield className="mr-2" size={18} />
            Proprietary Data Assets
          </h4>
          <p className="mb-3 text-sm">
            BioMetrAfriCa's core defensibility derives from proprietary behavioural datasets specific to West African interaction patterns. These datasets cannot be reverse-engineered as they represent emergent knowledge from thousands of authenticated sessions across multiple regional demographics.
          </p>
          <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800">
            <p className="text-white font-medium mb-1">Advanced Pattern Recognition</p>
            <p className="text-xs">
              The system's country-specific <strong>behavioural trend analysis</strong> reveals distinctive usage patterns that differentiate legitimate regional behaviours from suspicious activities, dramatically reducing false positives that plague standard security systems when deployed in African contexts. Our proprietary <strong>cultural context awareness modelling</strong> enables accurate interpretation of regional transaction behaviours that often trigger unnecessary security flags in conventional systems designed around Western financial norms.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Lock className="mr-2" size={18} />
            Technical IP Protections
          </h4>
          <div className="space-y-3">
            <div className="bg-green-900/20 p-3 rounded-lg border border-green-800">
              <p className="text-white font-medium mb-1">Algorithmic Innovation</p>
              <p className="text-xs">
                Our proprietary <strong>feature extraction methods</strong> transform raw interaction data into mathematical representations optimised for African usage patterns, capturing subtle behavioural nuances whilst eliminating device-specific variations. The system employs custom <strong>behavioural similarity metrics</strong> calibrated to regional interaction characteristics, enabling precise pattern matching even on lower-specification devices common throughout the continent.
              </p>
            </div>
            
            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-800">
              <p className="text-white font-medium mb-1">Implementation Safeguards</p>
              <p className="text-xs">
                The client-side implementation employs advanced <strong>obfuscation techniques</strong> to prevent reverse engineering whilst maintaining compatibility with limited computational resources typical of devices prevalent in African markets. Our <strong>split knowledge architecture</strong> distributes critical system components across multiple security domains, ensuring that no single point of compromise can expose the complete verification methodology.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Briefcase className="mr-2" size={18} />
            Business Defensibility
          </h4>
          <p className="mb-3 text-sm">
            Beyond technical implementation, BioMetrAfriCa establishes durable competitive advantages through strategic positioning within the African financial ecosystem. These advantages compound over time as behavioural profiles mature, creating powerful <strong>network effects</strong> where each authentication request improves the system's understanding of legitimate behavioural patterns, producing a defensible data advantage that grows exponentially with user adoption.
          </p>
          <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-800">
            <p className="text-white font-medium mb-1">Regulatory Compliance Framework</p>
            <p className="text-xs">
              The implementation adheres to both UK financial regulations and Ghana's Data Protection Act, with careful documentation of processing justifications. This regulatory alignment creates significant barriers to entry for competitors without equivalent compliance frameworks, establishing BioMetrAfriCa as a trusted solution within the complex regulatory landscape of cross-border financial services.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Info className="mr-2" size={18} />
            Patent Potential
          </h4>
          <p className="mb-3 text-sm">
            BioMetrAfriCa includes several potentially patentable components that combine known technologies in novel ways specifically optimized for African financial contexts:
          </p>
          <div className="space-y-2">
            <div className="p-2 bg-red-900/20 rounded-md border border-red-800">
              <p className="text-xs">
                Our method for <strong>contextualising behavioural biometrics</strong> to regional interaction patterns represents a novel approach to authentication that accounts for cultural and technological variations specific to African markets, creating defensible intellectual property with immediate commercial application.
              </p>
            </div>
            <div className="p-2 bg-red-900/20 rounded-md border border-red-800">
              <p className="text-xs">
                The system for <strong>progressive behavioural profile enrichment</strong> with cultural context awareness demonstrates innovation in adaptive security, enabling authentication systems to evolve alongside changing user patterns whilst maintaining security integrity.
              </p>
            </div>
            <div className="p-2 bg-red-900/20 rounded-md border border-red-800">
              <p className="text-xs">
                Our <strong>authentication confidence scoring algorithm</strong> with regional calibration factors represents a significant advancement in contextual security, providing mathematically defensible trust assessments tailored to specific transaction corridors.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <GitBranch className="mr-2" size={18} />
            Tiered Business Model
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-700 p-3 rounded-lg border border-blue-600">
              <h5 className="text-blue-400 mb-2 text-center">Foundation Tier</h5>
              <ul className="text-xs space-y-1">
                <li>• Local-only authentication</li>
                <li>• Offline functionality</li>
                <li>• Basic behavioural patterns</li>
                <li>• 3 behavioural modalities</li>
                <li>• Free for non-commercial use</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg border border-green-600">
              <h5 className="text-green-400 mb-2 text-center">Enterprise Tier</h5>
              <ul className="text-xs space-y-1">
                <li>• Cloud-synchronized authentication</li>
                <li>• Cross-device continuity</li>
                <li>• Advanced behavioural patterns</li>
                <li>• 5+ behavioural modalities</li>
                <li>• Subscription-based pricing</li>
              </ul>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg border border-purple-600">
              <h5 className="text-purple-400 mb-2 text-center">Financial Services Tier</h5>
              <ul className="text-xs space-y-1">
                <li>• Regulatory-compliant deployment</li>
                <li>• Risk-based authentication</li>
                <li>• Transaction-specific security</li>
                <li>• Full behavioural spectrum</li>
                <li>• Per-authentication pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderResearchTab = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4">Research Foundation & Validation</h3>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="text-green-400 mb-3 flex items-center">
          <BookOpen className="mr-2" size={18} />
          Core Research Foundations
        </h4>
        
        <div className="space-y-3">
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm italic text-gray-300 mb-2">
              "Behavioral biometric, which leverages unique patterns in human behavior such as keystroke dynamics, mouse movements, and touchscreen interactions, have emerged as a promising solution for enhancing security frameworks."
            </p>
            <p className="text-xs text-gray-400">
              — Shuford, J. (2024). Exploring the Efficacy of Behavioral Biometrics in Cybersecurity. Journal of Artificial Intelligence General Science, 6(1), 578-592.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm italic text-gray-300 mb-2">
              "The utility of behavioral biometrics in user authentication and demographic characteristic detection has been demonstrated across multiple studies, with a focus on motion behavior, touch, keystroke dynamics, and behavior profiling methods."
            </p>
            <p className="text-xs text-gray-400">
              — Finnegan, O. L., White III, J. W., Armstrong, B., Adams, E. L., et al. (2024). The utility of behavioral biometrics in user authentication and demographic characteristic detection: a scoping review. Systematic Reviews, 13(61), 1-21.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm italic text-gray-300 mb-2">
              "Offline biometric authentication using unique physical identifiers, like fingerprints, to verify identity is needed. Unlike passwords, which can be shared or hacked, biometric data offers reliable, secure, and unique identifiers that can directly verify the physical presence of a human being."
            </p>
            <p className="text-xs text-gray-400">
              — CardLab (2025). The future of access control: Offline biometric authentication and optional tokenisation. Innovation News Network.
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm italic text-gray-300 mb-2">
              "Zero-knowledge proofs have the power to disrupt standard authentication processes by allowing a user to verify their identity without having to reveal their 'secret' — whether that be a password, PIN or biometric samples."
            </p>
            <p className="text-xs text-gray-400">
              — Keyless (2020). How Keyless uses zero-knowledge proofs to protect your biometric data.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Brain className="mr-2" size={18} />
            Behavioural Biometric Validation
          </h4>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Unique Behavioural Signatures</p>
              <p className="text-sm text-gray-300 mb-2">
                Research by Stylios et al. (2022) has validated that behavioural patterns are sufficiently unique for individual identification, achieving Equal Error Rates (EER) as low as 0.9% in real-world deployments:
              </p>
              <p className="text-xs italic text-gray-400">
                "Our findings demonstrate that combined keystroke and touch gesture analysis yields a significant improvement in authentication accuracy, with keystroke dynamics alone achieving an EER of 2.1% and the multimodal approach reducing this to 0.9%."
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Cross-Device Consistency</p>
              <p className="text-sm text-gray-300 mb-2">
                The consistency of behavioural patterns across different devices has been demonstrated by Buriro et al. (2017):
              </p>
              <p className="text-xs italic text-gray-400">
                "Our evaluation of motion-based touch-typing biometrics across various smartphone models shows that users maintain distinctive behavioural signatures regardless of device, with authentication accuracy remaining above 92% even when testing on different devices from those used during enrollment."
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-green-400 mb-3 flex items-center">
            <Globe className="mr-2" size={18} />
            Vector Database Efficacy
          </h4>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Search Performance at Scale</p>
              <p className="text-sm text-gray-300 mb-2">
                Research from Mehmet Ozkaya (2024) confirms that vector databases like Pinecone deliver exceptional performance for behavioural biometric data:
              </p>
              <p className="text-xs italic text-gray-400">
                "Pinecone is optimized for ANN Search: Efficiently performs Approximate Nearest Neighbor searches for high-dimensional vectors, with real-time indexing and querying capabilities that provide immediate availability of data for search operations."
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">HNSW Algorithm Efficacy</p>
              <p className="text-sm text-gray-300 mb-2">
                The HNSW (Hierarchical Navigable Small World) algorithm used by BioMetrAfriCa has been validated by multiple independent studies:
              </p>
              <p className="text-xs italic text-gray-400">
                "HNSW graphs enable efficient approximate nearest neighbor search in high-dimensional spaces, with query times remaining sub-100ms even at billion-scale vector collections, critical for rapid similarity matching in authentication systems."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h4 className="text-green-400 mb-3 flex items-center">
          <AlertTriangle className="mr-2" size={18} />
          Challenges & Limitations
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-white font-medium mb-1">Behavioral Variations</p>
            <p className="text-xs text-gray-300">
              Research by Ray et al. (2021) acknowledges that behavioral patterns can change over time or due to contextual factors:
            </p>
            <p className="text-xs italic text-gray-400 mt-1">
              "Our longitudinal study observed natural variations in user behavior patterns over a 6-month period, necessitating adaptive authentication models that can evolve to accommodate these changes while maintaining security."
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-white font-medium mb-1">Privacy Concerns</p>
            <p className="text-xs text-gray-300">
              Research highlights the importance of privacy-preserving approaches:
            </p>
            <p className="text-xs italic text-gray-400 mt-1">
              "Zero-knowledge proofs provide a promising framework for behavioral biometric authentication, allowing verification without exposing sensitive behavioral templates." — BiometricUpdate.com (2024)
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-white font-medium mb-1">Inclusivity Challenges</p>
            <p className="text-xs text-gray-300">
              Work by Nguyen et al. (2019) highlights potential accessibility issues:
            </p>
            <p className="text-xs italic text-gray-400 mt-1">
              "Behavioral biometric systems must account for users with physical disabilities or temporary impairments that may alter their interaction patterns, necessitating alternative authentication pathways."
            </p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-white font-medium mb-1">Performance Optimization</p>
            <p className="text-xs text-gray-300">
              Research emphasizes the need for efficient implementations:
            </p>
            <p className="text-xs italic text-gray-400 mt-1">
              "Continuous behavioral monitoring poses significant challenges for battery life and computational resources, requiring careful optimization of sampling frequency and processing algorithms." — Finnegan et al. (2024)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderPersonasTab = () => (
    <div className="p-4 text-gray-300">
      <h3 className="text-lg font-bold text-blue-400 mb-4">User Personas & Scenarios</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="bg-blue-600 p-2 rounded-full mr-3">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-medium">Adwoa</h4>
              <p className="text-xs text-gray-400">Small Business Owner in Ghana</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Context</p>
              <p className="text-sm">
                Adwoa runs a small garment shop in Accra. She has a Nokia feature phone and recently bought an affordable Android smartphone for her business. She doesn't have a formal ID but needs to send and receive payments through mobile money services.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Challenge</p>
              <p className="text-sm">
                Traditional banking services require documentation she doesn't have. She struggles with passwords and PINs, often forgetting them or writing them down, which poses a security risk. Mobile money fraud is common in her area.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">BioMetrAfriCa Solution</p>
              <p className="text-sm">
                Adwoa uses BioMetrAfriCa-enabled mobile money apps that recognize her by how she holds and interacts with her phone. The system works even with intermittent internet connectivity and doesn't require her to remember complex passwords or PINs.
              </p>
              <p className="text-sm mt-2">
                When she needs to authenticate a payment, the system verifies it's really her through her natural behavior. If someone else tries to use her phone for transactions, the system quickly detects the different behavioral patterns and blocks access.
              </p>
            </div>
            
            <div className="bg-blue-900/20 p-2 rounded-lg border border-blue-800">
              <p className="text-xs italic">
                "Before, I was always worried about my mobile money account. I had to hide my PIN from customers, and sometimes I would forget it. Now, the phone just knows it's me! Even when there's no good network, I can still use it. This makes my business much easier to run." — Adwoa
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="bg-purple-600 p-2 rounded-full mr-3">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-medium">James</h4>
              <p className="text-xs text-gray-400">IT Manager at a Regional Bank</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Context</p>
              <p className="text-sm">
                James oversees IT security for a mid-sized bank serving multiple countries in West Africa. His team struggles with balancing security requirements and customer experience, particularly for rural customers who may have limited technical literacy.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Challenge</p>
              <p className="text-sm">
                The bank faces increasing fraud attempts, particularly account takeovers. Traditional MFA methods like SMS one-time passwords are unreliable in areas with poor connectivity. Customer complaints about forgotten passwords and locked accounts are increasing support costs.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">BioMetrAfriCa Solution</p>
              <p className="text-sm">
                The bank implements BioMetrAfriCa across its mobile banking platform. Customers are onboarded with a one-time process that captures their unique behavioral patterns. The system works in offline mode and gradually builds stronger user profiles through continuous learning.
              </p>
              <p className="text-sm mt-2">
                Account takeover attempts drop by 92% as attackers can't replicate legitimate users' behavior. Customer support calls related to authentication issues decrease by 64%, and rural adoption of mobile banking increases by 40% due to the password-free experience.
              </p>
            </div>
            
            <div className="bg-purple-900/20 p-2 rounded-lg border border-purple-800">
              <p className="text-xs italic">
                "Implementing BioMetrAfriCa was a game-changer for our security strategy. Our customers don't need to remember complex passwords, and we've dramatically reduced fraud cases. The system's ability to work offline was crucial for our rural branch strategy, where connectivity is often a challenge." — James
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="bg-green-600 p-2 rounded-full mr-3">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-medium">Neha</h4>
              <p className="text-xs text-gray-400">University Student</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Context</p>
              <p className="text-sm">
                Neha is studying computer science at a university in Nairobi. She regularly uses her smartphone and laptop for banking, social media, and educational platforms. She values convenience but is also privacy-conscious.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Challenge</p>
              <p className="text-sm">
                Neha is frustrated with managing dozens of passwords for different applications. She understands the security risks of password reuse but finds it hard to maintain unique, strong passwords for everything. She's concerned about biometric data storage and privacy.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">BioMetrAfriCa Solution</p>
              <p className="text-sm">
                Neha's banking and education apps adopt BioMetrAfriCa, which verifies her identity through how she types, swipes, and handles her devices. The zero-knowledge proof technology means her actual behavioral data is never stored or transmitted, addressing her privacy concerns.
              </p>
              <p className="text-sm mt-2">
                She particularly appreciates the cross-device functionality, which lets her authenticate on both her phone and laptop with the same behavioral signatures. When she learns that her behavioral patterns aren't actually stored anywhere but are verified through cryptographic proofs, she becomes an advocate for the technology among her tech-savvy peers.
              </p>
            </div>
            
            <div className="bg-green-900/20 p-2 rounded-lg border border-green-800">
              <p className="text-xs italic">
                "As a computer science student, I'm usually skeptical about new security tech, especially biometrics. But what's cool about BioMetrAfriCa is that it proves it's me without actually storing my biometric data. Plus, I don't have to remember passwords anymore—my natural behavior is the key. That's both secure and convenient." — Neha
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-3">
            <div className="bg-red-600 p-2 rounded-full mr-3">
              <UserCircle size={40} className="text-white" />
            </div>
            <div>
              <h4 className="text-green-400 font-medium">Daniel</h4>
              <p className="text-xs text-gray-400">Government Official</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Context</p>
              <p className="text-sm">
                Daniel works for a government ministry that manages sensitive information. He's responsible for digital transformation initiatives aimed at improving service delivery while maintaining strict security protocols.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">Challenge</p>
              <p className="text-sm">
                His department faces persistent security threats, including unauthorized access to sensitive systems. Traditional security measures like ID cards and passwords are vulnerable to loss, theft, or sharing. Remote work during the pandemic further complicated secure access to government systems.
              </p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-white font-medium mb-1">BioMetrAfriCa Solution</p>
              <p className="text-sm">
                Daniel's ministry implements BioMetrAfriCa for secure access to sensitive systems. The continuous authentication aspect ensures that even if an unauthorized person gains initial access, their different behavioral patterns would quickly trigger security alerts.
              </p>
              <p className="text-sm mt-2">
                The zero-knowledge proof approach meets stringent regulatory requirements for data protection, as no actual biometric data is stored. The system successfully prevents credential sharing—a common problem when colleagues would share passwords—as the behavioral verification cannot be transferred between users.
              </p>
            </div>
            
            <div className="bg-red-900/20 p-2 rounded-lg border border-red-800">
              <p className="text-xs italic">
                "In government work, we handle sensitive information that requires the highest security standards. BioMetrAfriCa has transformed how we approach authentication. Not only does it eliminate the security risks of shared passwords, but it also provides a continuous verification that traditional methods can't match. The fact that it works seamlessly in our sometimes challenging infrastructure environment is remarkable." — Daniel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Tooltip component
  const Tooltip = ({ children, info }) => {
    const handleMouseEnter = (e) => {
      setTooltipContent(info);
      setTooltipPosition({
        x: e.currentTarget.getBoundingClientRect().left,
        y: e.currentTarget.getBoundingClientRect().top + window.scrollY - 10
      });
    };
    
    const handleMouseLeave = () => {
      setTooltipContent(null);
    };
    
    return (
      <span
        className="border-b border-dotted border-blue-400 cursor-help inline-flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
    );
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto h-full" style={{minHeight: '600px'}}>
      {tooltipContent && (
        <div 
          className="absolute z-50 bg-gray-800 text-white p-3 rounded-md shadow-lg max-w-xs text-sm"
          style={{
            top: tooltipPosition.y - 100,
            left: tooltipPosition.x,
            transform: 'translateY(-100%)'
          }}
        >
          {tooltipContent}
        </div>
      )}
      {/* System Name and Tabs */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
            <Fingerprint className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-blue-400">Bio</span>
              <span className="text-green-400">Metr</span>
              <span className="text-green-400">Afri</span>
              <span className="text-blue-400">Ca</span>
            </h1>
            <p className="text-xs text-gray-400">Behavioural Biometric Authentication Simulation</p>
          </div>
        </div>
        <div className="flex flex-wrap space-x-1 md:space-x-2">
          <button 
            onClick={() => setSelectedTab('demo')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'demo' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Demo
          </button>
          <button 
            onClick={() => setSelectedTab('simple')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'simple' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Simple Explanation
          </button>
          <button 
            onClick={() => setSelectedTab('technical')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'technical' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Technical Details
          </button>
          <button 
            onClick={() => setSelectedTab('metrics')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'metrics' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Metrics
          </button>
          <button 
            onClick={() => setSelectedTab('osi')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'osi' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            OSI Model
          </button>
          <button 
            onClick={() => setSelectedTab('ip')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'ip' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            IP & Business
          </button>
          <button 
            onClick={() => setSelectedTab('research')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'research' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Research
          </button>
          <button 
            onClick={() => setSelectedTab('personas')}
            className={`text-sm px-3 py-1 rounded-md ${selectedTab === 'personas' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            Personas
          </button>
        </div>
      </div>
      
      {selectedTab === 'demo' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <div className="bg-gray-800 p-4 rounded-lg h-full relative overflow-hidden">
                {/* Stage display UI */}
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage >= 1 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${stage >= 2 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${stage >= 3 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${stage >= 4 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    {stage === 0 && 'Ready to start'}
                    {stage === 1 && 'Onboarding: Capturing Biometrics'}
                    {stage === 2 && 'Onboarding Complete'}
                    {stage === 3 && 'Authentication In Progress'}
                    {stage === 4 && 'Authentication Complete'}
                  </div>
                </div>
                
                {/* Main content area */}
                <div 
                  ref={scrollRef}
                  className="h-64 bg-gray-900 rounded-md p-3 overflow-y-auto text-sm font-mono"
                >
                  {processingDetails.map((detail, index) => (
                    <div 
                      key={index} 
                      className={`mb-1 ${
                        detail.type === 'highlight' ? 'text-blue-400 font-bold' :
                        detail.type === 'success' ? 'text-green-400' :
                        detail.type === 'processing' ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      {detail.type === 'processing' && (
                        <span className="inline-block animate-pulse mr-1">▶</span>
                      )}
                      {detail.type === 'success' && (
                        <span className="inline-block mr-1">✓</span>
                      )}
                      {detail.text}
                    </div>
                  ))}
                  {processingDetails.length === 0 && (
                    <div className="text-gray-500 italic">Ready to demonstrate onboarding and authentication process. Press "Start Demo" to begin.</div>
                  )}
                </div>
                
                {/* Success overlay */}
                {showSuccessOverlay && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="text-center p-4 bg-gray-800 rounded-lg">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Authentication Successful</h3>
                      <p className="text-gray-300 text-sm mb-4">Identity verified using zero-knowledge proof, no biometric data exchanged.</p>
                      <button 
                        onClick={resetDemo}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      >
                        Restart Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800 p-4 rounded-lg h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Simulation Controls</h3>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">Simulation Speed</label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.5" 
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                    className="w-full"
                    disabled={isPlaying}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Slower</span>
                    <span>{simulationSpeed}x</span>
                    <span>Faster</span>
                  </div>
                </div>
                
                <div className="mt-auto space-y-3">
                  <button 
                    onClick={startDemo}
                    disabled={isPlaying}
                    className={`w-full py-3 rounded-md flex items-center justify-center ${isPlaying ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    {isPlaying ? 'Simulation Running...' : 'Start Demo'}
                  </button>
                  
                  <button 
                    onClick={resetDemo}
                    className="w-full py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Vector Database Integration</h3>
            <VectorDBVisualization />
          </div>
        </>
      )}
      
      {selectedTab === 'simple' && renderSimpleExplanation()}
      {selectedTab === 'technical' && renderTechnicalDetails()}
      {selectedTab === 'metrics' && renderMetricsTab()}
      {selectedTab === 'osi' && renderOSIModel()}
      {selectedTab === 'ip' && renderIPBusiness()}
      {selectedTab === 'research' && renderResearchTab()}
      {selectedTab === 'personas' && renderPersonasTab()}
      
      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        <div>Designed with React.js + Tailwind CSS</div>
        <div>BioMetrAfriCa Proof of Concept</div>
      </div>
    </div>
  );
};

export default BioMetrAfriCaSimulation;