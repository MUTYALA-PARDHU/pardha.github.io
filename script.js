document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // 1. Hamburger Menu Toggle Logic (Re-implemented)
    // -----------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body; // To disable body scroll

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active'); // Animate hamburger icon
            body.classList.toggle('no-scroll'); // Prevent body scroll when menu is open
        });

        // Close menu when a navigation link is clicked (for smoother UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // -----------------------------------------------------------
    // 2. Section Fade-in Animation on Scroll (Enhanced)
    // -----------------------------------------------------------
    const animateOnScrollElements = document.querySelectorAll('main section, .skills-column, .subjects-column, .publication-item, .education-item, .conference-item, .teaching-role');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Optional: Add a class for different animation types or delays
                if (entry.target.classList.contains('skills-column') || entry.target.classList.contains('subjects-column')) {
                    entry.target.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
                } else {
                    entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        element.style.opacity = 0; // Start invisible
        element.style.transform = 'translateY(30px)'; // Start slightly below
        sectionObserver.observe(element);
    });

    // -----------------------------------------------------------
    // 3. Scroll-to-Top Button
    // -----------------------------------------------------------
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Font Awesome icon
    scrollToTopBtn.classList.add('scroll-to-top-btn');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -----------------------------------------------------------
    // 4. Hero Section Parallax Effect (subtle)
    // -----------------------------------------------------------
    const heroSection = document.querySelector('.hero-section');
    const profilePic = document.querySelector('.hero-section .profile-pic');
    const heroContent = document.querySelector('.hero-section .container'); // The text content

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        // Move background glows slightly slower
        if (heroSection) {
            heroSection.style.backgroundPositionY = -scrollPosition * 0.1 + 'px'; // Affect background position
            heroSection.style.backgroundPositionX = -scrollPosition * 0.05 + 'px'; // Slight horizontal shift
        }

        // Move profile picture slightly slower than text
        if (profilePic) {
            profilePic.style.transform = `translateY(${scrollPosition * 0.15}px)`; // Slower vertical scroll
            profilePic.style.opacity = 1 - (scrollPosition / 700); // Fade out slightly
        }

        // Move hero content slightly faster (or just keep it normal for a stronger effect on image)
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
    });
});
