// Элементы игры
const screens = {
    main: document.getElementById("main-screen"),
    flower: document.getElementById("flower-game"),
    balloon: document.getElementById("balloon-game"),
    final: document.getElementById("final-screen"),
    photo1: document.getElementById("photo-screen-1"),
    photo2: document.getElementById("photo-screen-2"),
    photo3: document.getElementById("photo-screen-3"),
    heart: document.getElementById("heart-game"),
    gift: document.getElementById("gift-game"),
    gallery: document.getElementById("gallery-screen")
};

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const musicControl = document.querySelector(".music-control");

let flowersCollected = 0;
let balloonsPopped = 0;
let heartsCollected = 0;
let giftsFound = 0;

// Фоновая музыка
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.1;

// Запускаем музыку при первом взаимодействии
document.body.addEventListener('click', () => {
    bgMusic.play().catch(e => console.log("Автовоспроизведение заблокировано"));
}, { once: true });


// Начало игры
startBtn.addEventListener("click", () => {
    screens.main.classList.add("hidden");
    screens.flower.classList.remove("hidden");
    createFlowers();
});

// Функция показа сообщений
function showMessage(text) {
    const popup = document.querySelector('.message-popup');
    const messageText = document.getElementById('message-text');
    
    messageText.innerHTML = text;
    popup.classList.remove('hidden');
    
    document.querySelector('.close-message').onclick = () => {
        popup.classList.add('hidden');
    };
    
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}

// Игра 1: Сбор цветов
function createFlowers() {
    const flowerBed = document.querySelector(".flower-bed");
    flowerBed.innerHTML = "";
    flowersCollected = 0;
    document.getElementById("flower-counter").textContent = `Собрано: 0/5`;

    const compliments = [
        "Ты прекрасна! 💖",
        "Ты умница! 🌸",
        "Ты сильная! 🌼",
        "Я тебя сильно сильно люблю! 🌺",
        "Ты заслуживаешь всего самого лучшего! 🌷",
    ];

    for (let i = 0; i < 5; i++) {
        const flower = document.createElement("div");
        flower.className = "flower";
        flower.addEventListener("click", () => {
            if (flower.style.opacity !== "0.5") {
                showMessage(compliments[i]);
                flower.style.opacity = "0.5";
                flower.style.pointerEvents = "none";
                flowersCollected++;
                document.getElementById("flower-counter").textContent = `Собрано: ${flowersCollected}/5`;

                if (flowersCollected === 5) {
                    setTimeout(() => {
                        screens.flower.classList.add("hidden");
                        screens.photo1.classList.remove("hidden");
                    }, 3000);
                }
            }
        });
        flowerBed.appendChild(flower);
    }
}

// Игра 2: Собери сердечки
function initHeartGame() {
    const heartContainer = document.querySelector(".heart-container");
    heartContainer.innerHTML = "";
    heartsCollected = 0;
    document.getElementById("heart-counter").textContent = `Собрано: 0/15`;

    // Добавляем украшения фона
    for (let i = 0; i < 20; i++) {
        const decoration = document.createElement("div");
        decoration.className = "heart-decoration";
        decoration.style.left = Math.random() * 100 + '%';
        decoration.style.top = Math.random() * 100 + '%';
        decoration.style.width = (Math.random() * 40 + 20) + 'px';
        decoration.style.height = decoration.style.width;
        decoration.style.animationDuration = (Math.random() * 20 + 10) + 's';
        decoration.style.animationDelay = (Math.random() * -20) + 's';
        decoration.style.opacity = Math.random() * 0.4 + 0.2;
        heartContainer.appendChild(decoration);
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * 90 + '%';
        heart.style.top = Math.random() * 90 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
        heart.style.animationDelay = (Math.random() * -2) + 's';
        
        heart.addEventListener("click", function() {
            if (!this.dataset.collected) {
                this.dataset.collected = "true";
                this.classList.add("heart-collected");
                
                // Эффект при сборе
                const particles = document.createElement("div");
                particles.className = "heart-particles";
                this.appendChild(particles);
                
                setTimeout(() => {
                    this.remove();
                }, 800);
                
                heartsCollected++;
                document.getElementById("heart-counter").textContent = `Собрано: ${heartsCollected}/15`;
                
                if (heartsCollected >= 15) {
                    showMessage("Опа, а я тебя люблю 💘");
                    setTimeout(() => {
                        document.querySelector('[data-next="balloon-game"]').click();
                    }, 4000);
                }
            }
        });
        
        heartContainer.appendChild(heart);
    }
    
    // Создаём 15 сердечек с задержкой
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 1000);
    }
}

// Игра 3: Лопание шариков
function createBalloons() {
    const balloonsContainer = document.querySelector(".balloons-container");
    balloonsContainer.innerHTML = "";
    balloonsPopped = 0;

    const predictions = [
        "Тебя ждет Аризона! ⚡",
        "Вся коллекция пэтшопоф! 🐶🐱",
        "Исполнение всех желаний! 🌟",
        "Изи сдача всех экзаменов! 📌",
        "Самый лучший год! 2️⃣0️⃣2️⃣5️⃣",
    ];

    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.addEventListener("click", () => {
            if (!balloon.dataset.popped) {
                showMessage(predictions[i]);
                balloon.style.transform = "scale(0)";
                balloon.dataset.popped = "true";
                balloonsPopped++;

                if (balloonsPopped === 5) {
                    setTimeout(() => {
                        screens.balloon.classList.add("hidden");
                        screens.photo2.classList.remove("hidden");
                    }, 2500);
                }
            }
        });
        balloonsContainer.appendChild(balloon);
    }
}

