// ===========================================================
// HERO VIDEO CYCLING
// When one video ends, the next in the list plays.
// Loops back to the first after the last.
// ===========================================================
const videos = [
  "assets/papercut-1.mp4",
  "assets/papercut-2.mp4",
  "assets/papercut-3.mp4",
];
const video = document.getElementById("hero-video");

if (video) {
  let idx = 0;

  function playNext() {
    video.src = videos[idx];
    video.play().catch(() => {
      // autoplay can fail on some browsers - fallback: poster stays visible
    });
    idx = (idx + 1) % videos.length;
  }

  video.addEventListener("ended", playNext);
  playNext();
}