/* hero3d.js */
window.LosiosHero3D = (() => {
  function initHero3D() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const wire = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.4 })
    );
    group.add(wire);

    const satellites = [];
    for (let i = 0; i < 3; i += 1) {
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.08 + i * 0.02, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 })
      );
      satellites.push({ mesh: sat, radius: 2 + i * 0.55, speed: 0.008 + i * 0.004, angle: Math.random() * Math.PI * 2 });
      group.add(sat);
    }

    const pCount = 80;
    const pointsPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pointsPos[i] = (Math.random() - 0.5) * 10;
      pointsPos[i + 1] = (Math.random() - 0.5) * 10;
      pointsPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pointsPos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x00ff41, size: 0.02, transparent: true, opacity: 0.8 })
    );
    group.add(points);

    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    window.addEventListener("scroll", () => {
      wire.position.y = window.scrollY * -0.0012;
    });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    function animate() {
      wire.rotation.x += 0.002;
      wire.rotation.y += 0.0025;

      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 1.15) * sat.radius * 0.6;
        sat.mesh.position.z = Math.sin(sat.angle) * 0.5;
      });

      const arr = pGeo.attributes.position.array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += 0.0015;
        if (arr[i + 1] > 5) arr[i + 1] = -5;
      }
      pGeo.attributes.position.needsUpdate = true;

      group.rotation.y += (mouse.x * 0.35 - group.rotation.y) * 0.02;
      group.rotation.x += (-mouse.y * 0.2 - group.rotation.x) * 0.02;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  return { initHero3D };
})();
