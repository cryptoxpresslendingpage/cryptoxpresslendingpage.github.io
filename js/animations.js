// Функция для анимации при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки, находится ли элемент в видимой области
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Функция для анимации элементов при прокрутке
    function checkReveal() {
        // Анимация для элементов с классом .reveal
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => {
            if (isInViewport(reveal)) {
                reveal.classList.add('active');
            }
        });

        // Анимация для иконок в карточках ролей
        const iconWrappers = document.querySelectorAll('.role-card__icon-wrapper');
        iconWrappers.forEach((iconWrapper, cardIndex) => {
            if (isInViewport(iconWrapper)) {
                // Добавляем класс для анимации иконки
                iconWrapper.classList.add('icon-animated');
                
                // Анимируем пути SVG
                const paths = iconWrapper.querySelectorAll('path, circle');
                paths.forEach((path, index) => {
                    // Разные задержки для разных карточек
                    let delay = index * 0.1;
                    
                    // Для третьей карточки (Architect) добавляем специальную анимацию
                    if (cardIndex === 2) {
                        // Первый путь - основная форма
                        if (index === 0) {
                            path.style.animation = `iconPathReveal 0.8s ease forwards ${delay}s`;
                        } 
                        // Второй путь - внутренние линии
                        else if (index === 1) {
                            path.style.animation = `iconFadeIn 0.8s ease forwards ${delay + 0.3}s`;
                        }
                    } else {
                        path.style.animation = `iconPathReveal 0.8s ease forwards ${delay}s`;
                    }
                });
            }
        });
        
        // Анимация для иконок в разделе Progression System
        const progressionIcons = document.querySelectorAll('.progression__icon');
        progressionIcons.forEach((icon, iconIndex) => {
            if (isInViewport(icon)) {
                // Добавляем класс для анимации иконки
                icon.classList.add('icon-animated');
                
                // Анимируем пути SVG
                const paths = icon.querySelectorAll('path');
                paths.forEach((path, pathIndex) => {
                    // Разные задержки для разных иконок
                    let delay = pathIndex * 0.15;
                    
                    // Для первой иконки (Promotions) - специальная анимация
                    if (iconIndex === 0) {
                        path.style.animation = `progressionIconReveal 0.8s ease forwards ${delay}s`;
                    } else {
                        path.style.animation = `iconPathReveal 0.8s ease forwards ${delay}s`;
                    }
                });
            }
        });
    }

    // Проверяем при загрузке страницы
    checkReveal();

    // Проверяем при прокрутке
    window.addEventListener('scroll', checkReveal);
    
    // 3D-эффект для логотипа
    const logo = document.querySelector('.hero__logo img');
    const logoContainer = document.querySelector('.hero__logo');
    
    if (logo && logoContainer) {
        // Отключаем все анимации
        logo.style.animation = 'none';
        
        // Добавляем 3D-эффект при движении мыши
        logoContainer.addEventListener('mousemove', function(e) {
            const rect = logoContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // X позиция мыши внутри контейнера
            const y = e.clientY - rect.top; // Y позиция мыши внутри контейнера
            
            // Вычисляем поворот в зависимости от положения мыши
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Максимальный угол поворота (в градусах)
            const maxRotation = 15;
            
            // Вычисляем угол поворота
            const xRotation = ((y - centerY) / centerY) * -maxRotation;
            const yRotation = ((x - centerX) / centerX) * maxRotation;
            
            // Применяем трансформацию
            logo.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            
            // Добавляем тень в зависимости от положения мыши
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            const shadowBlur = Math.abs(shadowX) + Math.abs(shadowY) + 20;
            
            logo.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(24, 68, 141, 0.3))`;
        });
        
        // Возвращаем логотип в исходное положение при уходе мыши
        logoContainer.addEventListener('mouseleave', function() {
            logo.style.transform = 'none';
            logo.style.filter = 'drop-shadow(0 10px 20px rgba(24, 68, 141, 0.2))';
        });
    }

    // Добавляем обработчик для анимации плашки с предупреждением
    const disclaimer = document.querySelector('.content-disclaimer');
    if (disclaimer) {
        // Добавляем класс для анимации появления
        disclaimer.classList.add('reveal');
        
        // Наблюдатель для анимации при прокрутке
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(disclaimer);
    }
}); 