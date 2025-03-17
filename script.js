    // 📌 Função para salvar um novo usuário
function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    
    if (!nome) {
      alert("Digite um nome válido.");
      return;
    }
  
    fetch("http://localhost:3000/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    })
    .then(res => res.json())
    .then(() => {
      listarUsuarios(); // Atualiza a lista de usuários
      document.getElementById("nome").value = ""; // Limpa o campo
    })
    .catch(error => {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário.");
    });
  }
  
  // 📌 Função para listar usuários cadastrados
  function listarUsuarios() {
    fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
      const lista = document.getElementById("listaUsuarios");
      lista.innerHTML = ""; // Limpa a lista antes de preencher
  
      usuarios.forEach(user => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        
        li.innerHTML = `
          ${user.nome}
          <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="removerUsuario(${user.id})">Excluir</button>
        `;
        
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro ao listar usuários:", error);
      alert("Erro ao listar usuários.");
    });
  }
  
  // 📌 Função para editar um usuário
  function editarUsuario(id) {
    const novoNome = prompt("Digite o novo nome:");
  
    if (novoNome && novoNome.trim() !== "") {
      fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
      })
      .then(res => res.json())
      .then(() => listarUsuarios()) // Atualiza a lista de usuários
      .catch(error => {
        console.error("Erro ao editar usuário:", error);
        alert("Erro ao editar usuário.");
      });
    }
  }
  
  // 📌 Função para remover um usuário
  function removerUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => listarUsuarios()) // Atualiza a lista de usuários
      .catch(error => {
        console.error("Erro ao remover usuário:", error);
        alert("Erro ao remover usuário.");
      });
    }
  }
  
  // 📌 Carregar usuários ao iniciar a página
  listarUsuarios();
  