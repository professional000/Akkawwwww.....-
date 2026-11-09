/* =================================
   BIRTHDAY WEBSITE CONFIGURATION
================================= */

const CONFIG = {
  name: "NITHYA",

  // Set birthday date: YYYY-MM-DD
  birthday: "2026-11-09",

  // 24-hour format
  birthdayTime: "12:00:00pm"
};


/* =================================
   PERSONALIZED NAME
================================= */

document.getElementById("personName").textContent =
  CONFIG.name + " ❤️";

document.title = "Happy Birthday " + CONFIG.name;


/* =================================
   GIFT BOX OPENING
================================= */

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");

const welcome = document.getElementById("welcome");
const birthday = document.getElementById("birthday");

openGift.addEventListener("click", openSurprise);
gift.addEventListener("click", openSurprise);

let opened = false;

function openSurprise() {

  if (opened) return;
  opened = true;

  gift.classList.add("open");

  setTimeout(() => {

    welcome.style.display = "none";
    birthday.classList.add("show");

    launchFireworks();

    playMusic();

  }, 1000);

}


/* =================================
   BACKGROUND MUSIC
================================= */

const music =
  document.getElementById("birthdayMusic");

const musicButton =
  document.getElementById("musicButton");

async function playMusic() {

  try {
    await music.play();
    musicButton.textContent = "⏸ Pause Music";
  } catch (error) {
    musicButton.textContent = "🎵 Play Music";
  }

}

musicButton.addEventListener("click", () => {

  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    musicButton.textContent = "🎵 Play Music";
  }

});


/* =================================
   BIRTHDAY COUNTDOWN
================================= */

const countdown =
  document.getElementById("countdown");

function getNextBirthday() {

  const [year, month, day] =
    CONFIG.birthday.split("-").map(Number);

  const [hour, minute, second] =
    CONFIG.birthdayTime.split(":").map(Number);

  const now = new Date();

  let target = new Date(
    now.getFullYear(),
    month - 1,
    day,
    hour,
    minute,
    second
  );

  if (target <= now) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return target;
}

let targetDate = getNextBirthday();

function updateCountdown() {

  const now = new Date();

  let difference = targetDate - now;

  if (difference <= 0) {
    countdown.innerHTML =
      "<h2>🎂 Happy Birthday! 🎉</h2>";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  countdown.innerHTML = `
    <div class="time-unit">
      <strong>${days}</strong>
      Days
    </div>

    <div class="time-unit">
      <strong>${hours}</strong>
      Hours
    </div>

    <div class="time-unit">
      <strong>${minutes}</strong>
      Minutes
    </div>

    <div class="time-unit">
      <strong>${seconds}</strong>
      Seconds
    </div>
  `;

}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =================================
   FIREWORKS ANIMATION
================================= */

const canvas =
  document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {

  const dpr = Math.min(
    window.devicePixelRatio || 1, 2
  );

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFirework(x, y) {

  const colors = [
    "#ffffff",
    "#a8d5ff",
    "#d6e5ff",
    "#83baff",
    "#c0c0c0"
  ];

  for (let i = 0; i < 65; i++) {

    const angle =
      Math.random() * Math.PI * 2;

    const speed =
      Math.random() * 5 + 1;

    particles.push({

      x,
      y,

      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,

      life: 90,
      maxLife: 90,

      color:
        colors[Math.floor(Math.random() * colors.length)]

    });

  }

}

function animateFireworks() {

  ctx.clearRect(
    0, 0, window.innerWidth, window.innerHeight
  );

  particles.forEach((p, index) => {

    p.x += p.vx;
    p.y += p.vy;

    p.vy += 0.035;
    p.vx *= 0.99;

    p.life--;

    ctx.globalAlpha =
      Math.max(0, p.life / p.maxLife);

    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(index, 1);
    }

  });

  ctx.globalAlpha = 1;

  if (particles.length > 0) {
    requestAnimationFrame(animateFireworks);
  } else {
    animationRunning = false;
    ctx.clearRect(
      0, 0, window.innerWidth, window.innerHeight
    );
  }

}

function launchFireworks() {

  for (let i = 0; i < 5; i++) {

    setTimeout(() => {

      createFirework(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.65
      );

      if (!animationRunning) {
        animationRunning = true;
        animateFireworks();
      }

    }, i * 400);

  }

}


/* =================================
   CELEBRATE BUTTON
================================= */

document.getElementById("celebrate")
  .addEventListener("click", () => {

    launchFireworks();

    if (music.paused) {
      playMusic();
    }

  });
