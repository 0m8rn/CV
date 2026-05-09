/* particles.js */
window.LosiosParticles = (() => {
  const state = {
    nodes: [],
    mouse: { x: -9999, y: -9999 },
    rafId: null,
    canvas: null,
    ctx: null
  };

  function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.id = "bg-particles";
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "1",
      pointerEvents: "none"
    });
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    state.canvas = canvas;
    state.ctx = ctx;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    state.nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    window.addEventListener("mousemove", (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    });

    animate();
  }

  function animate() {
    const { canvas, ctx, nodes, mouse } = state;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node, i) => {
      const dxm = node.x - mouse.x;
      const dym = node.y - mouse.y;
      const md = Math.hypot(dxm, dym);
      if (md < 120 && md > 0) {
        node.vx += (dxm / md) * 0.04;
        node.vy += (dym / md) * 0.04;
      }

      node.vx *= 0.985;
      node.vy *= 0.985;
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));

      const brighten = md < 120 ? 0.75 : 0.4;
      ctx.fillStyle = `rgba(0, 212, 255, ${brighten})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j += 1) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const d = Math.hypot(dx, dy);
        if (d < 150) {
          const alpha = ((150 - d) / 150) * 0.1;
          ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });

    state.rafId = requestAnimationFrame(animate);
  }

  return { initParticles };
})();
