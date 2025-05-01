// menu hamburger
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});




// FORMULARIO
const form = document.querySelector(".form-menu");

form.addEventListener("submit", function (event) {
    event.preventDefault();

const nome = document.getElementById("nome-form").value.trim();
const telefone = document.getElementById("tel-form").value.trim();
const mensagem = document.getElementById("mensagem-form").value.trim()

if (nome === "" || telefone === "" || mensagem === "") {
    alert("Por favor, preencha todos os campos!");
    return;
}

if (nome.length < 4) {
    alert("O nome precisa ter pelo menos 4 caracteres!");
    return;
}

if (telefone.length < 14) {
    alert("O número de telefone precisa ter pelo menos 11 caracteres!");
    return;
}

const textoMensagem = `Olá, gostaria de agendar um horário.\n\nNome: ${nome}\nTelefone: ${telefone}\nTenho Interesse em:${mensagem}`;
const mensagemComUrl = encodeURIComponent(textoMensagem);
const numeroWhatsApp = "+5571982564207";
const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemComUrl}`;

window.open(linkWhatsApp, "_blank");
});

function formatarTelefone(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
  
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
  
    // Aplica o formato aos poucos conforme o número é digitado
    if (valor.length <= 10) {
      // Formato: (99) 9999-9999
      valor = valor.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})/, function (_, ddd, parte1, parte2) {
        let result = "";
        if (ddd) {
          result += "(" + ddd;
          if (ddd.length === 2 && (parte1 || parte2)) {
            result += ") ";
          }
        }
        if (parte1) result += parte1;
        if (parte2) result += "-" + parte2;
        return result;
      });
    } else {
      // Formato: (99) 99999-9999
      valor = valor.replace(/^(\d{0,2})(\d{0,5})(\d{0,4})/, function (_, ddd, parte1, parte2) {
        let result = "";
        if (ddd) {
          result += "(" + ddd;
          if (ddd.length === 2 && (parte1 || parte2)) {
            result += ") ";
          }
        }
        if (parte1) result += parte1;
        if (parte2) result += "-" + parte2;
        return result;
      });
    }
  
    input.value = valor;
  }
  
  document.getElementById("tel-form").addEventListener("input", formatarTelefone);