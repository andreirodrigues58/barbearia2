// MENU HAMBURGER
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// FORMULÁRIO
const form = document.querySelector(".form-menu");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome-form").value.trim();
  const telefone = document.getElementById("tel-form").value.trim();
  const email = document.getElementById("email-form").value.trim();

  if (!nome || !telefone || !email) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (nome.length < 4) { alert("O nome precisa ter pelo menos 4 caracteres!"); return; }
  if (telefone.length < 14) { alert("O número de telefone precisa ter pelo menos 11 caracteres!"); return; }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) { alert("Por favor, insira um e-mail válido!"); return; }

  const dataCadastro = new Date().toLocaleString("pt-BR", { hour12: false });

  const urlScript = "https://script.google.com/macros/s/AKfycbzIUMxNZDKroFTjC301bpWGa75G51OZHGBu6MccvUiGMLumRRhxaQugh5Ur9IJpp7Y/exec";

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzIUMxNZDKroFTjC301bpWGa75G51OZHGBu6MccvUiGMLumRRhxaQugh5Ur9IJpp7Y/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nome, telefone, email, data: dataCadastro })
});
  } catch (error) {
    console.error("Erro ao enviar para a planilha:", error);
  }

  // Redireciona para WhatsApp
  const textoMensagem = `Olá, gostaria de agendar um horário.\n\nNome: ${nome}\nTelefone: ${telefone}`;
  const mensagemComUrl = encodeURIComponent(textoMensagem);
  const numeroWhatsApp = "+5571982564207";
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemComUrl}`;
  window.open(linkWhatsApp, "_blank");
});

// Formatação do telefone
function formatarTelefone(event) {
  let input = event.target;
  let valor = input.value.replace(/\D/g, "");
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, function(_, ddd, parte1, parte2) {
      let result = "";
      if (ddd) result += "(" + ddd + (ddd.length === 2 && (parte1 || parte2) ? ") " : "");
      if (parte1) result += parte1;
      if (parte2) result += "-" + parte2;
      return result;
    });
  } else {
    valor = valor.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, function(_, ddd, parte1, parte2) {
      let result = "";
      if (ddd) result += "(" + ddd + (ddd.length === 2 && (parte1 || parte2) ? ") " : "");
      if (parte1) result += parte1;
      if (parte2) result += "-" + parte2;
      return result;
    });
  }

  input.value = valor;
}

document.getElementById("tel-form").addEventListener("input", formatarTelefone);
