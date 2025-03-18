import React, { useEffect, useRef } from "react";
import "../CSS/stylesheetParticleEffect.css"; 
// import "../CSS/Particle.css";
const ParticleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let outerParticles = [];
    let innerParticles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 170;
    const innerRadius = 160;
    const maxDistance = 450;
    const outerParticleCount = 1;
    const innerParticleCount = 2;

    class OuterParticle {
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = outerRadius + Math.random() * 10;
        this.speed = Math.random() * 0.1 + 0.02;
        this.opacity = 1;
        this.size = Math.random() * 0.3 + 0.5;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.distance += this.speed * this.direction;
        this.opacity -= 0.005;

        if (this.distance < innerRadius || this.distance > maxDistance || this.opacity <= 0) {
          this.reset();
        }
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = outerRadius + Math.random() * 10;
        this.speed = Math.random() * 0.1 + 0.02;
        this.opacity = 1;
        this.size = Math.random() * 0.2 + 0.5;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      draw() {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    class InnerParticle {
      constructor() {
        this.x = centerX + (Math.random() * innerRadius * 2 - innerRadius);
        this.y = centerY + (Math.random() * innerRadius * 2 - innerRadius);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = 1;
        this.size = Math.random() * 0.2 + 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        let dx = this.x - centerX;
        let dy = this.y - centerY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > innerRadius) {
          this.x = centerX + (dx / dist) * innerRadius;
          this.y = centerY + (dy / dist) * innerRadius;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const createParticles = () => {
      for (let i = 0; i < 500; i++) {
        outerParticles.push(new OuterParticle());
      }
      for (let i = 0; i < 100; i++) {
        innerParticles.push(new InnerParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      outerParticles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      innerParticles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < outerParticleCount; i++) {
        outerParticles.push(new OuterParticle());
      }

      for (let i = 0; i < innerParticleCount; i++) {
        innerParticles.push(new InnerParticle());
      }

      if (outerParticles.length > 1000) {
        outerParticles.splice(0, outerParticleCount);
      }

      if (innerParticles.length > 500) {
        innerParticles.splice(0, innerParticleCount);
      }

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      outerParticles = [];
      innerParticles = [];
    };
  }, []);

  return (
    <div className="body">
    <div className="circle-warpper">
      <canvas ref={canvasRef} id="particleCanvas"></canvas>
      {[...Array(30)].map((_, index) => (
        <div key={index} className="animatted-circle"></div>
      ))}
    </div>
    </div>
  );
};

export default ParticleEffect;