document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // 1. Active Navigation Link Highlighting
    // -----------------------------------------------------------
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const highlightNavOnScroll = () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight; // Get dynamic header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 30; // Adjust offset for sticky header and buffer
            const sectionBottom = sectionTop + section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Call on load to set initial active link

    // -----------------------------------------------------------
    // 2. Section Fade-in Animation on Scroll (Enhanced)
    // -----------------------------------------------------------
    const animateOnScrollElements = document.querySelectorAll('main section, .skills-column, .subjects-column, .publication-item, .experience-item, .education-item, .conference-item, .teaching-role');

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
