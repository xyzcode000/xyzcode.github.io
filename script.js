const video = document.getElementById("heroVideo");

let velocity = 0;
let playing = false;
let lastScrollTime = 0;

// Wait until video is ready
video.addEventListener("loadedmetadata", () => {
    video.currentTime = 0;
    video.pause();
});
video.addEventListener("ended", () => {

    video.pause();

    playing = false;

    velocity = 0;

});

// -------------------------
// MAIN LOOP
// -------------------------

function animate() {

    const now = performance.now();

    // If user stopped scrolling, slowly lose momentum
    if (now - lastScrollTime > 80) {
        velocity *= 0.965;
    }

    // Clamp velocity
    velocity = Math.max(0, Math.min(velocity, 2.5));

    if (velocity > 0.02) {

        if (!playing) {
            video.play();
            playing = true;
        }

        // Playback speed
        video.playbackRate = 0.6 + velocity;

    } else {

        velocity = 0;

        if (playing) {
            video.pause();
            playing = false;
        }

    }

    requestAnimationFrame(animate);

}

animate();



let lastScrollY = window.scrollY;

window.addEventListener(
    "scroll",
    () => {

        const now = performance.now();
        const currentY = window.scrollY;
        const delta = Math.abs(currentY - lastScrollY);

        lastScrollY = currentY;
        lastScrollTime = now;

        // Add momentum based on scroll amount
        velocity += delta * 0.0035;

        // Prevent huge jumps
        velocity = Math.min(velocity, 2.5);

    },
    { passive: true }
);