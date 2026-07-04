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
  // .mobile-nav is a standalone element (sibling of .site-header), not the
  // desktop .main-nav — see the comment above its CSS for why: nesting a
  // fixed, fullscreen menu inside the backdrop-filter header breaks it.
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileNav.classList.remove("is-open"))
    );
  }

  /* ---------- Scroll lock (used while a modal/loader is open) ---------- */
  // Plain `overflow:hidden` doesn't reliably preserve the page's scroll
  // position once it's re-enabled — the page can jump back to the top.
  // Pinning the body with `position:fixed` and a negative `top` equal to the
  // scroll offset, then restoring `window.scrollTo` on unlock, keeps the
  // visitor exactly where they were.
  let savedScrollY = 0;
  function lockScroll() {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = `-${savedScrollY}px`;
    document.documentElement.classList.add("modal-locked");
    document.body.classList.add("modal-locked");
  }
  // Belt-and-suspenders: the fixed-body trick above stops the page's own
  // scroll, but wheel/touch input can still bubble through and nudge the
  // browser (especially touch rubber-banding). Swallow that input outright
  // whenever locked, except inside the modal's own body, which still needs
  // to scroll its photo/video content.
  document.addEventListener("wheel", (e) => {
    if (!document.documentElement.classList.contains("modal-locked")) return;
    const modalEl = overlayEl && overlayEl.querySelector(".modal");
    if (modalEl && modalEl.contains(e.target)) return;
    e.preventDefault();
  }, { passive: false });
  document.addEventListener("touchmove", (e) => {
    if (!document.documentElement.classList.contains("modal-locked")) return;
    const modalEl = overlayEl && overlayEl.querySelector(".modal");
    if (modalEl && modalEl.contains(e.target)) return;
    e.preventDefault();
  }, { passive: false });

  function unlockScroll() {
    document.documentElement.classList.remove("modal-locked");
    document.body.classList.remove("modal-locked");
    document.body.style.top = "";
    // html has scroll-behavior:smooth globally, which would otherwise animate
    // this jump — visibly scrolling the page from the top back down to where
    // it was. Switch to an instant jump just for this restore.
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, savedScrollY);
    document.documentElement.style.scrollBehavior = prevBehavior;
  }

  /* ---------- Edge glass (frosted vignette while scrolling) ---------- */
  if (!document.querySelector(".edge-glass-bottom")) {
    const bottom = document.createElement("div");
    bottom.className = "edge-glass edge-glass-bottom";
    document.body.appendChild(bottom);
  }

  /* ---------- Contact page: mouse-follow highlight + copy-to-clipboard ---------- */
  (function initContactPage() {
    const section = document.querySelector(".contact-section");
    if (!section) return;
    section.addEventListener("mousemove", (e) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      section.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });

    section.querySelectorAll(".copy-btn").forEach((btn) => {
      let resetTimer;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.dataset.copy || "";
        const markCopied = () => {
          btn.classList.add("is-copied");
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => btn.classList.remove("is-copied"), 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(markCopied).catch(() => {});
        } else {
          // Fallback for browsers without the async Clipboard API.
          const tmp = document.createElement("textarea");
          tmp.value = text;
          tmp.style.position = "fixed";
          tmp.style.opacity = "0";
          document.body.appendChild(tmp);
          tmp.select();
          try { document.execCommand("copy"); markCopied(); } catch (err) {}
          tmp.remove();
        }
      });
    });
  })();

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
  const ICON_COLLAPSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 3 9 9 3 9"/><polyline points="15 21 15 15 21 15"/><line x1="3" y1="21" x2="9" y2="15"/><line x1="21" y1="3" x2="15" y2="9"/></svg>`;

  /**
   * Renders a minimal card grid (cover + tiny category tag + title only)
   * for a list of items (projects or photography shoots).
   */
  function renderGrid(container, items, opts) {
    opts = opts || {};
    container.innerHTML = items
      .map((item, i) => {
        const tag = opts.showCategory && item.category ? item.category : (opts.tagLabel || "Portrait");
        const heading = [item.title, item.subtitle].filter(Boolean).join(" - ");
        return `
        <article class="card" data-index="${i}" tabindex="0" role="button" aria-label="View ${item.title}">
          <div class="card-media">
            <img src="${item.cover}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src=this.src.replace('maxresdefault','hqdefault');">
            <span class="tag card-tag">${tag}</span>
            <div class="card-title-glass">
              <div class="card-title-glass-row">
                <h3>${heading}</h3>
                <span class="arrow">${ICON_ARROW}</span>
              </div>
            </div>
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

    initMobileCardFocus(container);
  }

  /* On mobile there's no hover, so instead we track scroll position and give
     the "hover" look (.is-inview) to whichever card is currently most
     visible in the viewport — as the next card scrolls fully into view it
     takes over and the previous one loses the highlight. */
  function initMobileCardFocus(container) {
    const mq = window.matchMedia("(max-width:700px)");
    let observer = null;

    const disconnect = () => {
      if (observer) { observer.disconnect(); observer = null; }
      container.querySelectorAll(".card.is-inview").forEach((c) => c.classList.remove("is-inview"));
    };

    const connect = () => {
      const cards = Array.from(container.querySelectorAll(".card"));
      if (!cards.length) return;
      const ratios = new Map(cards.map((c) => [c, 0]));
      let active = null;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
          let best = null, bestRatio = 0.15;
          ratios.forEach((ratio, card) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = card; }
          });
          if (best !== active) {
            if (active) active.classList.remove("is-inview");
            if (best) best.classList.add("is-inview");
            active = best;
          }
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      cards.forEach((c) => observer.observe(c));
    };

    const sync = () => {
      disconnect();
      if (mq.matches) connect();
    };
    sync();
    mq.addEventListener("change", sync);
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
  let activePlayers = []; // one controller per video cell in the currently open modal

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
            <div class="video-grid m-video-grid"></div>
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
        if (pane === "photos") activePlayers.forEach((ctrl) => ctrl.pause());
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

  /* ---------- YouTube IFrame API (so embeds can stop each other too) ---------- */
  // Loaded once, lazily, the first time a popup actually has a YouTube clip —
  // lets us hear "this embed started playing" and tell every other player
  // (embedded or local) to pause, instead of only coordinating our own
  // custom <video> players.
  let ytApiPromise = null;
  function loadYouTubeApi() {
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve) => {
      if (window.YT && window.YT.Player) { resolve(window.YT); return; }
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prevReady === "function") prevReady();
        resolve(window.YT);
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    });
    return ytApiPromise;
  }

  /* ---------- Custom video player ---------- */
  function fmtTime(sec) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Wires up one video-player cell (its own <video> + controls). Multiple
  // videos each get their own independent instance now — no shared player,
  // no thumbnail strip — so they can sit side by side like the photo wall
  // and each keep its own play state, progress and orientation.
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

    // Requesting fullscreen has to happen inside the same user-gesture
    // handler that starts playback — browsers reject a fullscreen request
    // that isn't directly triggered by a click/tap.
    function enterFullscreen() {
      if (playerEl.requestFullscreen) playerEl.requestFullscreen().catch(() => {});
      else if (playerEl.webkitRequestFullscreen) playerEl.webkitRequestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    }

    function togglePlay() {
      if (video.paused) {
        video.play();
        enterFullscreen();
      } else {
        video.pause();
      }
    }

    playBig.addEventListener("click", togglePlay);
    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    video.addEventListener("play", () => setPlayIcon(true));
    video.addEventListener("pause", () => setPlayIcon(false));
    video.addEventListener("ended", () => setPlayIcon(false));

    // Match the box to the video's real proportions the moment we know
    // them — vertical/phone-shot clips get a tall, portrait box instead of
    // being forced into a 16:9 letterboxed frame.
    video.addEventListener("loadedmetadata", () => {
      durEl.textContent = fmtTime(video.duration);
      if (video.videoWidth && video.videoHeight) {
        playerEl.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
        playerEl.classList.toggle("is-portrait", video.videoHeight > video.videoWidth);
      }
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

    function isFullscreen() {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      return fsEl === playerEl || fsEl === video;
    }

    function updateFsIcon() {
      fsBtn.innerHTML = isFullscreen() ? ICON_COLLAPSE : ICON_EXPAND;
      fsBtn.setAttribute("aria-label", isFullscreen() ? "Exit fullscreen" : "Fullscreen");
    }

    fsBtn.addEventListener("click", () => {
      if (isFullscreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (video.webkitExitFullscreen) video.webkitExitFullscreen();
      } else if (playerEl.requestFullscreen) {
        playerEl.requestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    });

    document.addEventListener("fullscreenchange", updateFsIcon);
    document.addEventListener("webkitfullscreenchange", updateFsIcon);

    return {
      video,
      pause() { video.pause(); },
    };
  }

  function renderVideoGrid(item) {
    const el = overlayEl;
    const gridEl = el.querySelector(".m-video-grid");
    const videos = item.videos || [];

    const showCount = videos.length > 1;
    // Single clip: no carousel needed, so center it instead of the
    // peek-to-the-side alignment used for swipeable multi-video sets.
    gridEl.classList.toggle("is-single", videos.length === 1);
    // Some projects want the horizontal swipe carousel on desktop too
    // (see .video-grid.is-carousel in style.css), not just on mobile.
    gridEl.classList.toggle("is-carousel", !!item.videosCarousel);

    gridEl.innerHTML = videos
      .map((v, i) => {
        const countBadge = showCount ? `<span class="vp-count">${i + 1} / ${videos.length}</span>` : "";
        // YouTube-hosted clips just embed the standard player — no custom
        // controls to wire up, since YouTube brings its own.
        if (v.youtube) {
          const ytId = `yt-player-${Date.now()}-${i}`;
          return `
      <div class="video-item">
        ${countBadge}
        <div class="video-player is-embed${v.portrait ? " is-portrait" : ""}">
          <iframe
            id="${ytId}"
            src="https://www.youtube.com/embed/${v.youtube}?modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1"
            title="${v.title}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
      </div>`;
        }
        return `
      <div class="video-item">
        ${countBadge}
        <div class="video-player">
          <video playsinline poster="${v.poster || item.cover}" preload="metadata">
            <source src="${v.src}" type="video/mp4">
          </video>
          <div class="vp-center">
            <button class="vp-play-big" aria-label="Play ${v.title}">${ICON_PLAY}</button>
          </div>
          <div class="vp-controls">
            <button class="vp-btn vp-play" aria-label="Play/Pause">${ICON_PLAY}</button>
            <span class="vp-time"><span class="vp-current">0:00</span> / <span class="vp-duration">0:00</span></span>
            <input class="vp-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek">
            <button class="vp-btn vp-mute" aria-label="Mute">${ICON_SOUND}</button>
            <button class="vp-btn vp-fullscreen" aria-label="Fullscreen">${ICON_EXPAND}</button>
          </div>
        </div>
      </div>`;
      })
      .join("");

    activePlayers = Array.from(gridEl.querySelectorAll(".video-player:not(.is-embed)")).map((cellEl) =>
      createVideoPlayerController(cellEl)
    );

    // Only one clip should ever be making noise at a time — starting any one
    // (local <video> or a YouTube embed) pauses every other player in this
    // popup, embedded or not.
    const ytIframes = Array.from(gridEl.querySelectorAll("iframe[id^='yt-player-']"));
    const ytHandles = [];
    function stopAllExcept(activeHandle) {
      activePlayers.forEach((h) => { if (h !== activeHandle) h.pause(); });
      ytHandles.forEach((h) => { if (h !== activeHandle) h.pause(); });
    }

    activePlayers.forEach((ctrl) => {
      ctrl.video.addEventListener("play", () => stopAllExcept(ctrl));
    });

    if (ytIframes.length) {
      loadYouTubeApi().then((YT) => {
        ytIframes.forEach((iframe) => {
          if (!document.getElementById(iframe.id)) return; // popup moved on already
          try {
            let handle;
            const player = new YT.Player(iframe.id, {
              events: {
                onStateChange: (e) => {
                  if (e.data === YT.PlayerState.PLAYING) stopAllExcept(handle);
                },
              },
            });
            handle = { pause() { try { player.pauseVideo(); } catch (e) {} } };
            ytHandles.push(handle);
          } catch (e) {}
        });
      });
    }
  }

  function openGallery(item) {
    const el = ensureOverlay();
    currentItem = item;

    const hasPhotos = item.images && item.images.length > 0;
    const hasVideo = item.videos && item.videos.length > 0;
    const tag = item.category || "Portrait";

    el.querySelector(".m-title").textContent = item.title;
    const subParts = [item.subtitle, tag].filter(Boolean);
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

    if (hasVideo) renderVideoGrid(item);
    else {
      activePlayers.forEach((ctrl) => ctrl.pause());
      activePlayers = [];
      // Video-less, photo-less items (e.g. a music video still in edit)
      // show a simple placeholder instead of a blank pane.
      el.querySelector(".m-video-grid").innerHTML =
        !hasPhotos && item.comingSoon
          ? `<p class="coming-soon">${item.comingSoon}</p>`
          : "";
    }

    el.classList.add("is-open");
    lockScroll();
  }

  function closeGallery() {
    if (!overlayEl) return;
    overlayEl.classList.remove("is-open");
    unlockScroll();
    activePlayers.forEach((ctrl) => ctrl.pause());
    // Embeds (YouTube iframes) keep playing unless their src is cleared —
    // pausing only stops the plain <video> players above.
    overlayEl.querySelectorAll(".video-player.is-embed iframe").forEach((f) => {
      f.src = "about:blank";
    });
    closeLightbox();
  }

  window.PortfolioSite = { renderGrid, openGallery };

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

    lockScroll();

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
      unlockScroll();
      try { sessionStorage.setItem(LOADER_KEY, "1"); } catch (e) {}
      document.dispatchEvent(new Event("lo:intro-done"));
      t(() => loader.remove(), 750);
    }, flashEnd + 2150);
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
    // hero-slide video explicitly, silently ignoring rejection. Setting the
    // `muted` property (not just the attribute) is what actually satisfies
    // mobile autoplay policies in some browsers.
    const heroVideos = Array.from(document.querySelectorAll(".hero-slide video"));

    function attemptPlay(v) {
      if (!v.paused) return;
      v.play().catch(() => {});
    }
    function attemptPlayAll() { heroVideos.forEach(attemptPlay); }

    heroVideos.forEach((v) => {
      v.muted = true;
      v.setAttribute("muted", "");
      // Some mobile browsers quietly defer the actual network fetch for an
      // autoplaying video until the page shows "engagement" (a scroll/tap),
      // even though the element is on-screen from the first paint. Forcing
      // .load() explicitly (in addition to preload="auto") pushes the
      // browser to start fetching right away instead of waiting for that.
      v.load();
    });

    // The intro loader (see initLoader above) is a fullscreen, fully opaque
    // overlay sitting above the hero for ~2.5s on a visitor's very first
    // pageview this session. Calling .play() while the video is completely
    // hidden behind it makes iOS Safari mark the element ineligible for
    // autoplay for the rest of that page load — after that, NO amount of
    // gesture-free retrying works anymore, only a real tap does. So every
    // attempt below is gated on the loader genuinely being gone first,
    // instead of firing blind while it's still covering the video.
    // initLoader() (above, runs first) already removes .site-loader from the
    // DOM synchronously on repeat visits this session, so simply checking
    // whether it's still present tells us whether it's genuinely blocking.
    const loaderBlocking = !!document.querySelector(".site-loader");

    function startAutoplayAttempts() {
      attemptPlayAll();
      // The very first play() call can still be rejected on some mobile
      // browsers simply because it fires before the video is "settled" —
      // not because of an actual gesture requirement. Retrying as soon as
      // the video reports it actually has data, with zero gesture
      // involved, catches that case without needing a tap.
      heroVideos.forEach((v) => {
        v.addEventListener("loadeddata", () => attemptPlay(v));
        v.addEventListener("canplay", () => attemptPlay(v));
      });
      // Belt-and-braces: a few more gesture-free retries shortly after,
      // and whenever the tab regains visibility.
      [200, 800, 2000].forEach((delay) => setTimeout(attemptPlayAll, delay));
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") attemptPlayAll();
      });
    }

    if (loaderBlocking) {
      document.addEventListener("lo:intro-done", startAutoplayAttempts, { once: true });
    } else {
      startAutoplayAttempts();
    }

    // If a browser genuinely requires a gesture before allowing autoplay at
    // all, this is the final fallback — first tap/click/scroll anywhere.
    function retryHeroPlayback() {
      attemptPlayAll();
      document.removeEventListener("touchstart", retryHeroPlayback);
      document.removeEventListener("click", retryHeroPlayback);
      window.removeEventListener("scroll", retryHeroPlayback);
    }
    document.addEventListener("touchstart", retryHeroPlayback, { passive: true, once: true });
    document.addEventListener("click", retryHeroPlayback, { once: true });
    window.addEventListener("scroll", retryHeroPlayback, { passive: true, once: true });

    // On mobile the two slides are plain side-by-side cards you swipe
    // through (see CSS) instead of the pinned full-screen slide effect —
    // skip the scroll-driven transform logic entirely there, since setting
    // inline transforms below would fight the CSS horizontal-scroll layout.
    if (window.matchMedia("(max-width:700px)").matches) return;

    let ticking = false;
    let snapTimer = null;

    // pin/stage height and stage width only change on resize (or content
    // reflow), not on every scroll pixel — reading them inside the scroll
    // handler forced a synchronous layout on every single frame, which is
    // the main cause of mobile scroll jank here. Cache them once and only
    // refresh on resize; the scroll handler then only reads the one value
    // that's genuinely scroll-dependent (the pin's position).
    let range = 0;
    let step = 0;
    function measure() {
      range = pin.offsetHeight - stage.offsetHeight;
      step = stage.offsetWidth;
    }

    // Once scrolling settles, snap to whichever slide is closer — you can
    // never rest half-transitioned between Projects and Photography.
    function scheduleSnap() {
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (range <= 0) return;
        const p = Math.min(Math.max(-pin.getBoundingClientRect().top / range, 0), 1);
        const target = Math.round(p);
        if (Math.abs(p - target) > 0.02) {
          window.scrollTo({ top: window.scrollY + (target - p) * range, behavior: "smooth" });
        }
      }, 140);
    }

    function update() {
      const scrolled = -pin.getBoundingClientRect().top;
      const p = range > 0 ? Math.min(Math.max(scrolled / range, 0), 1) : 0;

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
    window.addEventListener("resize", () => {
      measure();
      update();
    });
    measure();
    update();
  })();

})();
