const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxehuCmN-NcS_W_tMCpUDLRkVMpIMPmQcdNN3kEZCLuNeKX8cZVzQr5PTW8S7N26oDLuw/exec";

const form = document.getElementById("formCadastro");
const loading = document.getElementById("loading");
const preview = document.getElementById("preview");

foto.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.innerHTML = `<img src="${reader.result}">`;
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  loading.style.display = "block";

  const reader = new FileReader();
  reader.onload = async () => {
    const payload = {
      nome: nome.value,
      apelido: apelido.value,
      idade: idade.value,
      nascimento: nascimento.value,
      telefone: telefone.value,
      responsavel: responsavel.value,
      contatoResponsavel: contatoResponsavel.value,
      fe: fe.value,
      ajudaDeus: ajudaDeus.value,
      musicas: musicas.value,
      estiloLouvor: estiloLouvor.value,
      pedidoOracao: pedidoOracao.value,
      privacidadeOracao: privacidadeOracao.value,
      desabafo: desabafo.value,
      contatoLideranca: contatoLideranca.value,
      fotoBase64: reader.result.split(",")[1],
      fotoTipo: foto.files[0].type
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    window.location.href = "sucesso.html";
  };

  reader.readAsDataURL(foto.files[0]);
});

