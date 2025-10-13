// Переменные игры
let secretNumber;
let attempts;
const maxAttempts = 10;
let previousGuesses = [];

// Элементы DOM
const outputDiv = document.getElementById('output');
const attemptsDiv = document.getElementById('attempts');
const inputField = document.getElementById('userInput');
const submitButton = document.getElementById('submitBtn');
const newGameButton = document.getElementById('newGameBtn');
const imageContainer = document.getElementById('imageContainer');

// Звуковые эффекты
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Картинки для разных попыток (добавьте этот массив!)
const attemptImages = [
    'кот1.jpeg',
    'кот2.jpg',
    'кит3.jpg',
    'кит4.jpg',
    'кит5.jpg',
    'кит6.jpg',
    'кит7.jpg',
    'кит8.jpg',
    'кит9.jpg',
    'кит10.jpg'
];

// Инициализация игры
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    previousGuesses = [];
    outputDiv.textContent = '';
    attemptsDiv.textContent = '';
    imageContainer.innerHTML = '';
    inputField.value = '';
    inputField.disabled = false;
    submitButton.disabled = false;
    
    console.log('Загаданное число:', secretNumber); // Для отладки
}

// Функция для угадывания числа
function guess() {
    const userInput = parseInt(inputField.value);
    
    // Проверка введенного числа
    if (isNaN(userInput) || userInput < 1 || userInput > 100) {
        outputDiv.textContent = "Пожалуйста, введите число от 1 до 100.";
        return;
    }
    
    // Проверка на повторяющиеся числа
    if (previousGuesses.includes(userInput)) {
        outputDiv.textContent = "Вы уже вводили это число. Попробуйте другое.";
        wrongSound.play();
        inputField.value = '';
        return;
    }
    
    attempts++;
    previousGuesses.push(userInput);
    
      // Показываем картинку для текущей попытки (с обработкой ошибок)
    showAttemptImage();
    
    if (userInput === secretNumber) {
        outputDiv.textContent = `Поздравляю! Вы угадали число ${secretNumber} за ${attempts} ${attempts === 1 ? "попытку" : "попытки"}.`;
        if (winSound) winSound.play();
        endGame();
    } else if (userInput < secretNumber) {
        outputDiv.textContent = "Ваше число меньше загаданного.";
    } else {
        outputDiv.textContent = "Ваше число больше загаданного.";
    }
    
    // Обновляем количество оставшихся попыток
    const remainingAttempts = maxAttempts - attempts;
    attemptsDiv.textContent = `Оставшиеся попытки: ${remainingAttempts}. Ваши попытки: ${previousGuesses.join(', ')}`;
    
    // Проверяем, исчерпаны ли попытки
    if (attempts === maxAttempts && userInput !== secretNumber) {
        outputDiv.textContent = `Извините, вы использовали все ${maxAttempts} попыток. Загаданное число было ${secretNumber}.`;
        if (loseSound) loseSound.play();
        endGame();
    }
    
    inputField.value = '';
}

// Функция для показа картинки попытки
function showAttemptImage() {
    const imageIndex = Math.min(attempts - 1, attemptImages.length - 1);
    imageContainer.innerHTML = `<img src="${attemptImages[imageIndex]}" alt="Попытка ${attempts}">`;
}

// Функция завершения игры
function endGame() {
    inputField.disabled = true;
    submitButton.disabled = true;
}

// Обработчики событий
submitButton.addEventListener('click', guess);
newGameButton.addEventListener('click', initGame);

// Обработчик нажатия Enter в поле ввода
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        guess();
    }
});

// Инициализация игры при загрузке страницы
window.onload = initGame;