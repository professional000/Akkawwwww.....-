
/* ==========================================
   ROYAL DIGITAL HUB
   PREMIUM BIRTHDAY SURPRISE
========================================== */


/* ==========================================
   1. CONFIGURATION
========================================== */

const CONFIG = {
    name: "NITHYA",

    musicPath: "assets/birthday-song.mp3",

    countdownSeconds: 10
};


/* ==========================================
   2. GET HTML ELEMENTS
========================================== */

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");

const welcome = document.getElementById("welcome");
const birthday = document.getElementById("birthday");

const personName = document.getElementById("personName");

const countdownBox = document.getElementById("countdownBox");
const countdown = document.getElementById("countdown");

const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

const celebrateButton = document.getElementById("celebrate");

const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;


/* ==========================================
   3. PERSONALIZED NAME
========================================== */

if (personName) {
    personName.textContent = CONFIG.name + " ❤️";
}

document.title = "Happy Birthday " + CONFIG.name;


/* ==========================================
   4. MUSIC SETUP
========================================== */

if (music) {
    music.src = CONFIG.musicPath;
    music.loop = true;
    music.volume = 0.7;
}

async function playMusic() {

    if (!music) return;

    try {

        await music.play();

        if (musicButton) {
            musicButton.textContent = "⏸ Pause Music";
        }

    } catch (error) {

        console.error("Music playback failed:", error);

        if (musicButton) {
            musicButton.textContent = "🎵 Play Music";
        }

    }

}

if (musicButton) {

    musicButton.addEventListener("click", async () => {

        if (!music) return;

        if (music.paused) {

            await playMusic();

        } else {

            music.pause();

            musicButton.textContent = "🎵 Play Music";

        }

    });

}

if (music) {

    music.addEventListener("play", () => {

        if (musicButton) {
            musicButton.textContent = "⏸ Pause Music";
        }

    });

    music.addEventListener("pause", () => {

        if (musicButton) {
            musicButton.textContent = "🎵 Play Music";
        }

    });

    music.addEventListener("error", () => {

        console.error(
            "Music file unavailable. Check assets/birthday-song.mp3"
        );

        if (musicButton) {
            musicButton.textContent = "⚠️ Music Unavailable";
        }

    });

}


/* ==========================================
   5. GIFT BOX OPENING
========================================== */

let giftOpened = false;

if (openGift) {
    openGift.addEventListener("click", openSurprise);
}

if (gift) {
    gift.addEventListener("click", openSurprise);
}

function openSurprise() {

    if (giftOpened) return;

    giftOpened = true;

    // Open gift animation
    if (gift) {
        gift.classList.add("open");
    }

    // Disable button
    if (openGift) {

        openGift.disabled = true;

        openGift.textContent = "💙 OPENING YOUR SURPRISE...";

    }

    // Start music
    playMusic();

    // Reveal birthday screen
    setTimeout(() => {

        if (welcome) {
            welcome.style.display = "none";
        }

        if (birthday) {
            birthday.classList.add("show");
        }

        // Start countdown only after gift opens
        startCountdown();

    }, 1000);

}


/* ==========================================
   6. COUNTDOWN
========================================== */

let countdownInterval = null;

function startCountdown() {

    if (!countdownBox || !countdown) return;

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownBox.classList.add("active");

    let seconds = CONFIG.countdownSeconds;

    countdown.innerHTML = `
        <strong id="timer">${seconds}</strong>
    `;

    const timer = document.getElementById("timer");

    countdownInterval = setInterval(() => {

        seconds--;

        if (timer) {
            timer.textContent = Math.max(seconds, 0);
        }

        if (seconds <= 0) {

            clearInterval(countdownInterval);

            countdownInterval = null;

            // Final birthday message
            countdownBox.innerHTML = `

                <h2>🎂 HAPPY BIRTHDAY! 🎉</h2>

                <p>
                    Dear ${CONFIG.name},
                    may your life be filled with
                    endless happiness, love and success.
                </p>

                <h3>💙 Enjoy Your Special Day 💙</h3>

            `;

            // Fireworks celebration
            launchFireworks();

        }

    }, 1000);

}


/* ==========================================
   7. FIREWORKS CANVAS SETUP
========================================== */

let particles = [];

let animationRunning = false;

function resizeCanvas() {

    if (!canvas || !ctx) return;

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ==========================================
   8. CREATE FIREWORK PARTICLES
========================================== */

function createFirework(x, y) {

    const colors = [
        "#ffffff",
        "#c0c0c0",
        "#a8d5ff",
        "#dceaff",
        "#83baff",
        "#f5f5ff"
    ];

    for (let i = 0; i < 65; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 5 + 1;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 90,
            maxLife: 90,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ]

        });

    }

}


/* ==========================================
   9. FIREWORK ANIMATION
========================================== */

function animateFireworks() {

    if (!canvas || !ctx) return;

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.035;
        p.vx *= 0.99;

        p.life--;

        ctx.globalAlpha = Math.max(
            0,
            p.life / p.maxLife
        );

        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }

    }

    ctx.globalAlpha = 1;

    if (particles.length > 0) {

        requestAnimationFrame(animateFireworks);

    } else {

        animationRunning = false;

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

    }

}


/* ==========================================
   10. LAUNCH FIREWORKS
========================================== */

function launchFireworks() {

    if (!canvas || !ctx) return;

    for (let i = 0; i < 6; i++) {

        setTimeout(() => {

            createFirework(

                Math.random() * window.innerWidth,

                Math.random() * window.innerHeight * 0.65

            );

            if (!animationRunning) {

                animationRunning = true;

                animateFireworks();

            }

        }, i * 450);

    }

}


/* ==========================================
   11. CELEBRATE BUTTON
========================================== */

if (celebrateButton) {

    celebrateButton.addEventListener("click", () => {

        launchFireworks();

        if (music && music.paused) {
            playMusic();
        }

    });

}


/* ==========================================
   12. SUCCESS MESSAGE
========================================== */

console.log(
    "💙 ROYAL DIGITAL HUB Birthday Website Loaded!"
);

console.log(
    "🎁 Birthday Person: " + CONFIG.name
);


/* ==========================================
   VISITOR FEEDBACK SYSTEM
========================================== */

const feedbackForm = document.getElementById("feedbackForm");

const feedbackStatus = document.getElementById("feedbackStatus");

const feedbackSubmit = document.getElementById("feedbackSubmit");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const feedback = document
            .getElementById("visitorFeedback")
            .value.trim();

        if (feedback.length < 2) {
            feedbackStatus.textContent =
                "Please enter your feedback.";
            return;
        }

        feedbackSubmit.disabled = true;
        feedbackSubmit.textContent = "Sending...";

        try {

            const response = await fetch(
                "https://formspree.io/f/xzepljrz",
                {
                    method: "POST",
                    body: new FormData(feedbackForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                feedbackStatus.textContent =
                    "💙 Thank you! Your feedback was submitted successfully.";

                feedbackForm.reset();

            } else {

                feedbackStatus.textContent =
                    "Unable to send feedback. Please try again.";

            }

        } catch (error) {

            feedbackStatus.textContent =
                "Network error. Please check your internet.";

        } finally {

            feedbackSubmit.disabled = false;
            feedbackSubmit.textContent = "📩 Submit Feedback";

        }

    });

}
