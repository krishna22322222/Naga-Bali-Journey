/* ========================================
   NAGA BALI JOURNEY — Scripts
   ======================================== */

// Hero image slideshow — auto-cycle every 5 seconds
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const text = counter.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current + suffix;
    }, 30);
  });
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--gold)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// Background music control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = true;
let musicInitialized = false;

// Attempt autoplay with user interaction fallback
function enableMusicAutoplay() {
  if (musicInitialized) return;
  musicInitialized = true;
  
  bgMusic.muted = false;
  bgMusic.play().catch(() => {
    console.log('Autoplay in progress');
  });
  isMusicPlaying = true;
  musicToggle.classList.add('playing');
  localStorage.setItem('musicPlaying', 'true');
}

// Enable autoplay on first user interaction
const autoplayTriggers = ['click', 'scroll', 'touchstart', 'keydown'];
autoplayTriggers.forEach(trigger => {
  document.addEventListener(trigger, enableMusicAutoplay, { once: true });
});

// Also try autoplay immediately
if (bgMusic) {
  bgMusic.muted = false;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log('Autoplay prevented - awaiting user interaction');
    });
  }
  isMusicPlaying = true;
  musicToggle.classList.add('playing');
}

// Music toggle button click
musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicToggle.classList.remove('playing');
    localStorage.setItem('musicPlaying', 'false');
  } else {
    bgMusic.play();
    isMusicPlaying = true;
    musicToggle.classList.add('playing');
    localStorage.setItem('musicPlaying', 'true');
  }
});

// Update button state when audio events fire
bgMusic.addEventListener('play', () => {
  isMusicPlaying = true;
  musicToggle.classList.add('playing');
});

bgMusic.addEventListener('pause', () => {
  isMusicPlaying = false;
  musicToggle.classList.remove('playing');
});
