import React, { useEffect, useRef } from "react";

const NeuroResultsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let brainNetwork = [];
    let dataPoints = [];
    let hue = 230; // Start with blue/indigo hue
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Particle class for neural network visualization
    class Particle {
      constructor(x, y, isFixed = false, significance = 1) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        this.radius = Math.random() * 1.5 + 0.5 + significance;
        this.baseRadius = this.radius;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.friction = 0.95;
        this.isFixed = isFixed;
        this.significance = significance;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.color = isFixed ? `hsla(${(hue + 30) % 360}, 80%, 60%,` : `hsla(${hue}, 80%, 60%,`;
      }
      
      update() {
        if (!this.isFixed) {
          this.x += this.vx;
          this.y += this.vy;
          
          // Apply slight gravitation toward original position
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;
          
          this.vx += dx * 0.0005;
          this.vy += dy * 0.0005;
          
          // Apply friction
          this.vx *= this.friction;
          this.vy *= this.friction;
          
          // Bounce off edges with damping
          if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx * 0.5;
            this.x = this.x < 0 ? 0 : canvas.width;
          }
          if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy * 0.5;
            this.y = this.y < 0 ? 0 : canvas.height;
          }
        }
        
        // Pulse effect for visual interest
        this.pulse += this.pulseSpeed;
        if (this.pulse > Math.PI * 2) this.pulse = 0;
        
        // Size pulsation for the fixed/significant nodes
        if (this.isFixed) {
          this.radius = this.baseRadius + Math.sin(this.pulse) * 0.5 * this.significance;
        }
      }
      
      draw() {
        const pulseOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${pulseOpacity})`;
        ctx.fill();
        
        // Add subtle glow for significant nodes
        if (this.isFixed) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${this.color}${pulseOpacity * 0.2})`;
          ctx.fill();
        }
      }
    }
    
    // Connection class for neural network
    class Connection {
      constructor(particleA, particleB, strength = 1) {
        this.particleA = particleA;
        this.particleB = particleB;
        this.strength = strength; // 0-1
        this.opacity = 0.1 + (strength * 0.2);
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + (Math.random() * 0.02);
        this.flow = 0;
        this.flowSpeed = 0.01 + (Math.random() * 0.03);
        this.baseHue = hue;
      }
      
      update() {
        this.pulse += this.pulseSpeed;
        if (this.pulse > Math.PI * 2) this.pulse = 0;
        
        this.flow += this.flowSpeed;
        if (this.flow > 1) this.flow = 0;
        
        // Create slight attraction between connected particles
        if (!this.particleA.isFixed && !this.particleB.isFixed) {
          const dx = this.particleB.x - this.particleA.x;
          const dy = this.particleB.y - this.particleA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only apply forces if there's a reasonable gap
          if (distance > 10) {
            const forceX = dx * 0.0001 * this.strength;
            const forceY = dy * 0.0001 * this.strength;
            
            this.particleA.vx += forceX;
            this.particleA.vy += forceY;
            this.particleB.vx -= forceX;
            this.particleB.vy -= forceY;
          }
        }
      }
      
      draw() {
        const dx = this.particleB.x - this.particleA.x;
        const dy = this.particleB.y - this.particleA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw if within reasonable distance
        if (distance < 250) {
          const opacity = Math.max(0, this.opacity * (1 - distance / 250) * (0.5 + 0.5 * Math.sin(this.pulse)));
          
          // Draw the main connection
          ctx.beginPath();
          ctx.moveTo(this.particleA.x, this.particleA.y);
          ctx.lineTo(this.particleB.x, this.particleB.y);
          ctx.strokeStyle = `hsla(${this.baseHue}, 80%, 60%, ${opacity})`;
          ctx.lineWidth = this.strength * 1.5;
          ctx.stroke();
          
          // Draw flowing data particle along the connection
          if (this.strength > 0.5) {
            const flowPos = this.flow;
            const flowX = this.particleA.x + dx * flowPos;
            const flowY = this.particleA.y + dy * flowPos;
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${(this.baseHue + 40) % 360}, 100%, 75%, ${opacity * 2})`;
            ctx.fill();
          }
        }
      }
    }
    
    // Data Point class for analysis graphs in the background
    class DataPoint {
      constructor() {
        this.values = []; // Array of data point values
        this.color = `hsla(${Math.random() * 60 + 210}, 80%, 60%,`; // Blue-purple range
        this.width = Math.random() * 200 + 100;
        this.height = Math.random() * 80 + 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.opacity = 0.05 + (Math.random() * 0.05);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // Generate random data points along a sine wave with noise
        const pointCount = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < pointCount; i++) {
          const normalized = i / (pointCount - 1);
          const value = 0.5 + 
                      (Math.sin(normalized * Math.PI * (Math.random() * 3 + 1)) * 0.3) + 
                      (Math.random() * 0.2 - 0.1);
          this.values.push(value);
        }
      }
      
      update() {
        // Slowly move across the screen
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x + this.width > canvas.width) {
          this.vx = -this.vx;
          this.x = this.x < 0 ? 0 : canvas.width - this.width;
        }
        if (this.y < 0 || this.y + this.height > canvas.height) {
          this.vy = -this.vy;
          this.y = this.y < 0 ? 0 : canvas.height - this.height;
        }
      }
      
      draw() {
        const points = this.values.length;
        const stepX = this.width / (points - 1);
        
        // Draw line graph
        ctx.beginPath();
        for (let i = 0; i < points; i++) {
          const px = this.x + (i * stepX);
          const py = this.y + this.height - (this.values[i] * this.height);
          
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = `${this.color}${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add subtle gradient fill
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x, this.y + this.height
        );
        gradient.addColorStop(0, `${this.color}${this.opacity * 0.2})`);
        gradient.addColorStop(1, `${this.color}0)`);
        
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Create brain structure points - arranged in brain-like patterns
    const createBrainStructure = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.35;
      
      // Brain-shaped node positions (simplified) positioned near the middle-right
      const positions = [
        // Frontal lobe
        { x: 0.1, y: -0.35, fixed: true, significance: 2.5 },
        { x: -0.1, y: -0.35, fixed: true, significance: 2.5 },
        { x: 0.2, y: -0.25, fixed: true, significance: 2 },
        { x: -0.2, y: -0.25, fixed: true, significance: 2 },
        
        // Parietal lobe
        { x: 0.25, y: 0, fixed: true, significance: 3 },
        { x: -0.25, y: 0, fixed: true, significance: 3 },
        
        // Temporal lobe
        { x: 0.3, y: 0.2, fixed: true, significance: 2 },
        { x: -0.3, y: 0.2, fixed: true, significance: 2 },
        
        // Occipital lobe
        { x: 0.1, y: 0.35, fixed: true, significance: 2.5 },
        { x: -0.1, y: 0.35, fixed: true, significance: 2.5 },
        
        // Add some bridge nodes
        { x: 0, y: 0, fixed: true, significance: 4 },
        { x: 0, y: -0.15, fixed: true, significance: 1.5 },
        { x: 0, y: 0.15, fixed: true, significance: 1.5 },
      ];
      
      // Create nodes based on positions
      const brainParticles = positions.map(pos => {
        return new Particle(
          centerX + pos.x * scale * 1.2,
          centerY + pos.y * scale,
          pos.fixed,
          pos.significance
        );
      });
      
      return brainParticles;
    };
    
    // Initialize brain network
    const initBrainNetwork = () => {
      // Clear existing
      particles = [];
      brainNetwork = [];
      
      // Create the fixed brain structure
      const brainNodes = createBrainStructure();
      particles.push(...brainNodes);
      
      // Add floating network nodes
      for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
      }
      
      // Create connections between brain nodes
      for (let i = 0; i < brainNodes.length; i++) {
        for (let j = i + 1; j < brainNodes.length; j++) {
          // Higher probability for closer nodes
          const dx = brainNodes[i].x - brainNodes[j].x;
          const dy = brainNodes[i].y - brainNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < canvas.width * 0.4 && Math.random() < 0.8) {
            const strength = Math.max(0.1, 1 - (distance / (canvas.width * 0.2)));
            brainNetwork.push(new Connection(brainNodes[i], brainNodes[j], strength));
          }
        }
      }
      
      // Create connections between floating nodes and brain structure
      particles.forEach(particle => {
        if (!particle.isFixed) {
          // Connect some floating nodes to the brain
          const closestNodes = brainNodes
            .sort((a, b) => {
              const distA = Math.hypot(particle.x - a.x, particle.y - a.y);
              const distB = Math.hypot(particle.x - b.x, particle.y - b.y);
              return distA - distB;
            })
            .slice(0, 2); // Get 2 closest brain nodes
          
          closestNodes.forEach(node => {
            if (Math.random() < 0.7) {
              brainNetwork.push(new Connection(particle, node, 0.3 + Math.random() * 0.3));
            }
          });
          
          // Connect some floating nodes to each other
          for (let i = 0; i < 3; i++) {
            if (Math.random() < 0.4) {
              const otherParticle = particles[Math.floor(Math.random() * particles.length)];
              if (otherParticle !== particle && !otherParticle.isFixed) {
                brainNetwork.push(new Connection(particle, otherParticle, 0.1 + Math.random() * 0.3));
              }
            }
          }
        }
      });
    };
    
    // Initialize data points
    const initDataPoints = () => {
      dataPoints = [];
      for (let i = 0; i < 5; i++) {
        dataPoints.push(new DataPoint());
      }
    };
    
    // Draw background
    const drawBackground = () => {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(17, 24, 39, 1)"); // gray-900
      gradient.addColorStop(0.5, "rgba(19, 26, 43, 1)"); // mix
      gradient.addColorStop(1, "rgba(30, 41, 59, 1)"); // slate-800
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";
      ctx.lineWidth = 1;
      
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      drawBackground();
      
      // Update and draw data points (in background)
      dataPoints.forEach(dataPoint => {
        dataPoint.update();
        dataPoint.draw();
      });
      
      // Update network connections
      brainNetwork.forEach(connection => {
        connection.update();
        connection.draw();
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Slowly shift hue
      hue = (hue + 0.05) % 360;
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    initBrainNetwork();
    initDataPoints();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
};

export default NeuroResultsBackground;