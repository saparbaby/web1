document.addEventListener("DOMContentLoaded", function () {
  
  // === 1. Рейтинг (звёздочки) ===
  const modalStars = document.querySelectorAll(".modal-star");
    const submitRatingBtn = document.getElementById("submitRating");
    const rateUsBtn = document.getElementById("rateUsBtn");
    const rateModal = document.getElementById("rateModal");
    const closeModal = document.querySelector(".modal .close");
    const submitSound = new Audio("click-sound.mp3"); // Путь к звуку для отправки рейтинга

    if (modalStars.length && submitRatingBtn && rateUsBtn && rateModal) {
        let selectedRating = 0;

        // Анимация для звезд в модальном окне
        modalStars.forEach((star, index) => {
            star.addEventListener("mouseover", () => {
                modalStars.forEach(s => s.classList.remove("selected"));
                for (let i = 0; i <= index; i++) {
                    modalStars[i].style.color = "orange";
                    modalStars[i].style.transform = "scale(1.2)";
                }
            });

            star.addEventListener("mouseout", () => {
                modalStars.forEach(s => {
                    s.style.color = selectedRating > 0 ? "gold" : "gray";
                    s.style.transform = "scale(1)";
                });
            });

            star.addEventListener("click", () => {
                modalStars.forEach(s => s.classList.remove("selected"));
                for (let i = 0; i <= index; i++) {
                    modalStars[i].classList.add("selected");
                    modalStars[i].style.color = "gold";
                    modalStars[i].style.transform = "scale(1.2)";
                }
                selectedRating = index + 1;
            });
        });

        // Отправка рейтинга
        submitRatingBtn.addEventListener("click", () => {
            if (selectedRating === 0) {
                console.error("Please select a rating before submitting."); // Отображение ошибки в консоли
            } else {
                console.log("Рейтинг отправлен:", selectedRating);
                submitSound.play(); // Проигрывание звука после нажатия Submit Rating
                rateModal.style.display = "none"; // Закрытие модального окна
            }
        });

        // Открытие модального окна при нажатии "Rate Us"
        rateUsBtn.addEventListener("click", () => {
            rateModal.style.display = "flex"; // Показать модальное окно
        });

        // Закрытие модального окна при клике на "X"
        closeModal.addEventListener("click", () => {
            rateModal.style.display = "none"; // Скрыть модальное окно
        });

        // Закрытие модального окна при клике вне окна
        window.addEventListener("click", (event) => {
            if (event.target === rateModal) {
                rateModal.style.display = "none"; // Скрыть модальное окно
            }
        });
    }

  


  // === 2. Кнопка Order Now (скролл к секции Place Order) ===
  const orderNowBtn = document.querySelector(".btn-warning");
  const orderSection = document.getElementById("order");

  if (orderNowBtn && orderSection) {
    orderNowBtn.addEventListener("click", () => {
      orderSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // === 3. Кнопка Change Background Color ===
  const changeColorBtn = document.getElementById("changeColorBtn");

  if (changeColorBtn) {
    changeColorBtn.addEventListener("click", () => {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      document.body.style.backgroundColor = randomColor;
      console.log("Background color changed to:", randomColor);
    });
  }

  // === 4. Модальное окно подписки ===
  const subscribeBtn = document.getElementById("subscribeBtn");
  const popupForm = document.getElementById("popupForm");
  if (popupForm) {
    popupForm.style.display = "none";
    if (subscribeBtn) {
      subscribeBtn.addEventListener("click", function () {
        popupForm.style.display = "flex";
      });
    }
  }

  // Закрытие модального окна при клике вне его
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });

  // === 5. Подписка (валидация формы) ===
  const subscribeSubmitBtn = document.getElementById("subscribeSubmit");
  if (subscribeSubmitBtn) {
    subscribeSubmitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const email = document.getElementById("popupEmail").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
      } else {
        alert("Subscription successful! Thank you for subscribing.");
        document.getElementById("subscribeForm").reset();
        popupForm.style.display = "none";
      }
    });
  }

  // === 6. Валидация Place Order ===
  const form = document.getElementById("orderForm");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const progressBar = document.getElementById("progressBar");
  const progress = progressBar.querySelector(".progress");
  const progressText = progressBar.querySelector(".progress-text");

  const steps = [
    { message: "Validating...", percentage: 25 },
    { message: "Processing...", percentage: 50 },
    { message: "Finalizing...", percentage: 75 },
    { message: "Order Complete!", percentage: 100 },
  ];

  if (form && placeOrderBtn && progressBar && progress && progressText) {
    placeOrderBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Отключаем стандартное поведение формы

      if (form.checkValidity()) {
        // Показать прогресс-бар
        progressBar.style.display = "flex";
        progressBar.style.opacity = "1"; // Плавное появление
        progress.style.width = "0%"; // Начальное состояние
        progressText.textContent = "0%";

        // Имитируем загрузку этапов
        steps.forEach((step, index) => {
          setTimeout(() => {
            progress.style.width = `${step.percentage}%`;
            progressText.textContent = step.message;

            // На последнем этапе скрыть прогресс-бар
            if (step.percentage === 100) {
              setTimeout(() => {
                progressBar.style.opacity = "0"; // Плавное исчезновение
                setTimeout(() => {
                  progressBar.style.display = "none"; // Полное скрытие
                  form.reset(); // Сброс формы
                  console.log("Order placed successfully!");
                }, 500); // Подождать пока исчезнет
              }, 1000); // Держим финальный текст на экране 1 секунду
            }
          }, index * 1000); // Задержка в зависимости от этапа
        });
      } else {
        // Если форма не валидна, показать встроенные подсказки
        form.reportValidity();
      }
    });
  }
  

  if (form && placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Отключаем стандартное поведение формы

      // Поля формы
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const dombraType = document.getElementById("dombra-type");
      const comments = document.getElementById("comments");

      // Очистка предыдущих ошибок
      clearValidation(name);
      clearValidation(email);
      clearValidation(dombraType);
      clearValidation(comments);

      // Проверка полей
      let isValid = true;

      if (!name.value.trim() || name.value.trim().length < 3) {
        isValid = false;
        showValidation(name, "Name must be at least 3 characters long.");
      }

      if (!email.value.trim() || !validateEmail(email.value)) {
        isValid = false;
        showValidation(email, "Please enter a valid email address.");
      }

      if (!dombraType.value) {
        isValid = false;
        showValidation(dombraType, "Please select a Dombra type.");
      }

      if (!comments.value.trim()) {
        isValid = false;
        showValidation(comments, "Please provide some details about your order.");
      }

      if (isValid) {
        console.log("Order placed successfully!");
        form.reset(); // Сброс формы после успешной отправки
      }
    });

    // Функция показа сообщения об ошибке
    function showValidation(input, message) {
      const feedback = input.nextElementSibling;
      if (feedback) {
        feedback.textContent = message;
        feedback.style.display = "block";
      }
      input.classList.add("is-invalid");
    }

    // Функция очистки сообщений об ошибке
    function clearValidation(input) {
      const feedback = input.nextElementSibling;
      if (feedback) {
        feedback.textContent = "";
        feedback.style.display = "none";
      }
      input.classList.remove("is-invalid");
    }

    // Функция проверки email
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  
  // === 7. Смена темы ===
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle?.querySelector("i");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      icon?.classList.replace("fa-moon", "fa-sun");
    } else {
      document.body.classList.remove("dark-mode");
      icon?.classList.replace("fa-sun", "fa-moon");
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    const themeToSave = isDarkMode ? "dark" : "light";
    icon?.classList.toggle("fa-sun", isDarkMode);
    icon?.classList.toggle("fa-moon", !isDarkMode);
    localStorage.setItem("theme", themeToSave);
  });
  const buttons = document.querySelectorAll("button, .btn");

  // Добавить эффект нажатия на кнопки
  buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
      button.style.transition = "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease";
      button.style.transform = "scale(1.1)"; // Увеличение при наведении
    });

    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)"; // Возврат к нормальному размеру
    });

    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)"; // Уменьшение при клике
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "scale(1.1)"; // Возврат к увеличению после клика
    });
  });



});
