document.querySelector(".cad").addEventListener("click", () => {
    // Obtém os valores dos inputs com IDs "descricaoInput" e "precoInput"
    const descricao = document.querySelector("#descricao").value;
    const preco = document.querySelector("#preco").value;

    // Verifica se tanto a descrição quanto o preço foram fornecidos
    if (descricao && preco) {
        // Cria um objeto com os dados do novo produto
        const novoProduto = {
            desc: descricao,
            preco: parseFloat(preco), // Converte o preço para um número
            qtd: 0 // Inicializa a quantidade como 0
        };

        // Faz uma solicitação POST para adicionar o novo produto ao servidor
        fetch("http://localhost:3000/produtos/novo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProduto)
        })
        .then((response) => {
            if (response.ok) {
                // Atualiza a lista de produtos após a adição do novo produto
                atualizarListaProdutos();
            }
        });
    } else {
        // Exibe uma mensagem de erro se a descrição ou o preço estiverem em branco
        alert("Por favor, forneça uma descrição e um preço para adicionar um novo produto.");
    }
});

// Adiciona um evento de clique ao botão de atualização
document.querySelector("#btnAtualizarProduto").addEventListener("click", () => {
    // Obtém os valores dos inputs com IDs "idAtualizar", "descAtualizar", "precoAtualizar", e "qtdAtualizar"
    const idProduto = document.querySelector("#idAtualizar").value;
    const descProduto = document.querySelector("#descAtualizar").value;
    const precoProduto = document.querySelector("#precoAtualizar").value;
    const qtdProduto = document.querySelector("#qtdAtualizar").value;

    // Verifica se a ID e a descrição foram fornecidas
    if (idProduto && descProduto) {
        // Cria um objeto com os dados do produto atualizado
        const produtoAtualizado = {
            desc: descProduto,
            preco: parseFloat(precoProduto), // Converte o preço para um número
            qtd: parseInt(qtdProduto) // Converte a quantidade para um número inteiro
        };

        // Faz uma solicitação PUT para atualizar o produto com a ID fornecida
        fetch(`http://localhost:3000/produtos/alterar/${idProduto}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoAtualizado)
        })
        .then((response) => {
            if (response.ok) {
                // Atualiza a lista de produtos após a alteração
                atualizarListaProdutos();
            }
        });
    } else {
        // Exibe uma mensagem de erro se a ID ou a descrição não foram fornecidas
        alert("Por favor, forneça a ID e a descrição do produto que deseja atualizar.");
    }
});


document.querySelector("#btnDelete").addEventListener("click", () => {
    // Obtém a ID do produto a ser excluído do input com ID "idParaExcluir"
    const idParaExcluir = document.querySelector("#idParaExcluir").value;

    // Verifica se a ID foi fornecida
    if (idParaExcluir) {
        // Faz uma solicitação DELETE para excluir o produto com a ID fornecida
        fetch(`http://localhost:3000/produtos/excluir/${idParaExcluir}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                // Atualiza a lista de produtos após a exclusão
                atualizarListaProdutos();
            }
        });
    } else {
        // Exibe uma mensagem de erro se a ID não foi fornecida
        alert("Por favor, forneça a ID do produto que deseja excluir.");
    }
});

document.querySelector("#btnExcluirTodos").addEventListener("click", () => {
    // Faz uma solicitação DELETE para excluir todos os produtos
    fetch("http://localhost:3000/produtos/excluir-todos", {
        method: "DELETE"
    })
    .then((response) => {
        if (response.ok) {
            // Atualiza a lista de produtos após a exclusão de todos os produtos
            atualizarListaProdutos();
        }
    });
});

document.querySelector("#atualizar").addEventListener("click", () => {
    console.log("teste");
    atualizarListaProdutos();
});

// Função para atualizar a lista de produtos no DOM
function atualizarListaProdutos() {
    fetch("http://localhost:3000/produtos")
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    document.querySelector("#lista-produtos").innerHTML = "";
                    data.forEach((produto) => {
                        const div = document.createElement("div");
                        div.className = "sdfgf dsgfrs sfddfg";
                        div.innerText = `ID: ${produto.id}, Desc: ${produto.desc}, Preço: ${produto.preco}, Qtd: ${produto.qtd}`;
                        document.querySelector("#lista-produtos").append(div);
                    });
                });
            }
        });
}

