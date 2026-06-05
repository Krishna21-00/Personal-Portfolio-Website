const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopButton = document.getElementById('scrollTopButton');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

const sectionElements = document.querySelectorAll('main section');

function toggleMenu() {
  const expanded = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', expanded);
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    const topOffset = targetSection.offsetTop - 70;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
    closeMenu();
  }
}

function updateActiveNav() {
  const scrollPosition = window.scrollY + 120;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      link?.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });

  scrollTopButton.style.display = window.scrollY > 450 ? 'flex' : 'none';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(event) {
  event.preventDefault();
  let valid = true;

  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formStatus.textContent = '';

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Please enter your name.';
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = 'Please enter your email.';
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = 'Please enter a message.';
    valid = false;
  }

  if (valid) {
    formStatus.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
  }
}

navToggle.setAttribute('aria-expanded', 'false');
navToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', smoothScroll));
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
window.addEventListener('click', event => {
  if (!navMenu.classList.contains('open')) return;
  if (!event.composedPath().includes(navMenu) && !event.composedPath().includes(navToggle)) {
    closeMenu();
  }
});
scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
contactForm.addEventListener('submit', validateForm);

window.addEventListener('load', updateActiveNav);
