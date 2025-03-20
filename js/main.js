// Навигационное меню
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Изменение иконки
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('ph-list')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }
    
    // Плавная прокрутка для навигационных ссылок
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрыть мобильное меню при клике на ссылку
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('ph-x');
                navToggle.querySelector('i').classList.add('ph-list');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Учитываем высоту фиксированного меню
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение стиля навигации при прокрутке
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Переключение темной темы
    const themeToggle = document.querySelector('.theme-toggle__button');
    
    // Проверяем сохраненные настройки темы
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-theme');
        updateHeaderBackground();
    }
    
    // Обработчик клика по переключателю темы
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-theme');
            
            // Сохраняем выбор пользователя
            if (document.documentElement.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // Обновляем стиль шапки
            updateHeaderBackground();
        });
    }
    
    // Функция для обновления стиля шапки в зависимости от темы
    function updateHeaderBackground() {
        if (document.documentElement.classList.contains('dark-theme')) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                header.style.backgroundColor = 'rgba(30, 86, 160, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                header.style.backgroundColor = 'rgba(30, 86, 160, 0.95)';
            }
        } else {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
    
    // Обновляем стиль шапки при прокрутке с учетом темы
    window.addEventListener('scroll', updateHeaderBackground);

    // Функция для установки темной темы по умолчанию
    function setDarkThemeAsDefault() {
        const root = document.documentElement;
        const savedTheme = localStorage.getItem('theme');
        
        // Если тема еще не сохранена в localStorage, устанавливаем темную тему
        if (!savedTheme) {
            root.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Если тема уже была сохранена, используем её
            if (savedTheme === 'dark') {
                root.classList.add('dark-theme');
            }
        }
    }

    // Вызываем функцию при загрузке страницы
    setDarkThemeAsDefault();

    // Добавляем обработчик для отображения плашки с предупреждением
    // Проверяем, существует ли плашка на странице
    const disclaimer = document.querySelector('.content-disclaimer');
    if (disclaimer) {
        // Убедимся, что плашка видима
        disclaimer.style.display = 'block';
        disclaimer.style.opacity = '1';
        disclaimer.style.visibility = 'visible';
        
        // Добавляем класс для анимации появления
        setTimeout(() => {
            disclaimer.classList.add('active');
        }, 500);
    }
}); 