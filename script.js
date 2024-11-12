document.addEventListener("DOMContentLoaded", function () {
  const currentUserEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // === 1. Рейтинг (звёздочки) ===
  const modalStars = document.querySelectorAll(".modal-star");
  const submitRatingBtn = document.getElementById("submitRating");
  const rateUsBtn = document.getElementById("rateUsBtn");
  const rateModal = document.getElementById("rateModal");
  const closeModal = document.querySelector(".modal .close");
  const submitSound = new Audio("click-sound.mp3");

  if (modalStars.length && submitRatingBtn && rateUsBtn && rateModal) {
    let selectedRating = 0;

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

        // Сохранение рейтинга для текущего пользователя
        if (currentUserEmail && users[currentUserEmail]) {
          users[currentUserEmail].rate = selectedRating;
          localStorage.setItem("users", JSON.stringify(users));
        }
      });
    });

    submitRatingBtn.addEventListener("click", () => {
      if (selectedRating === 0) {
        alert("Please select a rating before submitting.");
      } else {
        alert("Thank you for your feedback!");
        submitSound.play();
        rateModal.style.display = "none";
      }
    });

    rateUsBtn.addEventListener("click", () => {
      // Загрузка сохранённого рейтинга (если есть)
      if (currentUserEmail && users[currentUserEmail] && users[currentUserEmail].rate) {
        selectedRating = users[currentUserEmail].rate;
        modalStars.forEach((s, index) => {
          s.classList.toggle("selected", index < selectedRating);
          s.style.color = index < selectedRating ? "gold" : "gray";
        });
      }
      rateModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
      rateModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === rateModal) {
        rateModal.style.display = "none";
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

  // === 4. Логика фильтра выбора ===
  const catalogFilter = document.getElementById("catalogFilter");

  if (catalogFilter) {
    // Восстановление фильтра для авторизованного пользователя
    if (currentUserEmail && users[currentUserEmail]) {
      const savedFilter = users[currentUserEmail].filter || "all";
      catalogFilter.value = savedFilter;
      applyCatalogFilter(savedFilter);
    }

    // Сохранение фильтра при изменении
    catalogFilter.addEventListener("change", function () {
      const selectedFilter = catalogFilter.value;

      if (currentUserEmail && users[currentUserEmail]) {
        users[currentUserEmail].filter = selectedFilter;
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Применяем фильтр к каталогу
      applyCatalogFilter(selectedFilter);
    });

    // Применение фильтра
    function applyCatalogFilter(filter) {
      const catalogItems = document.querySelectorAll(".catalog-item");

      catalogItems.forEach(item => {
        const itemType = item.dataset.type;
        if (filter === "all" || itemType === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  }

  // === 5. Подписка (валидация формы) ===
const subscribeBtn = document.getElementById("subscribeBtn");
const popupForm = document.getElementById("popupForm");
const closeSubscribeModal = document.querySelector(".close-subscribe");

if (popupForm) {
  popupForm.style.display = "none";

  // Открытие модального окна подписки
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
      popupForm.style.display = "flex";
    });
  }

  // Закрытие окна при клике на "X"
  if (closeSubscribeModal) {
    closeSubscribeModal.addEventListener("click", () => {
      popupForm.style.display = "none";
    });
  }

  // Закрытие окна при клике вне модального окна
  window.addEventListener("click", (event) => {
    if (event.target === popupForm) {
      popupForm.style.display = "none";
    }
  });
}

// === 5.1. Валидация формы подписки ===
const subscribeSubmitBtn = document.getElementById("subscribeSubmit");

if (subscribeSubmitBtn) {
  subscribeSubmitBtn.addEventListener("click", (event) => {
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

  // === 6. Авторизация/Выход с сохранением состояния ===
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");

  function updateAuthState() {
    if (currentUserEmail && users[currentUserEmail]) {
      const currentUser = users[currentUserEmail];
      if (usernameDisplay && logoutBtn) {
        usernameDisplay.textContent = `Welcome, ${currentUser.username}!`;
        usernameDisplay.classList.remove("d-none");
        logoutBtn.classList.remove("d-none");
      }
      if (loginLink && registerLink) {
        loginLink.classList.add("d-none");
        registerLink.classList.add("d-none");
      }
    } else {
      if (usernameDisplay && logoutBtn) {
        usernameDisplay.classList.add("d-none");
        logoutBtn.classList.add("d-none");
      }
      if (loginLink && registerLink) {
        loginLink.classList.remove("d-none");
        registerLink.classList.remove("d-none");
      }
    }
  }

  // Обновляем состояние при загрузке
  updateAuthState();

  // Обработка выхода из аккаунта
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // Удаляем авторизованного пользователя
    alert("You have been logged out.");
    window.location.reload(); // Перезагружаем страницу
  });

  // === 7. Смена темы с сохранением для авторизованного пользователя ===
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

  if (currentUserEmail && users[currentUserEmail]) {
    const userTheme = users[currentUserEmail].theme || "light";
    applyTheme(userTheme); // Применяем сохранённую тему пользователя
  } else {
    const globalTheme = localStorage.getItem("theme") || "light";
    applyTheme(globalTheme); // Применяем глобальную тему для неавторизованных
  }

  themeToggle?.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    const newTheme = isDarkMode ? "dark" : "light";

    icon?.classList.toggle("fa-sun", isDarkMode);
    icon?.classList.toggle("fa-moon", !isDarkMode);

    if (currentUserEmail && users[currentUserEmail]) {
      users[currentUserEmail].theme = newTheme; // Сохраняем тему для пользователя
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem("theme", newTheme); // Сохраняем глобальную тему
    }
  });
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
      event.preventDefault(); // Prevent default form submission

      if (form.checkValidity()) {
        // Show progress bar
        progressBar.style.display = "flex";
        progressBar.style.opacity = "1"; // Smooth appearance
        progress.style.width = "0%"; // Reset to initial
        progressText.textContent = "0%";

        // Simulate step-by-step progress
        steps.forEach((step, index) => {
          setTimeout(() => {
            progress.style.width = `${step.percentage}%`;
            progressText.textContent = step.message;

            // Hide progress bar after the final step
            if (step.percentage === 100) {
              setTimeout(() => {
                progressBar.style.opacity = "0"; // Smooth disappearance
                setTimeout(() => {
                  progressBar.style.display = "none"; // Fully hide
                  form.reset(); // Reset form fields
                  console.log("Order placed successfully!");
                }, 500); // Wait for fade-out
              }, 1000); // Hold final state for a second
            }
          }, index * 1000); // Delay based on step index
        });
      } else {
        // Show built-in validation messages if form is invalid
        form.reportValidity();
      }
    });
  }

  const musicList = document.getElementById("musicList");
  const musicSection = document.getElementById("musicSection");
  const theme = currentUserEmail && users[currentUserEmail]?.theme ? users[currentUserEmail].theme : localStorage.getItem("theme") || "light";

  // Применение темы
  function applyThemeToMusicSection(theme) {
    musicSection.classList.remove("light", "dark");
    musicSection.classList.add(theme);
  }

  applyThemeToMusicSection(theme);

  // Смена темы по клику
  themeToggle?.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const newTheme = isDarkMode ? "dark" : "light";
    applyThemeToMusicSection(newTheme);
  });

  // Получение данных YouTube API
  async function fetchDombraMusic() {
    try {
      const apiKey = "AIzaSyBGiNs4xMYXBEdv5Gzbsn6P3m3d-at6T7s"; // Убедитесь, что ключ действителен
      const searchQuery = "Kazakh dombra traditional music";
      const maxResults = 6;
  
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&maxResults=${maxResults}&type=video&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error(`Ошибка YouTube API: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        console.log("Видео успешно получены:", data);
        // Обработка видео
      } else {
        console.error("Видео не найдены.");
      }
    } catch (error) {
      console.error("Ошибка при вызове YouTube API:", error.message);
    }
  }
  
  // Вызов функции загрузки музыки
  fetchDombraMusic();
});
document.addEventListener("DOMContentLoaded", function () {
  const usernameDisplay = document.getElementById("usernameDisplay");
  const userInfoModal = document.getElementById("userInfoModal");
  const closeUserInfo = document.getElementById("closeUserInfo");
  const saveUserInfoButton = document.getElementById("saveUserInfo");

  const currentUserEmail = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  function loadUserInfo() {
    if (currentUserEmail && users[currentUserEmail]) {
      document.getElementById("popupUsername").value = users[currentUserEmail].username || "";
      document.getElementById("popupEmail").value = currentUserEmail; // Read-only
      document.getElementById("popupAddress").value = users[currentUserEmail].address || "";
      document.getElementById("popupPhone").value = users[currentUserEmail].phone || "";
      document.getElementById("popupOrderHistory").value = users[currentUserEmail].orderHistory ? users[currentUserEmail].orderHistory.join(", ") : "";
    }
  }

  // Открыть модальное окно с информацией о пользователе
  usernameDisplay.addEventListener("click", () => {
    loadUserInfo();
    userInfoModal.style.display = "flex";
  });

  // Закрыть модальное окно
  closeUserInfo.addEventListener("click", () => {
    userInfoModal.style.display = "none";
  });

  // Закрыть модальное окно при клике вне его
  window.addEventListener("click", (event) => {
    if (event.target === userInfoModal) {
      userInfoModal.style.display = "none";
    }
  });

  // Сохранить информацию о пользователе
  saveUserInfoButton.addEventListener("click", () => {
    if (currentUserEmail && users[currentUserEmail]) {
      users[currentUserEmail].username = document.getElementById("popupUsername").value;
      users[currentUserEmail].address = document.getElementById("popupAddress").value;
      users[currentUserEmail].phone = document.getElementById("popupPhone").value;
      
      const orderHistory = document.getElementById("popupOrderHistory").value;
      users[currentUserEmail].orderHistory = orderHistory ? orderHistory.split(",").map(order => order.trim()) : [];
      
      localStorage.setItem("users", JSON.stringify(users));
      alert("User information saved successfully!");
      userInfoModal.style.display = "none";
    }
  });

  const catalogFilter = document.getElementById("catalogFilter");
  const catalogItems = document.querySelectorAll(".catalog-item");

  // Function to apply the filter
  function applyCatalogFilter(filter) {
    catalogItems.forEach(item => {
      const itemType = item.dataset.type;
      if (filter === "all" || itemType === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Event listener for filter selection
  catalogFilter.addEventListener("change", function () {
    const selectedFilter = catalogFilter.value;
    applyCatalogFilter(selectedFilter);

    // Save the filter choice for the current user if logged in
    const currentUserEmail = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (currentUserEmail && users[currentUserEmail]) {
      users[currentUserEmail].selectedFilter = selectedFilter;
      localStorage.setItem("users", JSON.stringify(users));
    }
  });

  // On page load: Restore saved filter
  if (currentUserEmail && users[currentUserEmail]?.selectedFilter) {
    const savedFilter = users[currentUserEmail].selectedFilter;
    catalogFilter.value = savedFilter;
    applyCatalogFilter(savedFilter);
  } else {
    applyCatalogFilter("all"); // Default to "all" if no filter is saved
  }
});
