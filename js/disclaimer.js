// Скрипт для обработки плашки с предупреждением о правах на контент
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли плашка на странице
    const disclaimer = document.querySelector('.content-disclaimer');
    
    if (disclaimer) {
        console.log('Disclaimer found:', disclaimer);
        
        // Устанавливаем стили напрямую
        disclaimer.style.display = 'block';
        disclaimer.style.visibility = 'visible';
        disclaimer.style.opacity = '1';
        
        // Добавляем класс для анимации
        setTimeout(() => {
            disclaimer.classList.add('active');
            console.log('Added active class to disclaimer');
        }, 500);
        
        // Проверяем, не скрыт ли элемент другими стилями
        const computedStyle = window.getComputedStyle(disclaimer);
        console.log('Disclaimer computed style - display:', computedStyle.display, 'visibility:', computedStyle.visibility, 'opacity:', computedStyle.opacity);
        
        // Если элемент скрыт, пробуем исправить
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
            console.log('Disclaimer is hidden, trying to fix...');
            
            // Создаем новый элемент и заменяем им старый
            const newDisclaimer = disclaimer.cloneNode(true);
            newDisclaimer.style.display = 'block';
            newDisclaimer.style.visibility = 'visible';
            newDisclaimer.style.opacity = '1';
            
            disclaimer.parentNode.replaceChild(newDisclaimer, disclaimer);
            console.log('Replaced disclaimer with new element');
        }
    } else {
        console.log('Disclaimer not found, creating it...');
        
        // Если плашка не найдена, создаем ее программно
        const rolesText = document.querySelector('.roles__text');
        
        if (rolesText) {
            const newDisclaimer = document.createElement('div');
            newDisclaimer.className = 'content-disclaimer';
            newDisclaimer.style.display = 'block';
            newDisclaimer.style.visibility = 'visible';
            newDisclaimer.style.opacity = '1';
            
            newDisclaimer.innerHTML = `
                <h4 class="content-disclaimer__title">
                    <i class="ph ph-info ph-md ph-animated"></i>
                    Important Notice on Content Rights
                </h4>
                <p class="content-disclaimer__text">
                    CryptoXpress reserves the right to use content created by ambassadors at its discretion. This includes, but is not limited to, publishing, editing, distributing, and promoting materials across all CryptoXpress platforms and channels without additional notification or compensation.
                </p>
            `;
            
            rolesText.parentNode.insertBefore(newDisclaimer, rolesText.nextSibling);
            console.log('Created new disclaimer element');
        }
    }
}); 