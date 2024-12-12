// 获取canvas元素
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// 设置canvas大小为全屏
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 雪花粒子
const snowflakes = [];

// 创建雪花粒子
function createSnowflake() {
    const size = Math.random() * 3 + 2; // 雪花大小
    const x = Math.random() * canvas.width; // 雪花初始x坐标，覆盖整个画布
    const y = Math.random() * canvas.height; // 雪花初始y坐标，覆盖整个画布
    const speedX = Math.random() * 0.5 - 0.25; // 水平速度，可以是正的也可以是负的，让雪花有更多的随机方向
    const speedY = Math.random() * 1 + 0.5; // 垂直速度，确保雪花垂直向下运动
    snowflakes.push({ x, y, size, speedX, speedY });
}

// 更新雪花位置
function updateSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        flake.x += flake.speedX; // 向右或向左移动
        flake.y += flake.speedY; // 向下移动

        // 如果雪花移出了屏幕，重新从顶部随机位置开始
        if (flake.x > canvas.width || flake.x < 0 || flake.y > canvas.height) {
            flake.x = Math.random() * canvas.width; // 从屏幕顶部重新开始，随机X坐标
            flake.y = -flake.size; // 重置雪花位置到屏幕顶部
        }
    }
}

// 绘制雪花
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // 设置雪花颜色并加透明度
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2); // 绘制雪花圆形
        ctx.fill();
    });
}

// 主动画循环
function animate() {
    updateSnowflakes();
    drawSnowflakes();
    requestAnimationFrame(animate);
}

// 创建雪花并启动动画
for (let i = 0; i < 200; i++) {
    createSnowflake();
}
animate();

// 监听窗口大小变化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
