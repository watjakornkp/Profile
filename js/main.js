/* ============================================
   WATJAKORN GLINRAKONT — Portfolio
   JavaScript: Interactions, GitHub API, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('.section[id]');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active nav link based on scroll position
  function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavScroll();
    highlightNavLink();
  });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleMobileNav);
  navOverlay.addEventListener('click', toggleMobileNav);

  // Close mobile nav on link click
  navLinksContainer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        toggleMobileNav();
      }
    });
  });

  // ===== TYPING EFFECT =====
  const typedElement = document.getElementById('typedText');
  const titles = [
    'IT Professional',
    'System Analyst',
    'SAP Consultant',
    'Web Developer',
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== GITHUB PROJECTS =====
  const projectsGrid = document.getElementById('projectsGrid');
  const GITHUB_USERNAME = 'watjakornkp';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;

  // Language colors mapping
  const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Shell: '#89e051',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Jupyter: '#DA5B0B',
    'Jupyter Notebook': '#DA5B0B',
    SCSS: '#c6538c',
    Dart: '#00B4AB',
  };

  // SVG icons
  const icons = {
    repo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    fork: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>`,
  };

  function createProjectCard(repo) {
    const langColor = langColors[repo.language] || '#C4956A';
    const description = repo.description || 'No description provided.';

    return `
      <div class="project-card reveal">
        <div class="project-card-header">
          <div class="project-icon">${icons.repo}</div>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${repo.name} on GitHub">
            ${icons.link}
          </a>
        </div>
        <h4>${repo.name}</h4>
        <p>${description}</p>
        <div class="project-footer">
          ${
            repo.language
              ? `<div class="project-lang">
                  <span class="project-lang-dot" style="background:${langColor}"></span>
                  ${repo.language}
                </div>`
              : '<div></div>'
          }
          <div class="project-stats">
            ${
              repo.stargazers_count > 0
                ? `<span class="project-stat">${icons.star} ${repo.stargazers_count}</span>`
                : ''
            }
            ${
              repo.forks_count > 0
                ? `<span class="project-stat">${icons.fork} ${repo.forks_count}</span>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
  }

  async function loadProjects() {
    try {
      const response = await fetch(GITHUB_API_URL);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();

      // Repos to hide from portfolio
      const hiddenRepos = ['HR-Project'];

      // Filter out forked repos, hidden repos, and sort by stars then updated
      const filteredRepos = repos
        .filter((repo) => !repo.fork && !hiddenRepos.includes(repo.name))
        .sort((a, b) => {
          // Sort by stars first, then by updated date
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 6); // Show max 6 projects

      if (filteredRepos.length === 0) {
        projectsGrid.innerHTML = `
          <div class="projects-empty">
            <p>No public repositories found. Check back soon!</p>
          </div>
        `;
        return;
      }

      projectsGrid.innerHTML = filteredRepos
        .map((repo) => createProjectCard(repo))
        .join('');

      // Re-observe new reveal elements
      projectsGrid.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
      });
    } catch (error) {
      console.error('Failed to load GitHub projects:', error);
      projectsGrid.innerHTML = `
        <div class="projects-empty">
          <p>Unable to load projects at the moment.</p>
          <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-top:1rem;">
            ${icons.link} View on GitHub
          </a>
        </div>
      `;
    }
  }

  loadProjects();

  // ===== PROFILE IMAGE FALLBACK =====
  const heroImage = document.getElementById('heroImage');
  heroImage.addEventListener('error', () => {
    // Create a nice initials avatar fallback
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#D4A574');
    gradient.addColorStop(1, '#C4956A');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(200, 200, 200, 0, Math.PI * 2);
    ctx.fill();

    // Initials
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 120px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('WG', 200, 200);

    heroImage.src = canvas.toDataURL();
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:watjakorn.kp@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  });

  // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Init
  handleNavScroll();
});
