// menu hamburger
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// FORMULARIO
const form = document.querySelector(".form-menu");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome-form").value.trim();
    const telefone = document.getElementById("tel-form").value.trim();
    const email = document.getElementById("email-form").value.trim();
    const mensagem = document.getElementById("mensagem-form").value.trim();

    if (!nome || !telefone || !email || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (nome.length < 4) { alert("O nome precisa ter pelo menos 4 caracteres!"); return; }
    if (telefone.length < 14) { alert("O número de telefone precisa ter pelo menos 11 caracteres!"); return; }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) { alert("Por favor, insira um e-mail válido!"); return; }

    // 🔹 Cria a data de cadastro
    const dataCadastro = new Date().toLocaleString("pt-BR", { hour12: false });

    // 🔹 Envia para Google Sheets
    const urlScript = "https://script.google.com/macros/s/AKfycbyf8qtXQAFRgsBanr3vKW6NLs-0r47XAihfZED3LdVC1z1he0fve2Dt2nlGAUT5fME/exec";

    fetch(urlScript, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: nome,
            telefone: telefone,
            email: email,
            mensagem: mensagem,
            data: dataCadastro
        })
    });

    // 🔹 Redireciona para WhatsApp
    const textoMensagem = `Olá, gostaria de agendar um horário.\n\nNome: ${nome}\nTelefone: ${telefone}`;
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

/*  
📋 DADOS DE CADASTRO PARA PLANILHA  

1️⃣ Criar a planilha  
Crie uma planilha no Google Sheets chamada, por exemplo, "Agendamentos".  

Na primeira aba, coloque os cabeçalhos:  
Data | Nome | Telefone | Email | Mensagem  

------------------------------------------------------------

2️⃣ Criar o Google Apps Script  
Vá em Extensões → Apps Script na planilha.  

Crie um projeto novo e cole o seguinte código:  

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // ou o nome da aba
    const data = new Date().toLocaleString("pt-BR", { hour12: false });

    const nome = e.parameter.nome;
    const telefone = e.parameter.telefone;
    const email = e.parameter.email;
    const mensagem = e.parameter.mensagem;

    sheet.appendRow([data, nome, telefone, email, mensagem]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

------------------------------------------------------------

3️⃣ Publicar como Web App  
Clique em Implantar → Nova implantação → Aplicativo da Web.  

Configurações:  
Executar como: Você mesmo  
Quem tem acesso: Qualquer pessoa, mesmo anônima  

Copie o URL do Web App, que será algo como:  
https://script.google.com/macros/s/SEU_ID_AQUI/exec  

------------------------------------------------------------

4️⃣ Alterar o JavaScript do formulário  
No seu código JS, depois das validações, faça um fetch para enviar os dados para a planilha:  

const form = document.querySelector(".form-menu");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome-form").value.trim();
    const telefone = document.getElementById("tel-form").value.trim();
    const email = document.getElementById("email-form").value.trim();
    const mensagem = document.getElementById("mensagem-form").value.trim();

    if (!nome || !telefone || !email || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (nome.length < 4) { alert("O nome precisa ter pelo menos 4 caracteres!"); return; }
    if (telefone.length < 14) { alert("O número de telefone precisa ter pelo menos 11 caracteres!"); return; }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) { alert("Por favor, insira um e-mail válido!"); return; }

    // 🔹 Cria a data de cadastro
    const dataCadastro = new Date().toLocaleString("pt-BR", { hour12: false });

    // 🔹 Envia para Google Sheets
    const urlScript = "COLE_AQUI_SEU_URL_DO_WEBAPP";

    fetch(urlScript, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: nome,
            telefone: telefone,
            email: email,
            mensagem: mensagem,
            data: dataCadastro
        })
    });

    // 🔹 Redireciona para WhatsApp
    const textoMensagem = `Olá, gostaria de agendar um horário.\n\nNome: ${nome}\nTelefone: ${telefone}`;
    const mensagemComUrl = encodeURIComponent(textoMensagem);
    const numeroWhatsApp = "+5571982564207";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemComUrl}`;
    window.open(linkWhatsApp, "_blank");
});

------------------------------------------------------------

✅ Com isso:  
- Os dados do formulário vão direto para a planilha.  
- Ainda mantém o redirecionamento para o WhatsApp.  
- Inclui a data automaticamente.  
*/
