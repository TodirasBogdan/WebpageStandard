document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    const navButton = document.getElementById('navButton');
    const bottomNav = document.getElementById('bottomNav');

    function setActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const correspondingLink = navLinks[index];

            if (index === sections.length - 2 && scrollPosition >= sectionTop) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }

            if (index === sections.length - 1 && scrollPosition >= sectionTop + sectionHeight - 50) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }

            if (index < sections.length - 2 && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        });
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
        navButton.setAttribute('aria-expanded', bottomNav.classList.contains('visible'));
        const topNavbar = document.querySelector('.top-navbar');
        topNavbar.classList.toggle('hidden', bottomNav.classList.contains('visible'));
    });

    setActiveLink();
});
