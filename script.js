// Плавная прокрутка при клике на кнопку "Погрузиться"
document.querySelector('.hero .btn').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

// подсвечивание ссылок
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

// функция, которая определяет активную секцию
function setActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 200; // добавляем запас в 200px, чтобы секция подсвечивалась ЧУТЬ раньше

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        // Если scrollPosition находится внутри диапазона секции
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    // Если ни одна секция не определена (например, в самом низу сайта) – подсветим "Контакты"
    if (!current && (window.scrollY + window.innerHeight) >= document.body.scrollHeight - 100) {
        current = 'contacts';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// запускаем функцию при загрузке страницы и при скролле
window.addEventListener('load', setActiveLink);
window.addEventListener('scroll', setActiveLink);



// Модальные окна
const detailsBtns = document.querySelectorAll('.card-btn');

// Находим сами модальные окна
const modalTea = document.getElementById('modal-tea');
const modalBubble = document.getElementById('modal-bubble');
const modalVoucher = document.getElementById('modal-voucher');

// Соответствие: какая кнопка открывает какое модальное окно
detailsBtns[0].addEventListener('click', () => modalTea.style.display = 'flex');
detailsBtns[1].addEventListener('click', () => modalBubble.style.display = 'flex');
detailsBtns[2].addEventListener('click', () => modalVoucher.style.display = 'flex');

// Функция закрытия для всех окон
function closeModals() {
    modalTea.style.display = 'none';
    modalBubble.style.display = 'none';
    modalVoucher.style.display = 'none';
}

// Добавляем событие на крестики закрытия
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', closeModals);
});

// Закрытие при клике вне модального окна
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModals();
    }
});

// Обработка отправки формы с тост-уведомлением
const form = document.getElementById('feedbackForm');
const toastModal = document.getElementById('toastModal');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Показать модальное окно-уведомление
    toastModal.style.display = 'flex';

    // Скрыть через 2.5 секунды
    setTimeout(() => {
        toastModal.style.display = 'none';
    }, 2500);

    // Очистить форму
    form.reset();
});

// Закрытие по клику вне окна (опционально)
toastModal.addEventListener('click', function(event) {
    if (event.target === toastModal) {
        toastModal.style.display = 'none';
    }
});