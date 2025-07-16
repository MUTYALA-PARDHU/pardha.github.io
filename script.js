document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links (already handled by scroll-behavior: smooth; in CSS, but good to have JS fallback/enhancement if needed)
    // You could add logic here for active link highlighting based on scroll position

    // Example: Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const highlightNavOnScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust 150px to account for sticky header height and better scroll detection
            // Make sure the section is at least partially visible
            if (pageYOffset >= sectionTop - 150 && pageYOffset < sectionTop + sectionHeight - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // This condition needs to match the new section IDs
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Call on load to set initial active link

    // Optional: Simple fade-in animation for sections on scroll (more advanced)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0; // Start invisible
        section.style.transform = 'translateY(20px)'; // Start slightly below
        sectionObserver.observe(section);
    });

    // You can add more advanced JS here, e.g., a "scroll to top" button,
    // a simple image carousel if you add more photos, etc.
});
