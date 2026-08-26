/**
 * Portfolio Interactive Script
 * Handles project category filtering, studio group visibility, active section highlighting, smooth scrolling, and UI helpers.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const studioBlocks = document.querySelectorAll('.studio-block');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || categories.split(' ').includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });

                // Update Studio Blocks visibility
                setTimeout(() => {
                    studioBlocks.forEach(block => {
                        const visibleCards = block.querySelectorAll('.project-card:not([style*="display: none"])');
                        if (visibleCards.length > 0) {
                            block.style.display = 'block';
                        } else {
                            block.style.display = 'none';
                        }
                    });
                }, 220);
            });
        });
    }

    // Sticky Navbar & Active Section Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Copy Email Helper
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function () {
            const email = 'setthuhan.Dev@outlook.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyEmailBtn.innerText;
                copyEmailBtn.innerText = '✓ Copied to Clipboard!';
                copyEmailBtn.classList.add('copied');
                setTimeout(() => {
                    copyEmailBtn.innerText = originalText;
                    copyEmailBtn.classList.remove('copied');
                }, 2200);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }
});
