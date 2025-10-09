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

// 🔹 Coleção fixa para a barbearia (leads vão direto para seu CRM)
const leadsCollection = "leads_andreikevin123@gmail.com_dados";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-menu");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const nome = document.getElementById("nome-form").value.trim();
    const telefone = document.getElementById("tel-form").value.trim();
    const email = document.getElementById("email-form").value.trim();

    if (!nome || !telefone || !email) {
      return; // não faz nada se faltar algum campo
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

      // ✅ Aqui não fazemos reset nem alert
    } catch (err) {
      console.error("Erro ao enviar lead:", err);
      // ❌ Sem alert
    }
  });
});
