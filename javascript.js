document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a elementos ---
    const themeToggleCheckbox = document.getElementById('checkbox');
    const body = document.body;
    const languageToggleBtn = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentFlag = document.getElementById('currentFlag');
    const flagOptions = languageDropdown.querySelectorAll('.flag-icon');

    // ¡Mueve esta línea aquí!
    const header = document.querySelector('header'); // Obtener referencia al header una vez

    // --- Funcionalidad de Modo Claro/Oscuro ---
    const setMode = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggleCheckbox.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggleCheckbox.checked = false;
            localStorage.setItem('theme', 'light');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setMode(true);
    } else {
        setMode(false);
    }

    themeToggleCheckbox.addEventListener('change', () => {
        setMode(themeToggleCheckbox.checked);
    });

    // --- Funcionalidad de Cambio de Idioma ---
    const texts = {
        es: {
            aboutMeBtn: 'Sobre mí',
            projectsBtn: 'Mis proyectos',
            flagSrc: './img/Bandera_de_España.png',
            aboutMeContent: 'Soy una desarrolladora fullstack apasionada con experiencia en la creación de interfaces de usuario intuitivas y experiencias digitales robustas. Disfruto el proceso de transformar ideas complejas en soluciones funcionales y escalables, utilizando diferentes lenguajes para llevarlas a cabo. Constantemente busco aprender nuevas tecnologías y enfrento cada desafío de codificación con entusiasmo y una mentalidad orientada a la resolución de problemas.',
            titleAboutMe: 'Sobre Mi'
            
        },
        en: {
            aboutMeBtn: 'About me',
            projectsBtn: 'My projects',
            flagSrc: './img/Bandera_de_UK.png',
            aboutMeContent: 'I\'m a passionate full-stack developer with experience creating intuitive user interfaces and robust digital experiences. I enjoy the process of transforming complex ideas into functional and scalable solutions, utilizing different languages ​​to execute them. I\'m constantly seeking to learn new technologies and approach each coding challenge with enthusiasm and a problem-solving mindset.',
            titleAboutMe: 'About Me'
        }
    };

    let currentLang = localStorage.getItem('language') || 'es';
    document.documentElement.lang = currentLang;
    updateTexts(currentLang);

    // Event listener para el botón de toggle del idioma
    languageToggleBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    function updateTexts(lang) {
        document.getElementById('aboutMeBtn').textContent = texts[lang].aboutMeBtn;
        document.getElementById('projectsBtn').textContent = texts[lang].projectsBtn;
        currentFlag.src = texts[lang].flagSrc;

        document.getElementById('aboutMeContent').textContent = texts[lang].aboutMeContent;
        document.getElementById('titleAboutMe').textContent = texts[lang].titleAboutMe;

    }

    // Cierra el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!languageDropdown.contains(event.target) && !languageToggleBtn.contains(event.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // Event listeners para las opciones de bandera dentro del dropdown
    flagOptions.forEach(flag => {
        flag.addEventListener('click', () => {
            const selectedLang = flag.dataset.lang;
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('language', currentLang);
                document.documentElement.lang = currentLang;
                updateTexts(currentLang);
            }
            languageDropdown.classList.remove('show');
        });
    });

    // --- Funcionalidad de Scroll Suave ---
const navButtons = document.querySelectorAll('.botones button[data-target]');

    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = event.currentTarget.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                console.log('--- Scroll Depuración ---');
                console.log('Sección de destino:', targetSection);
                console.log('ID de destino:', targetId);

                const headerHeight = header.offsetHeight; // Altura total de tu header (624px)
                console.log('Altura del Header (headerHeight):', headerHeight);

                const rect = targetSection.getBoundingClientRect();
                console.log('Rect de la sección (getBoundingClientRect):', rect);
                const elementPosition = rect.top + window.pageYOffset;
                console.log('Posición absoluta de la sección (elementPosition):', elementPosition);
               
                const navHeight = document.querySelector('header nav').offsetHeight;
                console.log('Altura de la barra de navegación (navHeight):', navHeight);


                let offsetAdjustment = 0;

                
                const sectionMarginTop = 80; 

                const paddingAboveContent = 20; 
             
                const offsetPosition = elementPosition - navHeight - sectionMarginTop + paddingAboveContent;

                console.log('Offset de la barra de navegación:', navHeight);
                console.log('Margen superior de la sección:', sectionMarginTop);
                console.log('Padding extra sobre el contenido:', paddingAboveContent);
                console.log('Posición de scroll calculada (offsetPosition - ajustada):', offsetPosition);


                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }

            languageDropdown.classList.remove('show');
        });
    });
});