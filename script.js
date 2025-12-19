// --- BACKGROUND MOTION (PARTICLES) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 242, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function init() {
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();
// --- 2. COMPLEX 3D HELIX ---
function initDNA() {
    const container = document.getElementById('dna-3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
    const geometry = new THREE.SphereGeometry(0.1, 12, 12);

    for (let i = 0; i < 80; i++) {
        const y = (i * 0.2) - 8;
        const angle = i * 0.4;
        
        const s1 = new THREE.Mesh(geometry, material);
        s1.position.set(Math.cos(angle) * 2, y, Math.sin(angle) * 2);
        group.add(s1);

        const s2 = new THREE.Mesh(geometry, material);
        s2.position.set(Math.cos(angle + Math.PI) * 2, y, Math.sin(angle + Math.PI) * 2);
        group.add(s2);

        if (i % 2 === 0) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints([s1.position, s2.position]);
            const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color: 0x00f2ff, transparent: true, opacity: 0.3}));
            group.add(line);
        }
    }
    scene.add(group);
    camera.position.z = 12;

    function renderDNA() {
        requestAnimationFrame(renderDNA);
        group.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    renderDNA();
}

// Start DNA after window loads to ensure container is ready
window.onload = initDNA;