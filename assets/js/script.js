'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



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
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

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

select.addEventListener("click", function () { elementToggleFunc(this); });

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

}

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


  document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      comments: formData.get('comments')
    };

    try {
      const res = await fetch('https://teja-adusumilli-dev-ed.my.salesforce-sites.com/services/apexrest/FeedbackAPI/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.text();
      form.reset(); // clear form
      showToast("Feedback submitted!");
    } catch (err) {
      console.error('Feedback Error:', err);
      showToast("Error submitting feedback.");
    }
  });
});
// toast message
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}
//card show and hide
document.querySelectorAll('.feedback-card').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('modal-name').textContent = card.dataset.name;
    document.getElementById('modal-email').textContent = card.dataset.email;
    document.getElementById('modal-comment').textContent = card.dataset.comment;
    document.getElementById('modal-avatar').src = card.dataset.avatar;
    document.getElementById('feedbackModal').classList.remove('hidden');
  });
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('feedbackModal').classList.add('hidden');
});




async function loadFeedback() {
  try {
    const res = await fetch('https://teja-adusumilli-dev-ed.my.salesforce-sites.com/services/apexrest/FeedbackAPI/');
    const feedbackList = await res.json();
    const container = document.getElementById('feedbackContainer');

    if (!Array.isArray(feedbackList) || feedbackList.length === 0) {
      container.innerHTML = '<p>No feedback found.</p>';
      return;
    }

    // container.innerHTML = feedbackList.map(entry => `
    //   <div class="feedback-card"
    //     data-name="${entry.Name || 'Anonymous'}"
    //     data-comment="${entry.Comments__c || 'No comment provided.'}"
    //     data-avatar="assets/images/avator- (9).png">
        
    //     <img src="assets/images/avator- (9).png" class="feedback-avatar" alt="Avatar">
    //     <div>
    //       <div class="feedback-name">${entry.Name || 'Anonymous'}</div>
    //       <div class="feedback-snippet">${(entry.Comments__c || 'No comment provided.').slice(0, 100)}...</div>
    //     </div>
    //   </div>
    // `).join('');


    container.innerHTML = feedbackList.map(entry => `
  <div class="feedback-card">
    <img src="assets/images/avator- (9).png" alt="Avatar">
    <div class="feedback-content">
      <div class="feedback-name">${entry.Name || 'Anonymous'}</div>
      <div class="feedback-comment">${entry.Comments__c || 'No comment provided.'}</div>
      <div class="feedback-meta">${entry.Email__c ? `📧 ${entry.Email__c}` : ''}</div>
    </div>
  </div>
`).join('');


    // Attach modal click listeners
    document.querySelectorAll('.feedback-card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('modal-name').textContent =  card.childNodes[3].childNodes[1].innerText;//card.dataset.name;
        document.getElementById('modal-comment').textContent = card.childNodes[3].childNodes[3].innerText;//card.dataset.comment;
        document.getElementById('modal-avatar').src = card.dataset.avatar;
        document.getElementById('feedbackModal').classList.remove('hidden');
      });
    });

  } catch (err) {
    console.error('Error fetching feedback:', err);
    document.getElementById('feedbackContainer').innerHTML = '<p>Error loading feedback.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadFeedback);

// Close modal
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('feedbackModal').classList.add('hidden');
  });
});
// Sample JS to populate modal
// document.getElementById('modal-avatar').src = user.avatar;
// document.getElementById('modal-name').textContent = user.name;
// document.getElementById('modal-email').textContent = user.email;
// document.getElementById('modal-comments').textContent = user.comments;
document.getElementById('modal-name').textContent = card.dataset.name || 'No name';
document.getElementById('modal-comment').textContent = card.dataset.comment || 'No comment';
document.getElementById('modal-email').textContent = card.dataset.email;


// slider function for cards


  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("[data-testimonials-wrapper]");
    const list = document.querySelector("[data-testimonials-list]");
    const leftArrow = document.querySelector("[data-left-arrow]");
    const rightArrow = document.querySelector("[data-right-arrow]");

    if (!container || !list || !leftArrow || !rightArrow) return;

    const scrollAmount = 300;

    leftArrow.addEventListener("click", () => {
      list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      list.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    function updateArrows() {
      const maxScrollLeft = list.scrollWidth - list.clientWidth;

      if (maxScrollLeft <= 0) {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
        return;
      }

      leftArrow.style.display = list.scrollLeft > 10 ? "block" : "none";
      rightArrow.style.display = list.scrollLeft < maxScrollLeft - 10 ? "block" : "none";
    }

    list.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    window.addEventListener("load", updateArrows);
    updateArrows();
  });