// Игра 4: Найди подарки
function initGiftGame() {
    const giftScene = document.querySelector(".gift-scene");
    giftScene.innerHTML = "";
    giftsFound = 0;
    document.getElementById("gift-counter").textContent = `Найдено: 0/3`;

    const giftMessages = [
        "Ты заслуживаешь всего самого лучшего! 💝",
        "Скоро тебя ждёт приятный сюрприз! 🎀",
        "Ты – самая особенная! 💖"
    ];

    const positions = [
        { top: "20%", left: "15%" },
        { top: "60%", left: "70%" },
        { top: "40%", left: "40%" },
    ];

    // Добавляем украшения фона
    for (let i = 0; i < 15; i++) {
        const decoration = document.createElement("div");
        decoration.className = "gift-decoration";
        decoration.style.left = Math.random() * 100 + '%';
        decoration.style.top = Math.random() * 100 + '%';
        decoration.style.width = (Math.random() * 30 + 10) + 'px';
        decoration.style.height = decoration.style.width;
        decoration.style.animationDelay = (Math.random() * 5) + 's';
        decoration.style.opacity = Math.random() * 0.3 + 0.1;
        giftScene.appendChild(decoration);
    }

    positions.forEach((pos, index) => {
        const gift = document.createElement("div");
        gift.className = "gift";
        gift.style.top = pos.top;
        gift.style.left = pos.left;
        gift.dataset.message = giftMessages[index];
        gift.style.animationDelay = `${index * 0.5}s`;
        
        gift.addEventListener("click", function() {
            if (!this.dataset.found) {
                this.dataset.found = "true";
                
                // Анимация исчезновения
                this.classList.add("gift-found");
                
                // Эффект блесток
                const sparkles = document.createElement("div");
                sparkles.className = "gift-sparkles";
                this.appendChild(sparkles);
                
                // Удаляем подарок после анимации
                setTimeout(() => {
                    this.remove();
                }, 800);
                
                showMessage(giftMessages[index]);
                giftsFound++;
                document.getElementById("gift-counter").textContent = `Найдено: ${giftsFound}/3`;
                shootConfetti();
                
                if (giftsFound >= 3) {
                    setTimeout(() => {
                        showMessage("Ты нашла все подарки! Давай дальше 🎁");
                        document.querySelector('[data-next="gallery-screen"]').click();
                    }, 2000);
                }
            }
        });
        
        giftScene.appendChild(gift);
    });
}

// Галерея
function initGallery() {
    const slides = document.querySelectorAll(".gallery-slide");
    const prevBtn = document.querySelector(".gallery-prev");
    const nextBtn = document.querySelector(".gallery-next");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    showSlide(0);
}

// Создаем птичек
function createBirds() {
    const birdsContainer = document.createElement('div');
    birdsContainer.className = 'birds-container';
    document.body.appendChild(birdsContainer);

    // Количество птичек
    const birdCount = 10;
    
    for (let i = 0; i < birdCount; i++) {
        setTimeout(() => {
            const bird = document.createElement('div');
            bird.className = 'bird';
            
            // Случайные параметры для каждой птички
            const randomY = Math.random() * 80 + 5; // 5-85% по вертикали
            const randomScale = Math.random() * 1.7 + 0.3; // 0.3-1.0 масштаб
            const randomDuration = Math.random() * 30 + 30; // 30-60 секунд
            const randomDelay = Math.random() * -30; // -30-0 секунд
            const randomDy = (Math.random() - 0.5) * 100; // -50px до +50px изменение по Y
            
            bird.style.setProperty('--random-y', `${randomY}%`);
            bird.style.setProperty('--random-scale', randomScale);
            bird.style.setProperty('--random-dy', `${randomDy}px`);
            bird.style.animationDuration = `${randomDuration}s`;
            bird.style.animationDelay = `${randomDelay}s`;
            
            birdsContainer.appendChild(bird);
        }, i * 1000); // Появление птичек с задержкой
    }
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', createBirds);


// Кнопки "Дальше"
document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const nextScreen = btn.dataset.next;
        document.getElementById(nextScreen).classList.remove("hidden");
        btn.closest(".screen").classList.add("hidden");

       if (nextScreen === "heart-game") initHeartGame();
        if (nextScreen === "balloon-game") createBalloons();
        if (nextScreen === "gift-game") initGiftGame();
        if (nextScreen === "gallery-screen") initGallery();
    });
});

// Рестарт игры
restartBtn.addEventListener("click", () => {
    screens.final.classList.add("hidden");
    screens.main.classList.remove("hidden");
    flowersCollected = 0;
    balloonsPopped = 0;
    heartsCollected = 0;
    giftsFound = 0;
});

// Оптимизация для мобильных устройств
function optimizeForMobile() {
    // Уменьшаем количество частиц для слабых устройств
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Уменьшаем количество элементов
        const config = {
            hearts: 10,
            birds: 6,
            confettiParticles: 50
        };
        
        // Оптимизируем анимации
        document.documentElement.style.setProperty('--animation-slow', '1s');
        
        return config;
    }
    return null;
}

// Использование:
const mobileConfig = optimizeForMobile();

const CACHE_NAME = 'ilona-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/photos/ilona.jpg',
  '/music/happy-birthday.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});


