import React, { useEffect, useRef } from "react";

const NeuroBrainBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let connections = [];
    let hue = 220; // Start with a blue hue
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = Math.random() * 0.2 - 0.1;
        this.vy = Math.random() * 0.2 - 0.1;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulse = 0;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        
        // Pulse effect
        this.pulse += this.pulseSpeed;
        if (this.pulse > Math.PI * 2) this.pulse = 0;
      }
      
      draw() {
        const pulseOpacity = this.opacity * (0.8 + 0.2 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${pulseOpacity})`;
        ctx.fill();
      }
    }
    
    // Brain structure points - represent key EEG electrode positions
    const createBrainStructure = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.35;
      
      // Standard 10-20 system electrode positions (simplified)
      const positions = [
        { name: "Fp1", x: -0.3, y: -0.4 },
        { name: "Fp2", x: 0.3, y: -0.4 },
        { name: "F7", x: -0.7, y: -0.15 },
        { name: "F3", x: -0.4, y: -0.2 },
        { name: "Fz", x: 0, y: -0.2 },
        { name: "F4", x: 0.4, y: -0.2 },
        { name: "F8", x: 0.7, y: -0.15 },
        { name: "T3", x: -0.7, y: 0 },
        { name: "C3", x: -0.4, y: 0 },
        { name: "Cz", x: 0, y: 0 },
        { name: "C4", x: 0.4, y: 0 },
        { name: "T4", x: 0.7, y: 0 },
        { name: "T5", x: -0.7, y: 0.15 },
        { name: "P3", x: -0.4, y: 0.2 },
        { name: "Pz", x: 0, y: 0.2 },
        { name: "P4", x: 0.4, y: 0.2 },
        { name: "T6", x: 0.7, y: 0.15 },
        { name: "O1", x: -0.3, y: 0.4 },
        { name: "O2", x: 0.3, y: 0.4 }
      ];
      
      // Create particles at electrode positions
      return positions.map(pos => {
        return new Particle(
          centerX + pos.x * scale,
          centerY + pos.y * scale
        );
      });
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      
      // Add brain structure particles
      const brainParticles = createBrainStructure();
      particles.push(...brainParticles);
      
      // Add random particles
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    };
    
    // Create connections between particles
    const updateConnections = () => {
      connections = [];
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            connections.push({
              p1, p2, distance,
              opacity: 1 - (distance / maxDistance)
            });
          }
        }
      }
    };
    
    // Draw background
    const drawBackground = () => {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(17, 24, 39, 1)"); // gray-900
      gradient.addColorStop(1, "rgba(30, 41, 59, 1)"); // slate-800
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)";
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
    
    // Draw connections
    const drawConnections = () => {
      for (const conn of connections) {
        ctx.beginPath();
        ctx.moveTo(conn.p1.x, conn.p1.y);
        ctx.lineTo(conn.p2.x, conn.p2.y);
        
        const pulseOpacity = conn.opacity * (0.5 + 0.5 * Math.sin(conn.p1.pulse + conn.p2.pulse));
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${pulseOpacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };
    
    // Draw EEG wave
    const drawEEGWave = () => {
      const waveHeight = 50;
      const waveWidth = canvas.width;
      const yPos = canvas.height * 0.8;
      
      ctx.beginPath();
      ctx.moveTo(0, yPos);
      
      for (let x = 0; x < waveWidth; x++) {
        // Create a complex EEG-like wave pattern
        const time = Date.now() / 1000;
        const y = yPos + 
          Math.sin(x * 0.01 + time) * 8 +
          Math.sin(x * 0.02 + time * 1.5) * 4 +
          Math.sin(x * 0.04 + time * 2) * 10 * (Math.sin(time * 0.4) + 1.5);
          
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.2)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    // Create a few floating data elements
    const dataElements = [];
    for (let i = 0; i < 5; i++) {
      dataElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15,
        size: Math.random() * 80 + 40,
        type: Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: triangle
      });
    }
    
    // Draw data elements
    const drawDataElements = () => {
      for (const elem of dataElements) {
        // Update position
        elem.x += elem.vx;
        elem.y += elem.vy;
        
        // Bounce off edges
        if (elem.x < 0 || elem.x > canvas.width) elem.vx = -elem.vx;
        if (elem.y < 0 || elem.y > canvas.height) elem.vy = -elem.vy;
        
        ctx.strokeStyle = `hsla(${hue}, 70%, 70%, 0.08)`;
        ctx.lineWidth = 2;
        
        switch (elem.type) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(elem.x, elem.y, elem.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 1: // Square
            ctx.beginPath();
            ctx.rect(elem.x - elem.size / 2, elem.y - elem.size / 2, elem.size, elem.size);
            ctx.stroke();
            break;
          case 2: // Triangle
            const h = elem.size * Math.sqrt(3) / 2;
            ctx.beginPath();
            ctx.moveTo(elem.x, elem.y - elem.size / 2);
            ctx.lineTo(elem.x - elem.size / 2, elem.y + h / 2);
            ctx.lineTo(elem.x + elem.size / 2, elem.y + h / 2);
            ctx.closePath();
            ctx.stroke();
            break;
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      drawBackground();
      
      // Draw data elements
      drawDataElements();
      
      // Update particles
      particles.forEach(p => p.update());
      
      // Update connections
      updateConnections();
      
      // Draw connections
      drawConnections();
      
      // Draw particles
      particles.forEach(p => p.draw());
      
      // Draw EEG wave
      drawEEGWave();
      
      // Slowly shift hue
      hue = (hue + 0.05) % 360;
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    initParticles();
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default NeuroBrainBackground;