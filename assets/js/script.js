"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
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

// Add event in all filter button items for large screen
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

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Feedback form submit (if present)
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async function (e) {
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

        await res.text();
        form.reset();
        showToast("Feedback submitted!");
      } catch (err) {
        console.error("Feedback Error:", err);
        showToast("Error submitting feedback.");
      }
    });
  }
});

// Toast message
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

/* === Feedback loading and modal === */

async function loadFeedback() {
  try {
    const res = await fetch(
      "https://teja-adusumilli-dev-ed.my.salesforce-sites.com/services/apexrest/FeedbackAPI/"
    );
    const feedbackList = await res.json();
    const container = document.getElementById("feedbackContainer");

    if (!Array.isArray(feedbackList) || feedbackList.length === 0) {
      container.innerHTML = "<p>No feedback found.</p>";
      return;
    }

    // Render each feedback entry as a card
    container.innerHTML = feedbackList
      .map(
        (entry) => `
      <div class="feedback-card">
        <img src="assets/images/avator- (9).png" alt="Avatar">
        <div class="feedback-content">
          <div class="feedback-name">${entry.Name || "Anonymous"}</div>
          <div class="feedback-comment">${
            entry.Comments__c || "No comment provided."
          }</div>
          <div class="feedback-meta">${
            entry.Email__c ? "📧 " + entry.Email__c : ""
          }</div>
        </div>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error fetching feedback:", err);
    const container = document.getElementById("feedbackContainer");
    if (container) {
      container.innerHTML = "<p>Error loading feedback.</p>";
    }
  }
}

// Show modal when clicking a feedback card
function attachFeedbackClickHandler() {
  const container = document.getElementById('feedbackContainer');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.feedback-card');
    if (!card) return;

    // Extract values from the card
    const avatarSrc = card.querySelector('img').src;
    const name = card.querySelector('.feedback-name').innerText;
    const comment = card.querySelector('.feedback-comment').innerText;
    const email = card.querySelector('.feedback-meta').innerText;

    // Populate the modal fields
    document.getElementById('modal-avatar').src = avatarSrc;
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-email').textContent = email;
    document.getElementById('modal-comment').textContent = comment;

    // Show the modal using the .show class
    document.getElementById('feedbackModal').classList.add('show');
  });
}

// Hide modal when the close button is clicked
function attachCloseModalHandler() {
  const closeBtn = document.querySelector('.feedback-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('feedbackModal').classList.remove('show');
    });
  }
}


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
  const card = container.querySelector(".certificate-item");
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
  // Feedback
  loadFeedback();
  attachFeedbackClickHandler();
  attachCloseModalHandler();

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
