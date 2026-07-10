document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // Typing Animation
    // =========================

    const words = [
        "Backend Developer",
        "Python Developer",
        "Flask Developer",
        "Open Source Learner"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typingText = document.getElementById("typing-text");

    function typeEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex++;

            if (charIndex > currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex--;

            if (charIndex < 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

        }

        setTimeout(typeEffect, deleting ? 60 : 100);

    }

    typeEffect();

    // =========================
    // Particle Background
    // =========================

    const canvas = document.getElementById("particle-bg");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    const totalParticles = 70;

    for (let i = 0; i < totalParticles; i++) {

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            radius: Math.random() * 2 + 1,

            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7

        });

    }

    function animateParticles() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {

            particle.x += particle.dx;
            particle.y += particle.dy;

            if (particle.x <= 0 || particle.x >= canvas.width)
                particle.dx *= -1;

            if (particle.y <= 0 || particle.y >= canvas.height)
                particle.dy *= -1;

            ctx.beginPath();
            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "rgba(56,189,248,0.8)";
            ctx.fill();

        });

        // Draw Lines

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle = "rgba(56,189,248,0.12)";
                    ctx.lineWidth = 1;
                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(animateParticles);

    }

    animateParticles();

    // =========================
    // Smooth Scrolling
    // =========================

    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

});
