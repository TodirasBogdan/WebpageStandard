document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    const navButton = document.getElementById('navButton');
    const bottomNav = document.getElementById('bottomNav');

    function setActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const bottomNavLinks = document.querySelectorAll('#bottomNav a');

        let maxVisibleHeight = 0;
        let mostVisibleSectionIndex = 0;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                mostVisibleSectionIndex = index;
            }
        });

        const secondToLastSection = sections[sections.length - 2];
        const lastSection = sections[sections.length - 1];
        const secondToLastTop = secondToLastSection.offsetTop;
        const lastSectionTop = lastSection.offsetTop;
        const lastSectionHeight = lastSection.clientHeight;

        navLinks.forEach(link => link.classList.remove('active'));

        if (scrollPosition >= lastSectionTop + lastSectionHeight - 50) {
            navLinks[sections.length - 1].classList.add('active');
        } else if (scrollPosition >= secondToLastTop && mostVisibleSectionIndex >= sections.length - 2) {
            navLinks[sections.length - 2].classList.add('active');
        } else {
            if (mostVisibleSectionIndex < sections.length - 2) {
                navLinks[mostVisibleSectionIndex].classList.add('active');
            }
        }

        if (window.innerWidth <= 768) {
            bottomNavLinks.forEach(link => link.classList.remove('active'));
            bottomNavLinks[mostVisibleSectionIndex].classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveLink);

    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuButton.textContent = sidebar.classList.contains('active') ? '×' : '☰';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                menuButton.textContent = '☰';
            }

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                setActiveLink();
            }, 500);

            bottomNav.classList.remove('visible');
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuButton.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuButton.textContent = '☰';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && bottomNav.classList.contains('visible')) {
            bottomNav.classList.remove('visible');
            navButton.setAttribute('aria-expanded', 'false');
        }
    });

    navButton.addEventListener('click', () => {
        bottomNav.classList.toggle('visible');
        navButton.classList.toggle('open');
        navButton.setAttribute('aria-expanded', bottomNav.classList.contains('visible'));
    });

    document.addEventListener('scroll', () => {
        if (bottomNav.classList.contains('visible')) {
            bottomNav.classList.remove('visible');
            navButton.classList.remove('open');
            navButton.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (e) => {
        if (bottomNav.classList.contains('visible') && 
            !bottomNav.contains(e.target) && 
            !navButton.contains(e.target)) {
            bottomNav.classList.remove('visible');
            navButton.classList.remove('open');
            navButton.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('touchstart', (e) => {
        if (bottomNav.classList.contains('visible') && 
            !bottomNav.contains(e.target) && 
            !navButton.contains(e.target)) {
            bottomNav.classList.remove('visible');
            navButton.classList.remove('open');
            navButton.setAttribute('aria-expanded', 'false');
        }
    });

    const bottomNavLinks = document.querySelectorAll('#bottomNav a');
    
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            bottomNav.classList.remove('visible');
            navButton.classList.remove('open');
            navButton.setAttribute('aria-expanded', 'false');

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });


            setTimeout(() => {
                setActiveLink();
            }, 500);
        });
    });

    setActiveLink();
});
