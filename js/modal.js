// ===========================================================
// CASE STUDY MODAL
// Renders a case study into the shared modal shell on demand,
// wires open/close/tabs/keyboard, and boots the featured
// project's carousel on the home page.
// ===========================================================
import { caseStudies } from "./case-studies.js";
import { buildCarouselHTML, initCarousel } from "./carousel.js";

const modal = document.getElementById("case-study-modal");
const modalBody = document.getElementById("modal-body");
if (modal && modalBody) {
  // Holds the currently-open carousel's controls so keyboard
  // navigation can call them.
  let activeCarousel = null;

  function renderCaseStudy(data) {
    const metaHTML = data.meta
      .map((m, i) =>
        i < data.meta.length - 1
          ? `<span>${m}</span><span>/</span>`
          : `<span>${m}</span>`
      )
      .join("");

    const tagsHTML = data.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");

    // split on blank lines so multi-paragraph text renders with real
    // spacing between paragraphs
    const paragraphs = (text) =>
      text
        .split(/\n\s*\n/)
        .map((p) => `<p>${p.trim()}</p>`)
        .join("");

    // Build the list of tabs based on what data the project actually has.
    // A project without a caseStudy or team just gets a Description tab
    // and we skip rendering the tab bar entirely.
    const tabs = [];

    if (data.description) {
      tabs.push({
        id: "description",
        label: "Description",
        html: `<div class="cs-description">${paragraphs(
          data.description
        )}</div>`,
      });
    }

    if (data.caseStudy) {
      tabs.push({
        id: "caseStudy",
        label: "Case Study",
        html: `
          <div class="cs-section">
            <h3 class="cs-heading"><span class="cs-heading-num">01</span> Problem</h3>
            ${paragraphs(data.caseStudy.problem)}
          </div>

          <div class="cs-section">
            <h3 class="cs-heading"><span class="cs-heading-num">02</span> Decision</h3>
            ${paragraphs(data.caseStudy.decision)}
          </div>

          <div class="cs-section">
            <h3 class="cs-heading"><span class="cs-heading-num">03</span> Result</h3>
            ${paragraphs(data.caseStudy.result)}
          </div>
        `,
      });
    }

    if (data.team && data.team.length) {
      const membersHTML = data.team
        .map(
          (person) => `
            <div class="cs-team-member">
              <p class="cs-team-name">${person.name}</p>
              <p class="cs-team-role">${person.role}</p>
            </div>
          `
        )
        .join("");
      tabs.push({
        id: "team",
        label: "Team",
        html: `<div class="cs-team">${membersHTML}</div>`,
      });
    }

    // Only show the tab bar if there are 2+ tabs. With just Description,
    // we render its content directly with no empty tab UI.
    const tabsBarHTML =
      tabs.length >= 2
        ? `<div class="cs-tabs" role="tablist">
            ${tabs
              .map(
                (tab, i) => `
                  <button
                    type="button"
                    class="cs-tab${i === 0 ? " is-active" : ""}"
                    data-tab-id="${tab.id}"
                    role="tab"
                    aria-selected="${i === 0 ? "true" : "false"}"
                  >${tab.label}</button>
                `
              )
              .join("")}
          </div>`
        : "";

    const panelsHTML = tabs
      .map(
        (tab, i) => `
          <div
            class="cs-panel${i === 0 ? " is-active" : ""}"
            data-panel-id="${tab.id}"
            role="tabpanel"
          >${tab.html}</div>
        `
      )
      .join("");

    modalBody.innerHTML = `
      <div class="cs-media">
        ${buildCarouselHTML(data.media)}
      </div>
      <div class="cs-content">
        <div class="cs-meta">${metaHTML}</div>
        <h2 id="modal-title" class="cs-title">${data.title}</h2>

        ${tabsBarHTML}
        ${panelsHTML}

        <div class="tag-list cs-tags">${tagsHTML}</div>

        <div class="cs-actions">
          <a
            href="${data.playUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            ${data.playLabel}
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    `;

    const carouselEl = modalBody.querySelector(".cs-carousel");
    if (carouselEl) {
      activeCarousel = initCarousel(carouselEl, data.media, data.title);
    }

    // Wire up tab switching (only exists when 2+ tabs)
    const tabButtons = modalBody.querySelectorAll(".cs-tab");
    const tabPanels = modalBody.querySelectorAll(".cs-panel");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.tabId;
        tabButtons.forEach((b) => {
          const active = b.dataset.tabId === id;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        tabPanels.forEach((p) => {
          p.classList.toggle(
            "is-active",
            p.dataset.panelId === id
          );
        });
      });
    });
  }

  function openModal(id) {
    const data = caseStudies[id];
    if (!data) return;
    renderCaseStudy(data);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeCarousel = null;
  }

  // trigger from any element with data-case-study="id"
  // uses event delegation so [data-case-study] elements added
  // dynamically (like the one inside the featured carousel) still work
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-case-study]");
    if (trigger) {
      e.preventDefault();
      openModal(trigger.dataset.caseStudy);
    }
  });

  // close on X, backdrop, or any [data-close]
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  // keyboard: Esc closes, left/right navigate carousel
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" && activeCarousel) activeCarousel.next();
    if (e.key === "ArrowLeft" && activeCarousel) activeCarousel.prev();
  });

  // ==============================================================
  // FEATURED CAROUSEL
  // Same carousel logic, injected into the featured-media area.
  // Auto-advances, pauses on hover. Clicking the media opens the
  // case study modal; the arrows and dots use stopPropagation
  // so they don't trigger the modal open.
  // ==============================================================
  const featured = document.querySelector("[data-featured-carousel]");
  if (featured) {
    const csId = featured.dataset.featuredCarousel;
    const csData = caseStudies[csId];
    if (csData) {
      // We can reuse buildCarouselHTML, but we want the .cs-carousel-track
      // to have data-case-study so clicking media opens the modal.
      // Easiest: inject the built HTML, then annotate the track.
      featured.innerHTML = buildCarouselHTML(csData.media);
      const trackEl = featured.querySelector(".cs-carousel-track");
      if (trackEl) {
        trackEl.setAttribute("data-case-study", csId);
        trackEl.setAttribute("role", "button");
        trackEl.setAttribute("tabindex", "0");
        trackEl.setAttribute(
          "aria-label",
          "View " + csData.title + " case study"
        );
      }
      const carouselEl = featured.querySelector(".cs-carousel");
      initCarousel(carouselEl, csData.media, csData.title, {
        autoAdvance: true,
        interval: 5000,
      });
    }
  }
}