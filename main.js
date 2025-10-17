document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");

  // Create particle canvas
  const particleCanvas = document.createElement("canvas");
  particleCanvas.id = "particle-bg";
  document.body.appendChild(particleCanvas);
  const ctx = particleCanvas.getContext("2d");

  let particles = [];
  const numParticles = 60;

  function resize() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    ctx.fillStyle = "rgba(100, 255, 218, 0.4)";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();

  // Add glowing gradient overlay
  const gradientOverlay = document.createElement("div");
  gradientOverlay.classList.add("gradient-overlay");
  document.body.appendChild(gradientOverlay);
});
