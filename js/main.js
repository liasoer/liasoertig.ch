/* ==========================================================================
   Shared behaviour: theme toggle, mobile nav, grid rendering,
   masonry gallery + lightbox, custom video player, tile hover animation
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Dark mode ---------- */
  const THEME_KEY = "lo-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function setStoredTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  // Dark is the default look regardless of the OS/browser preference —
  // it only ever changes because the visitor clicked the toggle, and that
  // choice is then remembered for next time.
  let theme = getStoredTheme() || "dark";
  applyTheme(theme);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme(theme);
      setStoredTheme(theme);
    });
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mainNav.classList.remove("is-open"))
    );
  }

  /* ---------- Edge glass (frosted vignette while scrolling) ---------- */
  if (!document.querySelector(".edge-glass-bottom")) {
    const bottom = document.createElement("div");
    bottom.className = "edge-glass edge-glass-bottom";
    document.body.appendChild(bottom);
  }

  const ICON_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`;
  const ICON_PREV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
  const ICON_NEXT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  const ICON_ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
  const ICON_PLAY_SOLID = `<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20"/></svg>`;
  const ICON_PLAY = `<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20"/></svg>`;
  const ICON_PAUSE = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="4" width="5" height="16"/><rect x="14" y="4" width="5" height="16"/></svg>`;
  const ICON_MUTE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="4 9 9 9 13 5 13 19 9 15 4 15" fill="currentColor" stroke="none"/><line x1="17" y1="9" x2="22" y2="14"/><line x1="22" y1="9" x2="17" y2="14"/></svg>`;
  const ICON_SOUND = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="4 9 9 9 13 5 13 19 9 15 4 15" fill="currentColor" stroke="none"/><path d="M17 8a5 5 0 0 1 0 8"/><path d="M19.5 5.5a9 9 0 0 1 0 13"/></svg>`;
  const ICON_EXPAND = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;

  /**
   * Renders a minimal card grid (cover + tiny category tag + title only)
   * for a list of items (projects or photography shoots).
   */
  function renderGrid(container, items, opts) {
    opts = opts || {};
    container.innerHTML = items
      .map((item, i) => {
        const tag = opts.showCategory && item.category ? item.category : (opts.tagLabel || "Portrait");
        const hasVideo = item.videos && item.videos.length > 0;
        const sub = [tag, item.year].filter(Boolean).join(" · ");
        return `
        <article class="card" data-index="${i}" tabindex="0" role="button" aria-label="View ${item.title}">
          <div class="card-media">
            <span class="tag">${tag}</span>
            ${hasVideo ? `<span class="play-badge">${ICON_PLAY_SOLID}</span>` : ""}
            <img src="${item.cover}" alt="${item.title}" loading="lazy">
          </div>
          <div class="card-body">
            <div class="card-heading">
              <h3>${item.title}</h3>
              <p class="card-sub">${sub}</p>
            </div>
            <span class="arrow">${ICON_ARROW}</span>
          </div>
        </article>`;
      })
      .join("");

    container.querySelectorAll(".card").forEach((card) => {
      const idx = Number(card.dataset.index);
      const open = () => openGallery(items[idx]);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  /* ---------- Lightbox (fullscreen single photo, layered above the modal) ---------- */
  let lightboxEl, lbImages = [], lbIndex = 0;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.createElement("div");
    lightboxEl.className = "lightbox";
    lightboxEl.innerHTML = `
      <div class="lightbox-stage">
        <img alt="">
        <button class="lightbox-nav prev" aria-label="Previous photo">${ICON_PREV}</button>
        <button class="lightbox-nav next" aria-label="Next photo">${ICON_NEXT}</button>
        <span class="lightbox-count"></span>
        <button class="lightbox-close" aria-label="Close">${ICON_CLOSE}</button>
      </div>`;
    document.body.appendChild(lightboxEl);
    lightboxEl.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });
    lightboxEl.querySelector(".prev").addEventListener("click", () => lbStep(-1));
    lightboxEl.querySelector(".next").addEventListener("click", () => lbStep(1));
    return lightboxEl;
  }

  function lbRender() {
    const img = lightboxEl.querySelector("img");
    img.src = lbImages[lbIndex];
    lightboxEl.querySelector(".lightbox-count").textContent = (lbIndex + 1) + " / " + lbImages.length;
  }
  function lbStep(dir) {
    const n = lbImages.length;
    lbIndex = (lbIndex + dir + n) % n;
    lbRender();
  }
  function openLightbox(images, index) {
    const el = ensureLightbox();
    lbImages = images;
    lbIndex = index;
    lbRender();
    el.classList.add("is-open");
  }
  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("is-open");
  }

  /* ---------- Modal / popup gallery ---------- */
  let overlayEl, currentItem;
  let activePlayer = null; // custom video player controller for the open modal

  function ensureOverlay() {
    if (overlayEl) return overlayEl;
    overlayEl = document.createElement("div");
    overlayEl.className = "modal-overlay";
    overlayEl.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div>
            <h2 class="m-title"></h2>
            <p class="modal-sub m-sub"></p>
          </div>
          <button class="modal-close" aria-label="Close">${ICON_CLOSE}</button>
        </div>
        <div class="modal-body">
          <div class="modal-tabs m-tabs" hidden>
            <button data-pane="photos" class="is-active tab-photos">Photos</button>
            <button data-pane="videos" class="tab-videos">Videos</button>
          </div>

          <div class="modal-pane is-active" data-pane="photos">
            <div class="masonry m-masonry"></div>
          </div>

          <div class="modal-pane" data-pane="videos">
            <div class="video-list m-video-list"></div>
            <div class="video-player m-video-player">
              <video playsinline></video>
              <div class="vp-center">
                <button class="vp-play-big" aria-label="Play">${ICON_PLAY}</button>
              </div>
              <div class="vp-controls">
                <button class="vp-btn vp-play" aria-label="Play/Pause">${ICON_PLAY}</button>
                <span class="vp-time"><span class="vp-current">0:00</span> / <span class="vp-duration">0:00</span></span>
                <input class="vp-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek">
                <button class="vp-btn vp-mute" aria-label="Mute">${ICON_SOUND}</button>
                <button class="vp-btn vp-fullscreen" aria-label="Fullscreen">${ICON_EXPAND}</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlayEl);

    overlayEl.addEventListener("click", (e) => {
      if (e.target === overlayEl) closeGallery();
    });
    overlayEl.querySelector(".modal-close").addEventListener("click", closeGallery);

    overlayEl.querySelectorAll(".m-tabs button").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        overlayEl.querySelectorAll(".m-tabs button").forEach((b) => b.classList.remove("is-active"));
        tabBtn.classList.add("is-active");
        const pane = tabBtn.dataset.pane;
        overlayEl.querySelectorAll(".modal-pane").forEach((p) =>
          p.classList.toggle("is-active", p.dataset.pane === pane)
        );
        if (pane === "photos" && activePlayer) activePlayer.pause();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (lightboxEl && lightboxEl.classList.contains("is-open")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") lbStep(-1);
        if (e.key === "ArrowRight") lbStep(1);
        return;
      }
      if (!overlayEl.classList.contains("is-open")) return;
      if (e.key === "Escape") closeGallery();
    });

    return overlayEl;
  }

  function renderMasonry(item) {
    const el = overlayEl.querySelector(".m-masonry");
    el.innerHTML = item.images
      .map(
        (src, i) =>
          `<button data-i="${i}" aria-label="Open photo ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`
      )
      .join("");
    el.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => openLightbox(item.images, Number(b.dataset.i)))
    );
  }

  /* ---------- Custom video player ---------- */
  function fmtTime(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function createVideoPlayerController(playerEl) {
    const video = playerEl.querySelector("video");
    const playBig = playerEl.querySelector(".vp-play-big");
    const playBtn = playerEl.querySelector(".vp-play");
    const muteBtn = playerEl.querySelector(".vp-mute");
    const fsBtn = playerEl.querySelector(".vp-fullscreen");
    const seek = playerEl.querySelector(".vp-seek");
    const curEl = playerEl.querySelector(".vp-current");
    const durEl = playerEl.querySelector(".vp-duration");
    let seeking = false;

    function setPlayIcon(isPlaying) {
      playBtn.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
      playBig.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
      playerEl.classList.toggle("is-playing", isPlaying);
      playerEl.classList.toggle("is-paused", !isPlaying);
    }

    function load(src, poster) {
      video.pause();
      video.src = src;
      if (poster) video.poster = poster;
      video.load();
      seek.value = 0;
      curEl.textContent = "0:00";
      durEl.textContent = "0:00";
      setPlayIcon(false);
    }

    function togglePlay() {
      if (video.paused) video.play();
      else video.pause();
    }

    playBig.addEventListener("click", togglePlay);
    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", () => setPlayIcon(true));
    video.addEventListener("pause", () => setPlayIcon(false));
    video.addEventListener("ended", () => setPlayIcon(false));

    video.addEventListener("loadedmetadata", () => {
      durEl.textContent = fmtTime(video.duration);
    });
    video.addEventListener("timeupdate", () => {
      if (seeking) return;
      curEl.textContent = fmtTime(video.currentTime);
      if (video.duration) seek.value = (video.currentTime / video.duration) * 100;
    });
    seek.addEventListener("input", () => {
      seeking = true;
      if (video.duration) curEl.textContent = fmtTime((seek.value / 100) * video.duration);
    });
    seek.addEventListener("change", () => {
      if (video.duration) video.currentTime = (seek.value / 100) * video.duration;
      seeking = false;
    });

    let muted = false;
    muteBtn.addEventListener("click", () => {
      muted = !muted;
      video.muted = muted;
      muteBtn.innerHTML = muted ? ICON_MUTE : ICON_SOUND;
    });

    fsBtn.addEventListener("click", () => {
      if (playerEl.requestFullscreen) playerEl.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });

    return {
      load,
      pause() { video.pause(); },
    };
  }

  function renderVideoTabs(item) {
    const el = overlayEl;
    const listEl = el.querySelector(".m-video-list");
    const videos = item.videos || [];
    if (videos.length <= 1) {
      listEl.innerHTML = "";
      listEl.hidden = true;
    } else {
      listEl.hidden = false;
      // A horizontal strip of poster thumbnails sitting next to each
      // other — only the friendly title is ever shown, never the file path.
      listEl.innerHTML = videos
        .map(
          (v, i) => `
        <button data-i="${i}" class="vlist-item ${i === 0 ? "is-active" : ""}" aria-label="Play ${v.title}">
          <span class="vlist-thumb">
            <img src="${v.poster || item.cover}" alt="" loading="lazy">
            <span class="vlist-play">${ICON_PLAY_SOLID}</span>
          </span>
          <span class="vlist-label">${v.title}</span>
        </button>`
        )
        .join("");
      listEl.querySelectorAll("button").forEach((b) =>
        b.addEventListener("click", () => {
          listEl.querySelectorAll("button").forEach((x) => x.classList.remove("is-active"));
          b.classList.add("is-active");
          const v = videos[Number(b.dataset.i)];
          activePlayer.load(v.src, v.poster);
        })
      );
    }
    if (!activePlayer) activePlayer = createVideoPlayerController(el.querySelector(".m-video-player"));
    if (videos.length) activePlayer.load(videos[0].src, videos[0].poster || item.cover);
  }

  function openGallery(item) {
    const el = ensureOverlay();
    currentItem = item;

    const hasPhotos = item.images && item.images.length > 0;
    const hasVideo = item.videos && item.videos.length > 0;
    const tag = item.category || "Portrait";

    el.querySelector(".m-title").textContent = item.title;
    const subParts = [tag, item.year, item.instagram ? "@" + item.instagram : null].filter(Boolean);
    el.querySelector(".m-sub").textContent = subParts.join(" · ");

    if (hasPhotos) renderMasonry(item);
    else el.querySelector(".m-masonry").innerHTML = "";

    const tabsEl = el.querySelector(".m-tabs");
    tabsEl.hidden = !(hasPhotos && hasVideo);
    tabsEl.querySelector(".tab-photos").hidden = !hasPhotos;
    tabsEl.querySelector(".tab-videos").hidden = !hasVideo;

    const defaultPane = hasPhotos ? "photos" : "videos";
    tabsEl.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b.dataset.pane === defaultPane));
    el.querySelectorAll(".modal-pane").forEach((p) => p.classList.toggle("is-active", p.dataset.pane === defaultPane));

    if (hasVideo) renderVideoTabs(item);
    else if (activePlayer) activePlayer.pause();

    el.classList.add("is-open");
    document.body.classList.add("modal-locked");
  }

  function closeGallery() {
    if (!overlayEl) return;
    overlayEl.classList.remove("is-open");
    document.body.classList.remove("modal-locked");
    if (activePlayer) activePlayer.pause();
    closeLightbox();
  }

  /* ---------------------------------------------------------------------- */
  /* Cascading project stack — cards sit centered on top of each other;      */
  /* scrolling sweeps a continuous "active index" through them, so the       */
  /* focused card is large/sharp up front while the next few sit smaller     */
  /* and stacked behind, and the one just passed slides down and fades.      */
  /* Renders as a plain vertical list by default; only switches into the     */
  /* absolute-positioned stacked layout once the scroll math is wired up,    */
  /* so a slow/blocked script just leaves a normal, fully usable list.       */
  /* ---------------------------------------------------------------------- */
  function renderProjectStack(container, items) {
    container.innerHTML = items
      .map((item, i) => {
        const hasVideo = item.videos && item.videos.length > 0;
        return `
        <article class="stack-card" data-index="${i}" tabindex="0" role="button" aria-label="View ${item.title}">
          <div class="stack-card-head">
            <span class="stack-card-date">${item.year || ""}</span>
            <span class="stack-card-title">${item.title}</span>
            <span class="stack-card-tag">${item.category || ""}</span>
          </div>
          <div class="stack-card-media">
            ${hasVideo ? `<span class="play-badge">${ICON_PLAY_SOLID}</span>` : ""}
            <img src="${item.cover}" alt="${item.title}" loading="lazy">
          </div>
        </article>`;
      })
      .join("");

    const cards = Array.from(container.querySelectorAll(".stack-card"));
    const open = (card) => {
      if (container.classList.contains("js-active") && !card.classList.contains("is-active")) return;
      openGallery(items[Number(card.dataset.index)]);
    };
    cards.forEach((card) => {
      card.addEventListener("click", () => open(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(card);
        }
      });
    });

    const pin = document.getElementById("project-stack-pin");
    const stage = pin ? pin.querySelector(".project-stack-stage") : null;
    if (!pin || !stage || !cards.length) return;

    container.classList.add("js-active");

    const STEP_VH = 90; // scroll distance dedicated to each card, in vh
    function layoutHeight() {
      pin.style.height = (items.length * STEP_VH) + "vh";
    }
    layoutHeight();

    let ticking = false;
    let snapTimer = null;

    // Once scrolling settles, snap to whichever card is closest to focused —
    // you can never rest half-stacked between two cards.
    function scheduleSnap() {
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const stepPx = window.innerHeight * (STEP_VH / 100);
        if (stepPx <= 0) return;
        const scrolled = -pin.getBoundingClientRect().top;
        const active = Math.min(Math.max(scrolled / stepPx, 0), items.length - 1);
        const target = Math.min(Math.max(Math.round(active), 0), items.length - 1);
        if (Math.abs(active - target) > 0.02) {
          window.scrollTo({ top: window.scrollY + (target - active) * stepPx, behavior: "smooth" });
        }
      }, 140);
    }

    function update() {
      const stepPx = window.innerHeight * (STEP_VH / 100);
      const scrolled = -pin.getBoundingClientRect().top;
      const active = stepPx > 0
        ? Math.min(Math.max(scrolled / stepPx, 0), items.length - 1)
        : 0;

      let frontIdx = 0, frontDist = Infinity;
      cards.forEach((card, i) => {
        const d = i - active;
        let ty, scale, op, z;
        if (d < 0) {
          const p = Math.min(-d, 1);
          ty = p * 160;
          scale = 1 + p * 0.04;
          op = 1 - p;
          z = 200;
        } else {
          ty = -d * 50;
          scale = Math.max(0.72, 1 - d * 0.055);
          op = Math.max(0, 1 - d * 0.19);
          z = Math.round(100 - d);
        }
        card.style.transform = `translate(-50%, calc(-50% + ${ty}px)) scale(${scale})`;
        card.style.opacity = String(op);
        card.style.zIndex = String(z);
        card.style.pointerEvents = "none";
        card.classList.remove("is-active");

        const dist = Math.abs(d);
        if (dist < frontDist) { frontDist = dist; frontIdx = i; }
      });
      cards[frontIdx].style.pointerEvents = "auto";
      cards[frontIdx].classList.add("is-active");

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
      scheduleSnap();
    }, { passive: true });
    window.addEventListener("resize", () => { layoutHeight(); update(); });
    update();
  }

  window.PortfolioSite = { renderGrid, renderProjectStack, openGallery };

  /* ---------------------------------------------------------------------- */
  /* Intro loader — plays once per browser session on the homepage         */
  /* ---------------------------------------------------------------------- */
  (function initLoader() {
    const loader = document.querySelector(".site-loader");
    if (!loader) return;

    const LOADER_KEY = "lo-intro-played";
    let alreadyPlayed = false;
    try { alreadyPlayed = sessionStorage.getItem(LOADER_KEY) === "1"; } catch (e) {}

    if (alreadyPlayed) {
      loader.remove();
      document.dispatchEvent(new Event("lo:intro-done"));
      return;
    }

    document.body.classList.add("modal-locked");

    const eyebrow = loader.querySelector(".loader-eyebrow");
    const lwLeft = loader.querySelector(".lw-left");
    const lwRight = loader.querySelector(".lw-right");
    const flashCard = loader.querySelector(".loader-flash");
    const flashImg = flashCard ? flashCard.querySelector("img") : null;
    const bottom = loader.querySelector(".loader-bottom");

    // A run of photography-series photos flash, one after another, in the
    // single card that sits in the gap between LIAS and OERTIG.
    const covers = typeof PHOTOGRAPHY !== "undefined" ? PHOTOGRAPHY.slice(0, 10).map((p) => p.cover) : [];
    const FLASH_STEP = 130; // ms between each photo cut

    const t = (fn, ms) => setTimeout(fn, ms);
    t(() => eyebrow && eyebrow.classList.add("show"), 120);
    // LIAS and OERTIG fade in already apart, with the empty card gap between them.
    t(() => {
      lwLeft && lwLeft.classList.add("show");
      lwRight && lwRight.classList.add("show");
      if (flashCard) {
        flashCard.classList.add("show");
        if (flashImg && covers[0]) flashImg.src = covers[0];
      }
    }, 450);
    // Rapid-fire cut through the photos, like flipping through a stack.
    covers.forEach((src, i) => {
      t(() => { if (flashImg) flashImg.src = src; }, 700 + i * FLASH_STEP);
    });
    const flashEnd = 700 + covers.length * FLASH_STEP;
    // Card shrinks away — LIAS + OERTIG close the gap themselves as it collapses.
    t(() => flashCard && flashCard.classList.remove("show"), flashEnd + 120);
    t(() => bottom && bottom.classList.add("show"), flashEnd + 550);
    // Clean crossfade from the loader's wordmark to the fixed, unfilled one.
    t(() => {
      loader.classList.add("is-hiding");
      document.body.classList.remove("modal-locked");
      try { sessionStorage.setItem(LOADER_KEY, "1"); } catch (e) {}
      document.dispatchEvent(new Event("lo:intro-done"));
      t(() => loader.remove(), 750);
    }, flashEnd + 1150);
  })();

  /* ---------------------------------------------------------------------- */
  /* Hero slideshow — Projects and Photography sit stacked full-bleed; as   */
  /* the pinned hero is scrolled through, Projects fades/blurs/slides out   */
  /* while Photography fades/blurs/slides in. CSS already shows Projects    */
  /* fully opaque and Photography hidden by default, so if JS is blocked    */
  /* or throws the hero just displays a plain static Projects slide — it    */
  /* never gets stuck half-transitioned or invisible.                       */
  /* ---------------------------------------------------------------------- */
  (function initHeroSlides() {
    const pin = document.querySelector(".hero-pin");
    const stage = document.querySelector(".hero-stage");
    const from = document.querySelector(".hero-slide--projects");
    const to = document.querySelector(".hero-slide--photography");
    if (!pin || !stage || !from || !to) return;

    // Some browsers ignore/deprioritize the autoplay attribute — nudge any
    // hero-slide video explicitly, silently ignoring rejection.
    document.querySelectorAll(".hero-slide video").forEach((v) => {
      v.play().catch(() => {});
    });

    let ticking = false;
    let snapTimer = null;

    // Once scrolling settles, snap to whichever slide is closer — you can
    // never rest half-transitioned between Projects and Photography.
    function scheduleSnap() {
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const range = pin.offsetHeight - stage.offsetHeight;
        if (range <= 0) return;
        const p = Math.min(Math.max(-pin.getBoundingClientRect().top / range, 0), 1);
        const target = Math.round(p);
        if (Math.abs(p - target) > 0.02) {
          window.scrollTo({ top: window.scrollY + (target - p) * range, behavior: "smooth" });
        }
      }, 140);
    }

    function update() {
      const range = pin.offsetHeight - stage.offsetHeight;
      const scrolled = -pin.getBoundingClientRect().top;
      const p = range > 0 ? Math.min(Math.max(scrolled / range, 0), 1) : 0;

      // Use the stage's actual pixel width (not the slide's own, gap-shrunk
      // width) so the two tiles slide the exact distance that keeps the
      // gap between them visible and consistent the whole way through.
      const step = stage.offsetWidth;

      from.style.transform = `translateX(${-p * step}px)`;
      from.style.pointerEvents = p < 0.5 ? "auto" : "none";

      to.style.transform = `translateX(${(1 - p) * step}px)`;
      to.style.pointerEvents = p >= 0.5 ? "auto" : "none";

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
      scheduleSnap();
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

})();
