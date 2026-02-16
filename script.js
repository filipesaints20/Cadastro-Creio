const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLQyL9Iq3dkXmyxn24dKvGqqUiFJwgsLL0PyS_cyzjlG3t8r0QKktAat86Xc7MOidsjQ/exec";

const form = document.getElementById("formCadastro");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");
const statusMsg = document.getElementById("status");

let fotoBase64 = "";
let fotoTipo = "";

fotoInput.addEventListener("change", () => {
  const file = fotoInput.files[0];
  if (!file) return;

  fotoTipo = file.type;

  const reader = new FileReader();
  reader.onload = () => {
    fotoBase64 = reader.result;
    preview.src = fotoBase64;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!fotoBase64) {
    alert("Por favor, tire uma foto para continuar 📸");
    return;
  }

  statusMsg.textContent = "Enviando... ⏳";

  const data = {
    nome: form.nome.value,
    apelido: form.apelido.value,
    nascimento: form.nascimento.value,
    telefone: form.telefone.value,
    responsavel: form.responsavel.value,
    contatoResponsavel: form.contatoResponsavel.value,
    fe: form.fe.value,
    fotoBase64,
    fotoTipo
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (json.status === "ok") {
      statusMsg.textContent = "Cadastro enviado com sucesso 💙";
      form.reset();
      preview.style.display = "none";
    } else {
      statusMsg.textContent = "Erro ao enviar ❌";
    }
  } catch (err) {
    statusMsg.textContent = "Erro de conexão ❌";
  }
});
