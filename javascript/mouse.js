// 获取容器
const particlesContainer = document.getElementById('particles');

// 设置容器样式，使其位于页面的最上层
particlesContainer.style.position = 'fixed';
particlesContainer.style.top = '0';
particlesContainer.style.left = '0';
particlesContainer.style.width = '100vw';
particlesContainer.style.height = '100vh';
particlesContainer.style.zIndex = '9999';  // 设置一个高的 z-index，确保在其他元素之上

// 粒子数量
const numParticles = 50;
const particleArray = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// 初始化粒子
function createParticle(x, y) {
    const size = Math.random() * 1 + 2;  // 粒子大小在2px到4px之间
    const angle = Math.random() * Math.PI * 2;  // 随机的初始角度
    const distance = Math.random() * 10 + 40; // 粒子到鼠标中心的初始距离

    // 每个粒子的接近速度（随机生成）
    const speed = Math.random() * 0.01 + 0.02;  // 旋转速度
    const approachSpeed = Math.random() * 0.03 + 0.03; // 随机的靠近速度

    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;  // 随机颜色
    particle.style.transformOrigin = 'center';
    particlesContainer.appendChild(particle);

    // 粒子对象
    particleArray.push({
        element: particle,
        angle,
        distance,
        speed,  // 旋转速度
        approachSpeed,  // 靠近速度
        x,  // 当前x位置
        y,  // 当前y位置
        targetX: x,  // 目标位置X
        targetY: y   // 目标位置Y
    });
}

// 创建初始粒子
function initParticles(x, y) {
    for (let i = 0; i < numParticles; i++) {
        createParticle(x, y);
    }
}

// 更新粒子的位置和旋转
function updateParticles() {
    particleArray.forEach(particle => {
        // 更新旋转角度
        particle.angle += particle.speed;

        // 计算粒子新的目标位置
        const dx = mouseX - particle.targetX;
        const dy = mouseY - particle.targetY;
        const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

        // 粒子向目标位置缓慢靠近，使用不同的靠近速度
        if (distanceToTarget > 1) {
            particle.targetX += dx * particle.approachSpeed;  // 缓慢靠近目标
            particle.targetY += dy * particle.approachSpeed;
        }

        // 计算粒子的新位置
        particle.x = particle.targetX + particle.distance * Math.cos(particle.angle);
        particle.y = particle.targetY + particle.distance * Math.sin(particle.angle);

        // 更新粒子的位置
        particle.element.style.left = `${particle.x - particle.element.offsetWidth / 2}px`;
        particle.element.style.top = `${particle.y - particle.element.offsetHeight / 2}px`;

        // 粒子一直围绕鼠标旋转
        particle.element.style.transform = `rotate(${particle.angle}rad)`;
    });

    requestAnimationFrame(updateParticles);
}

// 监听鼠标移动事件
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 初始化粒子并开始旋转
initParticles(window.innerWidth / 2, window.innerHeight / 2);
updateParticles();

// 当页面尺寸变化时，重新初始化粒子
window.addEventListener('resize', () => {
    particleArray.forEach(particle => particle.element.remove());
    particleArray.length = 0;
    initParticles(window.innerWidth / 2, window.innerHeight / 2);
});
