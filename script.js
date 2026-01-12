const reasons = [
    "The way you make me smile through a screen.",
    "Your voice is my favorite notification.",
    "How you handle the distance with so much grace.",
    "The way you believe in me more than I do.",
    "You are the best thing that ever happened to me."
    
];

let hugs = 0;
let isPlaying = false;
let candles = [];
let audioContext, analyser, microphone;


function showPart(partNumber) {
    document.getElementById('part-1').style.display = 'none';
    document.getElementById('part-2').style.display = 'none';
    document.getElementById('part-3').style.display = 'none';
    document.getElementById('part-4').style.display = 'none';

    const selectedPart = document.getElementById('part-' + partNumber);
    selectedPart.style.display = 'block';
    
    
    if (partNumber === 4) {
        initCake();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function validatePassword() {
    const pass = document.getElementById('secret-code').value;
    if (pass === '011406') {
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('lock-screen').style.display = 'flex'; 
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function openGift() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    showPart(1);
    createConfetti();
    document.getElementById('bg-music').play();
    isPlaying = true;
}


function initCake() {
    const cake = document.querySelector('.cake');
    
    candles.forEach(c => c.remove());
    candles = [];

    
    addCandle(125, 30);

    
    cake.onclick = (e) => {
        const rect = cake.getBoundingClientRect();
        addCandle(e.clientX - rect.left, e.clientY - rect.top);
    };

    
    if (!analyser) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            detectBlow();
        }).catch(err => console.error("Mic error:", err));
    }
}

function addCandle(left, top) {
    const cake = document.querySelector('.cake');
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.style.left = left + 'px';
    candle.style.top = top + 'px';
    
    const flame = document.createElement('div');
    flame.className = 'flame';
    candle.appendChild(flame);
    
    cake.appendChild(candle);
    candles.push(candle);
}

function detectBlow() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
    let average = sum / bufferLength;

    if (average > 50) { 
        candles.forEach(candle => {
            if (!candle.classList.contains('out')) {
                candle.classList.add('out');
                triggerBlowConfetti();
            }
        });
    }
    requestAnimationFrame(detectBlow);
}

function triggerBlowConfetti() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}


function sendHug() {
    hugs++;
    document.getElementById('hug-count').innerText = `Hugs sent today: ${hugs}`;
    const btn = document.querySelector('.btn-hug');
    btn.innerText = "Hug Sent! ❤️";
    setTimeout(() => { btn.innerText = "Send a Virtual Hug 🫂"; }, 1000);
}

function revealScratch() {
    document.getElementById('scratch-overlay').style.opacity = '0';
    setTimeout(() => { document.getElementById('scratch-overlay').style.display = 'none'; }, 800);
}

function generateReason() {
    const text = document.getElementById('reason-text');
    text.innerText = reasons[Math.floor(Math.random() * reasons.length)];
}

function createBackgroundHearts() {
    const container = document.getElementById('bg-hearts');
    for(let i=0; i<15; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's';
        container.appendChild(heart);
    }
}
createBackgroundHearts();

function createConfetti() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    if (isPlaying) music.pause();
    else music.play();
    isPlaying = !isPlaying;
}

function validatePassword() {
    const pass = document.getElementById('secret-code').value;
    const errorMsg = document.getElementById('error-msg');

    if (pass === '011406') {
        
        showBirthdaySurprise();
    } else {
        errorMsg.style.display = 'block';
    }
}

function showBirthdaySurprise() {
    const overlay = document.getElementById('birthday-overlay');
    overlay.style.display = 'flex';
    
    
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

   
    overlay.onclick = function() {
        overlay.style.display = 'none';
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('lock-screen').style.display = 'flex';
    };
}

const compliments = ["Pretty", "Kind", "Smart", "Mine", "Maldita", "Best", "Sweet", "Yours"];

function showerCompliments() {
    // Launch 15 hearts at once
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeartCompliment();
        }, i * 150); 
    }
}

function createHeartCompliment() {
    const heart = document.createElement('div');
    heart.className = 'floating-compliment';
    
    // Pick a random word
    const word = compliments[Math.floor(Math.random() * compliments.length)];
    heart.innerHTML = `❤️ ${word}`;
    
   
    heart.style.left = Math.random() * 80 + 10 + 'vw';
    
    
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    document.body.appendChild(heart);
    
   
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function detectBlow() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
    let average = sum / bufferLength;

    if (average > 50) { 
        candles.forEach(candle => {
            if (!candle.classList.contains('out')) {
                candle.classList.add('out');
                triggerBlowConfetti();
            }
        });

      
        const allOut = candles.every(c => c.classList.contains('out'));
        if (allOut) {
            
            setTimeout(showBirthdayWish, 1000);
        }
    }
    requestAnimationFrame(detectBlow);
}


function showBirthdayWish() {
    const modal = document.getElementById('secret-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

   
    modalTitle.innerText = "Flowers For You! 💮";
    modalBody.innerHTML = `
        <div class="flower-container">
            <div class="stem"></div>
            <div class="rose-bloom">
                <div class="petal" style="--rot: 0deg;"></div>
                <div class="petal" style="--rot: 72deg;"></div>
                <div class="petal" style="--rot: 144deg;"></div>
                <div class="petal" style="--rot: 216deg;"></div>
                <div class="petal" style="--rot: 288deg;"></div>
            </div>
        </div>
        <h1 style="font-family: 'Dancing Script', cursive; color: #ff4d6d; font-size: 2.2rem; margin: 15px 0;">
            Happy Birthday ulit baby!<br>I Love You So Much! ❤️
        </h1>
        <p>I'm the best gift that you've ever received. 😝</p>
    `;
    
    
    modal.style.display = 'flex';
    
    
    confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffafcc', '#ffffff']
    });
}


function closeSecretModal() {
    document.getElementById('secret-modal').style.display = 'none';
}