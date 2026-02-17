const form = document.getElementById("formCadastro");
const loading = document.getElementById("loading");
const preview = document.getElementById("preview");
const fotoInput = document.getElementById("foto");

// 🔍 PREVIEW DA FOTO
fotoInput.addEventListener("change", () => {
  const file = fotoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.innerHTML = `<img src="${reader.result}">`;
  };
  reader.readAsDataURL(file);
});

// 📤 ENVIO DO FORMULÁRIO
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loading.style.display = "block";

  let fotoBase64 = "";
  let fotoTipo = "";

  // 📸 PROCESSA FOTO
  if (fotoInput.files.length > 0) {
    const file = fotoInput.files[0];
    fotoTipo = file.type;

    fotoBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    });
  }

  // 📦 DADOS DO FORMULÁRIO
  const dados = {
    nome: document.getElementById("nome").value,
    apelido: document.getElementById("apelido").value,
    idade: document.getElementById("idade").value,
    nascimento: document.getElementById("nascimento").value,
    telefone: document.getElementById("telefone").value,
    responsavel: document.getElementById("responsavel").value,
    contatoResponsavel: document.getElementById("contatoResponsavel").value,

    vidaEspiritual: document.getElementById("vidaEspiritual").value,
    ajudaDeus: document.getElementById("ajudaDeus").value,

    musicas: document.getElementById("musicas").value,
    estiloLouvor: document.getElementById("estiloLouvor").value,

    pedidoOracao: document.getElementById("pedidoOracao").value,
    privacidadeOracao: document.getElementById("privacidadeOracao").value,

    desabafo: document.getElementById("desabafo").value,
    contatoLideranca: document.getElementById("contatoLideranca").value,

    fotoBase64,
    fotoTipo
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxehuCmN-NcS_W_tMCpUDLRkVMpIMPmQcdNN3kEZCLuNeKX8cZVzQr5PTW8S7N26oDLuw/exec", {
      method: "POST",
      body: JSON.stringify(dados)
    });

    // ✅ REDIRECIONA PARA SUCESSO
    window.location.href = "sucesso.html";

  } catch (error) {
    loading.style.display = "none";
    alert("Erro ao enviar o cadastro. Tente novamente.");
    console.error(error);
  }
});


