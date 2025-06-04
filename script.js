// Импорт необходимых модулей из Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Функция для входа и отправки данных в Firestore
async function signInAndSaveData(username, password) {
  try {
    // Аутентификация пользователя
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    console.log('User signed in:', userCredential.user);

    // Добавление данных в Firestore
    await addDoc(collection(db, "users"), {
      username: username,
      email: userCredential.user.email,
      loginTimestamp: new Date(),
    });

    console.log("Данные пользователя добавлены в Firestore");
  } catch (error) {
    console.error("Ошибка при аутентификации или добавлении данных в Firestore:", error.message);
  }
}

// Обработчик события при клике на кнопку "Войти"
document.getElementById("signInBtn").addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Проверка на пустые поля
  if (username && password) {
    signInAndSaveData(username, password);
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});
