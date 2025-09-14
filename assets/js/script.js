"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("feedbackForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        comments: formData.get("comments"),
      };

      try {
        const res = await fetch(
          "https://teja-adusumilli-dev-ed.my.salesforce-sites.com/services/apexrest/FeedbackAPI/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const result = await res.text();
        form.reset(); // clear form
        showToast("Feedback submitted!");
      } catch (err) {
        console.error("Feedback Error:", err);
        showToast("Error submitting feedback.");
      }
    });
});
// toast message
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}



// slider function for cards
/* === Testimonials slider logic === */
function scrollTestimonials(direction) {
  const container = document.querySelector(
    ".testimonials-wrapper .testimonials-list"
  );
  const card = container.querySelector(".testimonials-item");
  if (!container || !card) return;

  const gap = parseFloat(getComputedStyle(container).gap || 0);
  const cardWidth = card.getBoundingClientRect().width;
  const scrollAmount = cardWidth + gap;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

function updateArrowVisibilityTestimonials() {
  const container = document.querySelector(
    ".testimonials-wrapper .testimonials-list"
  );
  const prevBtn = document.querySelector(".testimonial-nav-btn.left");
  const nextBtn = document.querySelector(".testimonial-nav-btn.right");

  prevBtn.style.visibility = container.scrollLeft <= 0 ? "hidden" : "visible";

  nextBtn.style.visibility =
    container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
      ? "hidden"
      : "visible";
}

/* === Certifications slider logic === */
function scrollCertifications(direction) {
  const container = document.querySelector(
    ".certificate-wrapper .certificate-list"
  );
  const card = container.querySelector(".certificate-item"); // finds any card
  if (!container || !card) return;

  const gap = parseFloat(getComputedStyle(container).gap || 0);
  const cardWidth = card.getBoundingClientRect().width;
  const scrollAmount = cardWidth + gap;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

function updateArrowVisibilityCertificates() {
  const container = document.querySelector(
    ".certificate-wrapper .certificate-list"
  );
  const prevBtn = document.querySelector(".certificate-nav-btn.left");
  const nextBtn = document.querySelector(".certificate-nav-btn.right");

  prevBtn.style.visibility = container.scrollLeft <= 0 ? "hidden" : "visible";

  nextBtn.style.visibility =
    container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
      ? "hidden"
      : "visible";
}

/* === Attach event listeners on DOM ready === */
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials
  updateArrowVisibilityTestimonials();
  const testimonialsContainer = document.querySelector(
    ".testimonials-wrapper .testimonials-list"
  );
  testimonialsContainer.addEventListener(
    "scroll",
    updateArrowVisibilityTestimonials
  );
  document
    .querySelector(".testimonial-nav-btn.left")
    .addEventListener("click", () => scrollTestimonials(-1));
  document
    .querySelector(".testimonial-nav-btn.right")
    .addEventListener("click", () => scrollTestimonials(1));

  // Certifications
  updateArrowVisibilityCertificates();
  const certificateContainer = document.querySelector(
    ".certificate-wrapper .certificate-list"
  );
  certificateContainer.addEventListener(
    "scroll",
    updateArrowVisibilityCertificates
  );
  document
    .querySelector(".certificate-nav-btn.left")
    .addEventListener("click", () => scrollCertifications(-1));
  document
    .querySelector(".certificate-nav-btn.right")
    .addEventListener("click", () => scrollCertifications(1));
});

