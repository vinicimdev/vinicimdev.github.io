// ===========================================================
// CAROUSEL
// Shared between the case study modal and the featured project.
// buildCarouselHTML: returns the markup (track + arrows + dots)
// initCarousel:      wires up interactions on the built markup
// ===========================================================

function renderMediaItem(item, title) {
  if (item.type === "video") {
    return `<video src="${item.src}" autoplay muted loop playsinline></video>`;
  }
  return `<img src="${item.src}" alt="${title} media" />`;
}

export function buildCarouselHTML(media) {
  const isSingle = media.length === 1;
  const dotsHTML = media
    .map(
      (_, i) => `
        <button
          type="button"
          class="cs-carousel-dot${i === 0 ? " is-active" : ""}"
          data-index="${i}"
          aria-label="Go to slide ${i + 1} of ${media.length}"
        ></button>`
    )
    .join("");

  return `
    <div class="cs-carousel" data-single="${isSingle}">
      <div class="cs-carousel-track"></div>
      <button type="button" class="cs-carousel-arrow cs-carousel-prev" aria-label="Previous">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button type="button" class="cs-carousel-arrow cs-carousel-next" aria-label="Next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <div class="cs-carousel-dots">${dotsHTML}</div>
    </div>
  `;
}

export function initCarousel(container, media, title, options) {
  const opts = options || {};
  const autoAdvance = opts.autoAdvance || false;
  const interval = opts.interval || 5000;

  const track = container.querySelector(".cs-carousel-track");
  const dots = container.querySelectorAll(".cs-carousel-dot");
  const prevBtn = container.querySelector(".cs-carousel-prev");
  const nextBtn = container.querySelector(".cs-carousel-next");

  let currentIndex = 0;
  let isTransitioning = false;
  let autoTimer = null;
  const FADE_MS = 200;

  // initial paint (no fade)
  track.innerHTML = renderMediaItem(media[0], title);

  function goTo(index) {
    if (isTransitioning || index === currentIndex) return;
    if (media.length < 2) return;

    isTransitioning = true;
    track.style.opacity = "0";

    setTimeout(() => {
      track.innerHTML = renderMediaItem(media[index], title);
      dots.forEach((d, i) =>
        d.classList.toggle("is-active", i === index)
      );
      currentIndex = index;

      requestAnimationFrame(() => {
        track.style.opacity = "1";
        setTimeout(() => {
          isTransitioning = false;
        }, FADE_MS);
      });
    }, FADE_MS);
  }

  function next() {
    goTo((currentIndex + 1) % media.length);
  }
  function prev() {
    goTo((currentIndex - 1 + media.length) % media.length);
  }

  function startAuto() {
    stopAuto();
    if (autoAdvance && media.length >= 2) {
      autoTimer = setInterval(next, interval);
    }
  }
  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // stopPropagation on the controls so their clicks don't bubble up
  // to any parent [data-case-study] element and open the modal.
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prev();
    if (autoAdvance) startAuto();
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    next();
    if (autoAdvance) startAuto();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      goTo(i);
      if (autoAdvance) startAuto();
    });
  });

  if (autoAdvance) {
    container.addEventListener("mouseenter", stopAuto);
    container.addEventListener("mouseleave", startAuto);
    startAuto();
  }

  return { next, prev };
}