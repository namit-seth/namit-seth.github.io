// Preserve existing Google Forms submission helper using jQuery.
$('#bootstrapForm').submit(function (event) {
  event.preventDefault();
  var extraData = {};
  $('#bootstrapForm').ajaxSubmit({
    data: extraData,
    dataType: 'jsonp',
    error: function () {
      alert('Form Submitted. Thanks.');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('[data-scroll]');
  const heroButtons = document.querySelectorAll('[data-target]');
  const hamburger = document.querySelector('.hamburger-icon');

  // Smooth scroll for nav links.
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const explicitTarget = link.getAttribute('data-target');
      const targetId = explicitTarget || (href && href.startsWith('#') ? href : '').replace('#', '');
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const rect = targetEl.getBoundingClientRect();
      const offset = window.scrollY + rect.top - 72; // account for sticky header.
      window.scrollTo({ top: offset, behavior: 'smooth' });

      if (header && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
      }
    });
  });

  // Smooth scroll for hero buttons using data-target.
  heroButtons.forEach(btn => {
    const target = btn.getAttribute('data-target');
    if (!target) return;
    btn.addEventListener('click', e => {
      const targetEl = document.querySelector(target);
      if (!targetEl) return;
      e.preventDefault();
      const rect = targetEl.getBoundingClientRect();
      const offset = window.scrollY + rect.top - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  // Mobile nav toggle.
  if (hamburger && header) {
    hamburger.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });
  }

  // Scroll reveal using IntersectionObserver.
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealEls.forEach(el => revealObserver.observe(el));

    const skillsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const value = el.getAttribute('data-skill');
            if (value) {
              el.style.width = value + '%';
              el.classList.add('in-view');
            }
            skillsObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillFills.forEach(el => skillsObserver.observe(el));
  } else {
    // Fallback: show everything if IntersectionObserver is not supported.
    revealEls.forEach(el => el.classList.add('in-view'));
    skillFills.forEach(el => {
      const value = el.getAttribute('data-skill');
      if (value) {
        el.style.width = value + '%';
        el.classList.add('in-view');
      }
    });
  }

  // Project details expand / collapse.
  document.querySelectorAll('.project-card').forEach(card => {
    const toggle = card.querySelector('.project-toggle');
    const details = card.querySelector('.project-details');
    if (!toggle || !details) return;

    toggle.addEventListener('click', () => {
      const isOpen = details.classList.contains('open');
      if (isOpen) {
        details.style.maxHeight = details.scrollHeight + 'px'; // force current height for smooth close.
        requestAnimationFrame(() => {
          details.classList.remove('open');
          details.style.maxHeight = '0';
        });
      } else {
        details.classList.add('open');
        details.style.maxHeight = details.scrollHeight + 'px';
      }
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // 3D tilt micro-interaction for cards.
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    const maxTilt = 10;
    const handleMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) translateZ(0)`;
      card.classList.add('tilt-active');
    };

    const resetTilt = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      card.classList.remove('tilt-active');
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', resetTilt);
    card.addEventListener('touchmove', e => {
      if (!e.touches[0]) return;
      handleMove(e.touches[0]);
    });
    card.addEventListener('touchend', resetTilt);
  });

  // Hero typed text animation (uses Typed.js).
  if (window.Typed) {
    new Typed('#typed-role', {
      strings: [
        'Electronics Engineer',
        'Embedded Systems Builder',
        'Frontend Web Designer',
        'Hardware–Software Integrator'
      ],
      typeSpeed: 55,
      backSpeed: 22,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  }

  // Hero particles background (uses particles.js).
  if (window.particlesJS) {
    // The configuration is tuned for a smooth, circuit-like particle field.
    particlesJS('hero-particles', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ['#22d3ee', '#4ade80'] },
        shape: { type: 'circle' },
        opacity: {
          value: 0.55,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#22d3ee',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 160,
            line_linked: {
              opacity: 0.7
            }
          }
        }
      },
      retina_detect: true
    });
  }

  // Dynamic year in footer.
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});