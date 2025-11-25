/* Global UI behavior for the portfolio site */
document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Active nav link highlight based on pathname
    try {
        const navLinks = Array.from(document.querySelectorAll('.main-nav .nav-link'));
        navLinks.forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            const current = window.location.pathname.split('/').pop() || 'index.html';
            if (href === current || (href === 'index.html' && current === '')) {
                a.classList.add('active');
            }
        });
    } catch (e) { /* noop */ }

    // Intersection reveal for sections
    const sections = document.querySelectorAll('main section, .skills, .projects');
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    sections.forEach(s => io.observe(s));

    // Ensure external links are safe
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
        if (!a.getAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
    });

    /* Modal utilities */
    function openModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        // focus first focusable
        const focusable = modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
        document.body.classList.add('no-scroll');
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }

    // Close when overlay or [data-close] clicked
    document.addEventListener('click', e => {
        const closeAttr = e.target.closest('[data-close]');
        if (closeAttr) {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal);
        }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
        }
    });

  // Profile photo opens photo modal
  const profileBtn = document.getElementById('profile-img');
  const photoModal = document.getElementById('photoModal');
  if (profileBtn && photoModal) {
    profileBtn.addEventListener('click', () => openModal(photoModal));
  }

  // Close profile hover info on X button click
  document.addEventListener('click', e => {
    const closeBtn = e.target.closest('.profile-close-btn');
    if (closeBtn) {
      const hoverInfo = closeBtn.closest('.profile-hover-info');
      if (hoverInfo) {
        hoverInfo.style.opacity = '0';
        hoverInfo.style.pointerEvents = 'none';
      }
    }
  });    // Contact form confirmation handling (on contact page)
    const contactForm = document.getElementById('contactForm');
    const confirmModal = document.getElementById('confirmModal');
    if (contactForm && confirmModal) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            openModal(confirmModal);
        });

        // confirm / cancel handlers
        confirmModal.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                if (action === 'confirm') {
                    // Submit form via fetch to FormSpree
                    const formData = new FormData(contactForm);
                    fetch(contactForm.getAttribute('action'), {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            closeModal(confirmModal);
                            const success = document.createElement('div');
                            success.className = 'form-success';
                            success.textContent = 'Message sent successfully! Thank you for reaching out.';
                            contactForm.prepend(success);
                            contactForm.reset();
                            setTimeout(() => success.classList.add('visible'), 30);
                            setTimeout(() => success.classList.remove('visible'), 5000);
                        } else {
                            alert('Error sending message. Please try again.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error sending message. Please try again.');
                    });
                } else {
                    // cancel
                    closeModal(confirmModal);
                }
            });
        });
    }
});
