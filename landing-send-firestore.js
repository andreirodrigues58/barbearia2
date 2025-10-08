import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// 🔹 Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuyOx3WEX4t-Tq2ry7gdbyWmDp_MK0kV8",
  authDomain: "andreiteste-6489c.firebaseapp.com",
  projectId: "andreiteste-6489c",
  storageBucket: "andreiteste-6489c.appspot.com",
  messagingSenderId: "44391495719",
  appId: "1:44391495719:web:bb2978d059a703f8e57602",
  measurementId: "G-4H7EWMH2CN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Coleção fixa do CRM
const dashboardId = "andrei_dados";
const leadsCollection = `leads_${dashboardId}`;

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-menu");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const nome = document.getElementById("nome-form").value.trim();
    const telefone = document.getElementById("tel-form").value.trim();
    const email = document.getElementById("email-form").value.trim();

    if (!nome || !telefone || !email) {
      // Mantive o alerta apenas para campos vazios
      alert("Preencha todos os campos!");
      return;
    }

    const now = new Date();
    const entrada = now.toLocaleDateString("pt-BR");
    const entradaCompleta = now.toLocaleString("pt-BR", { hour12: false });

    try {
      await addDoc(collection(db, leadsCollection), {
        nome,
        telefone,
        email,
        origem: "Landing Barbearia",
        etapa: "Lead Frio",
        entrada,
        entradaCompleta,
        createdAt: now.toISOString()
      });

      // Removidos os alert() de sucesso e erro
      form.reset();
    } catch (err) {
      console.error("❌ Erro ao enviar lead:", err);
    }
  });
});
