// Matrix efekt na pozadí
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 22;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10,15,19,0.18)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px Share Tech Mono, monospace';
    ctx.fillStyle = '#00ffb3';
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 44);
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

// Přihlašovací logika (zatím pouze validace prázdných polí)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('loginId').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const errorDiv = document.getElementById('loginError');
    if (!id || !pass) {
        errorDiv.textContent = 'Vyplňte ID i heslo!';
        return;
    }
    // Zde později napojení na backend/Firebase
    errorDiv.textContent = '';
    alert('Přihlášení úspěšné! (zatím pouze demo)');
};