// feedback fetch and modal logic
(function () {
  const API_URL = 'https://teja-adusumilli-dev-ed.my.salesforce-sites.com/services/apexrest/FeedbackAPI/';
  const container = document.getElementById('feedbackContainer');
  const modal = document.getElementById('feedbackModal');
  const modalShowClass = 'show';
  const avatarEl = document.getElementById('modal-avatar');
  const nameEl = document.getElementById('modal-name');
  const emailEl = document.getElementById('modal-email');
  const commentEl = document.getElementById('modal-comment');
  const closeBtn = modal.querySelector('.feedback-close-btn');
  const backdrop = modal.querySelector('[data-close-modal]');

  // Safe avatar chooser: use common SF field names or fallback image
  function chooseAvatar(entry) {
    // try common fields used previously, then fallback to default
    return entry.AvatarUrl || entry.PhotoURL__c || entry.Picture__c || './assets/images/avatar-1.png';
  }

  // Render cards from fetched feedback array
  function renderCards(list) {
    if (!Array.isArray(list) || list.length === 0) {
      container.innerHTML = '<p>No feedback found.</p>';
      return;
    }

    container.innerHTML = list.map(entry => {
      const name = entry.Name || 'Anonymous';
      const comment = entry.Comments__c || entry.Comment__c || entry.Comment || 'No comment provided.';
      const email = entry.Email__c || entry.Email || '';
      const avatar = chooseAvatar(entry);

      // escape minimal HTML to avoid injection (basic)
      function esc(s){ return String(s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

      return `
        <div class="feedback-card" role="button" tabindex="0"
             data-avatar="${esc(avatar)}"
             data-name="${esc(name)}"
             data-email="${esc(email)}"
             data-comment="${esc(comment)}">
          <img class="card-avatar" src="${esc(avatar)}" alt="${esc(name)}" width="56" height="56" />
          <div class="feedback-content">
            <div class="feedback-name">${esc(name)}</div>
            <div class="feedback-email">${esc(email)}</div>
            <div class="feedback-comment">${esc(comment)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Load feedback from API
  async function loadFeedback() {
    try {
      container.innerHTML = '<div class="loading">Loading feedback…</div>';
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response not ok: ' + res.status);
      const data = await res.json();
      renderCards(data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      container.innerHTML = '<p>Error loading feedback.</p>';
    }
  }

  // Read data from a card element (delegation)
  function readCardData(card) {
    return {
      avatar: card.dataset.avatar || card.querySelector('img')?.src || './assets/images/avatar-1.png',
      name: card.dataset.name || card.querySelector('.feedback-name')?.textContent || 'Anonymous',
      email: card.dataset.email || card.querySelector('.feedback-email')?.textContent || '',
      comment: card.dataset.comment || card.querySelector('.feedback-comment')?.textContent || ''
    };
  }

  // Open modal with given data
  function openModalWithData(data) {
    avatarEl.src = data.avatar || './assets/images/avatar-1.png';
    avatarEl.alt = data.name || 'Avatar';
    nameEl.textContent = data.name || '';
    emailEl.textContent = data.email || '';
    commentEl.textContent = data.comment || '';

    modal.classList.add(modalShowClass);
    modal.setAttribute('aria-hidden', 'false');
    // lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // move focus to close button for accessibility
    closeBtn?.focus();
  }

  // Close modal
  function closeModal() {
    modal.classList.remove(modalShowClass);
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Delegated click (and keyboard Enter/Space) on container
  function attachDelegation() {
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.feedback-card');
      if (!card) return;
      const data = readCardData(card);
      openModalWithData(data);
    });

    // keyboard support for accessibility
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.feedback-card');
        if (!card) return;
        e.preventDefault();
        const data = readCardData(card);
        openModalWithData(data);
      }
    });
  }

  // Attach modal close handlers
  function attachModalHandlers() {
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    // click outside (modal element) close fallback
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    loadFeedback();
    attachDelegation();
    attachModalHandlers();
  });

  // expose for debugging
  window._feedback = { loadFeedback, openModalWithData, closeModal };
})();
// new js for model popup in feedback
(function(){
  // selectors (only new names)
  const rootSelector = '.ta-modal-root';
  const cardSelector = '.ta-card';
  const closeAttr = 'data-ta-close';

  const modalRoot = document.querySelector(rootSelector);
  const modalWindow = modalRoot?.querySelector('.ta-modal-window');
  const backdrop = modalRoot?.querySelector('.ta-modal-backdrop');
  const closeButtons = modalRoot ? modalRoot.querySelectorAll('[' + closeAttr + ']') : [];
  const avatarEl = document.getElementById('ta-modal-avatar');
  const titleEl = document.getElementById('ta-modal-title');
  const bodyEl = document.getElementById('ta-modal-body');

  if (!modalRoot || !modalWindow) {
    // modal missing — don't break the page
    console.warn('TA modal: modal structure not found; aborting modal init.');
    return;
  }

  let lastTrigger = null;

  function openTaModalFromCard(card) {
    lastTrigger = card;
    const t = card.getAttribute('data-ta-title') || '';
    const b = card.getAttribute('data-ta-body') || '';
    const i = card.getAttribute('data-ta-img') || (card.querySelector('img')?.src || '');

    titleEl.textContent = t;
    bodyEl.textContent = b;

    if (i) {
      avatarEl.src = i;
      avatarEl.alt = t ? (t + ' avatar') : 'avatar';
      avatarEl.style.display = '';
    } else {
      avatarEl.style.display = 'none';
      avatarEl.removeAttribute('src');
      avatarEl.alt = '';
    }

    // show
    modalRoot.style.display = 'flex';
    modalRoot.setAttribute('aria-hidden','false');
    // focus trap start
    modalWindow.focus();
    // prevent page scroll
    document.documentElement.style.overflow = 'hidden';
  }

  function closeTaModal() {
    modalRoot.style.display = 'none';
    modalRoot.setAttribute('aria-hidden','true');
    document.documentElement.style.overflow = '';
    // return focus to trigger
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    lastTrigger = null;
  }

  // wire cards
  const cards = Array.from(document.querySelectorAll(cardSelector));
  cards.forEach(card => {
    card.addEventListener('click', () => openTaModalFromCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTaModalFromCard(card);
      }
    });
  });

  // wire close buttons & backdrop
  closeButtons.forEach(btn => btn.addEventListener('click', closeTaModal));
  if (backdrop) backdrop.addEventListener('click', closeTaModal);

  // ESC key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRoot.style.display !== 'none') {
      closeTaModal();
    }
  });

  // Basic focus trap: keep focus in modal when open
  document.addEventListener('focus', function(e){
    if (modalRoot.style.display === 'none') return;
    if (!modalRoot.contains(e.target)) {
      e.stopPropagation();
      modalWindow.focus();
    }
  }, true);

})();